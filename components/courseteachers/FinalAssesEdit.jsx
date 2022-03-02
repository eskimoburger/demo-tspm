import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import Radio from "@material-ui/core/Radio";

//import styles from "../../styles/notification.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DEFAULT_FINAL_STATUS = {
  final1: 0,
  final2: 0,
  final3: 0,
  final4: 0,
  finalDetails: "",
  //final1:0,
};

const VALUE_MAP = {
  1: "เหมาะสม",
  2: "ไม่เหมาะสม",
};

export default function FinalAssesEdit({
  projectID,
  notificationId,
  refreshData,
  notificationName,
}) {
  //console.log(projectID)
  const sortedBy = {
    อาจารย์ที่ปรึกษา: 0,
    อาจารย์ที่ปรึกษาร่วม: 1,
    กรรมการ: 2,
  };

  const sortTeacherRole = (a, b) => {
    return sortedBy[a.role] - sortedBy[b.role];
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFinalStatus(0);
    setOpen(false);
    setFinal(DEFAULT_FINAL_STATUS);
  };

  const [project, setProject] = useState(null);
  const [finalStatus, setFinalStatus] = useState(0);
  const [final, setFinal] = useState(DEFAULT_FINAL_STATUS);
  const [showAsses, setShowAsses] = useState(null);
  const [openAsses, setOpenAsses] = useState(false);
  var summarize = [
    { label: "สมควรแก้ไขรายงานตามคำแนะนำและส่งให้ตรวจซ้ำอีกครั้ง", value: 2 },
    { label: "ไม่ต้องทำการแก้ไขรายงาน", value: 1 },
  ];

  useEffect(() => {
    getFile();
  }, []);

  const [showFile, setShowFile] = useState("");
  const getFile = () => {
    console.log(projectID);
    axios
      .get(`https://demo-tspm-server.herokuapp.com/final-course/get-final-file/${projectID}`)
      .then((res) => {
        console.log(res.data);
        setShowFile(res.data);
      });
  };

  const finalGetProjectAsses = async (id) => {
    await axios
      .get(`https://demo-tspm-server.herokuapp.com/final-course/project-asses/${id}`)
      .then((res) => {
        console.log(res.data);
        setProject(res.data.data_project);
      });
  };

  const finalSendFinalAsses = async (id) => {
    const time = notificationName.split(" ")[1];

    await axios
      .post(`https://demo-tspm-server.herokuapp.com/final-course/edit-asses/${id}`, {
        final: final,
        finalStatus: finalStatus,
        idNotification: notificationId,
        time: time,
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        refreshData();
      })
      .catch((_) => alert("Cannot send data!"));
  };

  const getEditAssesPrevious = async (id) => {
    const time = notificationName.split(" ")[1] - 1;
    await axios
      .get(`https://demo-tspm-server.herokuapp.com/final-course/get-asses/${id}/${time}`)
      .then((res) => {
        console.log(res?.data[0]);
        setShowAsses(res?.data[0]);
        setOpenAsses(true);
      })
      .catch((_) => {
        alert("Cannot get asses");
      });
  };
  return (
    <>
      <div className="my-4">
        <a
          href={showFile}
          target="_blank"
          className=" block mb-2 focus:outline-none  bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border  rounded shadow "
          style={{ width: "270px" }}
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            <i className="bx bx-link-alt" style={{ fontSize: "24px" }}></i>
            ไฟล์รูปเล่มปริญญานิพนธ์
          </span>
        </a>
        <button
          className=" block mb-2 focus:outline-none  bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 border  rounded shadow "
          style={{ width: "270px" }}
          onClick={() => getEditAssesPrevious(projectID)}
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            <i className="bx bx-history" style={{ fontSize: "24px" }}></i>
            ผลการประเมินครั้งก่อนหน้า
          </span>
        </button>
      </div>
      <div className="flex space-x-5 justify-center">
        <button
          onClick={() => {
            handleClickOpen();
            finalGetProjectAsses(projectID);
          }}
          className="focus:outline-none  bg-blue-100 hover:bg-blue-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i className="bx bxs-cube" style={{ fontSize: "24px" }}></i>{" "}
            ประเมินรูปเล่มปริญญานิพนธ์
          </span>
        </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogTitle>
          <p className="text-2xl">แบบประเมินรูปเล่มปริญญานิพนธ์</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          {project ? (
            <div className="text-xl space-y-2">
              <p className=" text-lg stage2:text-2xl">
                <span className="font-bold text-xl stage2:text-2xl">
                  รหัสโครงงาน :
                </span>{" "}
                CPE
                {project.project.project_id.toString().padStart(2, 0)}
              </p>
              <p className=" text-lg stage2:text-2xl">
                <span className="font-bold text-xl stage2:text-2xl">
                  ชื่อโครงงาน :{" "}
                </span>
                {project.project.project_name_th}
              </p>

              <p className=" text-lg stage2:text-2xl">
                <span className="font-bold text-xl stage2:text-2xl">
                  ชื่อโครงงานภาษาอังกฤษ :{" "}
                </span>
                {project.project.project_name_eng}
              </p>
              <p className="font-bold text-xl stage2:text-2xl">สมาชิกในกลุ่ม</p>
              {project.members.map((member, index) => {
                return (
                  <p className="ml-5  text-lg stage2:text-xl" key={index}>
                    {member.id} {member.name}
                  </p>
                );
              })}
              <p className="font-bold text-xl stage2:text-2xl">
                อาจารย์ประจำโครงงาน
              </p>
              {project.committees
                .sort(sortTeacherRole)
                .map((teacher, index) => {
                  return (
                    <div className="ml-5  text-lg stage2:text-xl" key={index}>
                      {" "}
                      {index + 1}. {teacher.role} {teacher.committee_name}
                    </div>
                  );
                })}

              <p className="font-bold text-xl stage2:text-2xl">
                ผลการประเมินรูปเล่มรายงานปริญญานิพนธ์
              </p>

              <div>
                <table className="w-full border-[1px] border-slate-200 border-collapse">
                  <thead>
                    <tr>
                      <th
                        className="border-[1px] p-2 border-slate-200 text-sm stage2:text-xl "
                        style={{ width: "15%", textAlign: "center" }}
                      >
                        ไม่เหมาะสม
                      </th>
                      <th
                        className="border-[1px] p-2 border-slate-200 text-sm stage2:text-xl"
                        style={{ width: "15%", textAlign: "center" }}
                      >
                        เหมาะสม
                      </th>
                      <th
                        className="border-[1px] p-2 border-slate-200 text-sm stage2:text-xl"
                        style={{ textAlign: "center" }}
                      >
                        หัวข้อการประเมิน
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        className={
                          "align-middle text-center border-[1px] p-2 border-slate-200 "
                        }
                      >
                        <Radio
                          id="final1"
                          value={1}
                          checked={final.final1 == 1}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td
                        className={
                          "align-middle text-center border-[1px] p-2 border-slate-200 "
                        }
                      >
                        <Radio
                          color="primary"
                          type="radio"
                          id="final1"
                          value={2}
                          checked={final.final1 == 2}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td className="border-[1px] p-2 border-slate-200 text-sm stage2:text-xl">
                        1.
                        รูปแบบการพิมพ์รายงานถูกต้องตามระเบียบของคณะและ/หรือมหาวิทยาลัย
                      </td>
                    </tr>
                    <tr>
                      <td
                        className={
                          "align-middle text-center border-[1px] p-2 border-slate-200 "
                        }
                      >
                        <Radio
                          type="radio"
                          id="final2"
                          value={1}
                          checked={final.final2 == 1}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>

                      <td
                        className={
                          "align-middle text-center border-[1px] p-2 border-slate-200 "
                        }
                      >
                        {" "}
                        <Radio
                          color="primary"
                          type="radio"
                          id="final2"
                          value={2}
                          checked={final.final2 == 2}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td className="border-[1px] p-2 border-slate-200 text-sm stage2:text-xl ">
                        2. เนื้อหารายงานครบถ้วนสมบูรณ์
                      </td>
                    </tr>
                    <tr>
                      <td
                        className={
                          "align-middle text-center border-[1px] p-2 border-slate-200 "
                        }
                      >
                        <Radio
                          type="radio"
                          id="final3"
                          value={1}
                          checked={final.final3 == 1}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td
                        className={
                          "align-middle text-center border-[1px] p-2 border-slate-200 "
                        }
                      >
                        {" "}
                        <Radio
                          color="primary"
                          type="radio"
                          id="final3"
                          value={2}
                          checked={final.final3 == 2}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td className="border-[1px] p-2 border-slate-200 text-sm stage2:text-xl ">
                        3. การอ้างอิงบรรณานุกรมถูกต้องตามรูปแบบที่กำหนด
                      </td>
                    </tr>
                    <tr>
                      <td
                        className={
                          "align-middle text-center border-[1px] p-2 border-slate-200 "
                        }
                      >
                        <Radio
                          type="radio"
                          id="final4"
                          value={1}
                          checked={final.final4 == 1}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td
                        className={
                          "align-middle text-center border-[1px] p-2 border-slate-200 "
                        }
                      >
                        <Radio
                          color="primary"
                          type="radio"
                          id="final4"
                          value={2}
                          checked={final.final4 == 2}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td className="border-[1px] p-2 border-slate-200 text-sm stage2:text-xl ">
                        4. รูปแบบการเขียนสารบัญเนื้อหา
                        สารบัญรูปภาพและตารางถูกต้องตามกำหนด{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {finalStatus == 2 ? (
                <>
                  <h3 className="font-bold">สิ่งที่ควรแก้ไขเพิ่มเติม</h3>
                  <div className="flex justify-center mt-2">
                    <textarea
                      id="finalDetails"
                      className="bg-gray-100 p-2"
                      placeholder="เพิ่มข้อเสนอแนะ"
                      rows="4"
                      cols="200"
                      value={final.finalDetails}
                      onChange={(e) => {
                        setFinal((prev) => {
                          return { ...prev, [e.target.id]: e.target.value };
                        });
                      }}
                    ></textarea>
                  </div>
                </>
              ) : null}
              <p className="font-bold  text-xl stage2:text-2xl">สรุป</p>
              <div className="">
                {summarize.map((sum, index) => {
                  return (
                    <div key={index}>
                      <Radio
                        id={sum.label}
                        color={sum.value === 1 ? "primary" : "secondary"}
                        type="radio"
                        name="summarize"
                        value={sum.value}
                        checked={finalStatus == sum.value}
                        onChange={(e) => {
                          setFinalStatus(e.target.value);
                        }}
                      />
                      <label
                        className="text-sm stage2:text-xl  "
                        htmlFor={sum.value}
                      >
                        {sum.label}
                      </label>
                    </div>
                  );
                })}
              </div>
              {/* <button onClick={()=>showSort()}>test</button> */}
            </div>
          ) : (
            <div>Loading ...</div>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            variant="contained"
            color="secondary"
          >
            ปิด
          </Button>
          {finalStatus == 2 &&
          final.final1 != 0 &&
          final.final2 != 0 &&
          final.final3 != 0 &&
          final.final4 != 0 &&
          final.finalDetails.length != 0 ? (
            <Button
              onClick={() => {
                //console.log(asses,feedback,assesStudent,assesStatus);

                finalSendFinalAsses(projectID);
                // console.log(projectID)
                //finalSendAsses();
                //setAlert(true)
              }}
              variant="contained"
              color="primary"
            >
              ตกลง
            </Button>
          ) : finalStatus == 1 &&
            final.final1 != 0 &&
            final.final2 != 0 &&
            final.final3 != 0 &&
            final.final4 != 0 ? (
            <Button
              onClick={() => {
                //console.log(asses,feedback,assesStudent,assesStatus);

                finalSendFinalAsses(projectID);
                // console.log(projectID)
                //finalSendAsses();
                //setAlert(true)
              }}
              variant="contained"
              color="primary"
            >
              ตกลง
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAsses}
        TransitionComponent={Transition}
        onClose={() => setOpenAsses(false)}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>
          <p className="text-3xl">ผลการประเมินครั้งก่อนหน้า</p>
        </DialogTitle>
        <DialogContent>
          {showAsses && (
            <div className="text-xl mb-4">
              <h2 className="font-semibold text-2xl ">หัวข้อการประเมิน</h2>
              <div className="indent-2">
                <p>
                  1.
                  รูปแบบการพิมพ์รายงานถูกต้องตามระเบียบของคณะและ/หรือมหาวิทยาลัย{" "}
                  <span
                    className={`${
                      showAsses.final1 == 1 ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {VALUE_MAP[showAsses.final1]}
                  </span>
                </p>
                <p>
                  2. เนื้อหารายงานครบถ้วนสมบูรณ์{" "}
                  <span
                    className={`${
                      showAsses.final2 == 1 ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {VALUE_MAP[showAsses.final2]}
                  </span>
                </p>
                <p>
                  3. การอ้างอิงบรรณานุกรมถูกต้องตามรูปแบบที่กำหนด{" "}
                  <span
                    className={`${
                      showAsses.final3 == 1 ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {VALUE_MAP[showAsses.final3]}
                  </span>
                </p>
                <p>
                  4. รูปแบบการเขียนสารบัญเนื้อหา
                  สารบัญรูปภาพและตารางถูกต้องตามกำหนด{" "}
                  <span
                    className={`${
                      showAsses.final4 == 1 ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {VALUE_MAP[showAsses.final4]}
                  </span>
                </p>
              </div>
              <br />
              <h2 className="text-2xl font-bold">สิ่งที่ควรแก้ไขเพิ่มเติม</h2>
              <div className="indent-2 ">
                <p>{showAsses.final_details}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

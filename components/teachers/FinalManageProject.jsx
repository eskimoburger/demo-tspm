import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/manageteacher.module.scss";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Loading from "../Loading";
import { useRouter } from 'next/router'
//material ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Tooltip } from "@material-ui/core";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import ModalTeacherLog from "./ModalTeacherLog";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const STATE_MAP = {
  1: "เสนอหัวข้อโครงงาน",
  2: "ขอสอบหัวข้อโครงงาน",
  3: "ขอสอบหัวข้อโครงงาน",
  4: "บันทึกผลการสอบหัวข้อโครงงาน",
  5: "บันทึกผลการสอบหัวข้อโครงงาน",
  6: "ประเมินความคืบหน้าโครงงาน",
  7: "ประเมินความคืบหน้าโครงงาน",
  8: "ขอสอบโครงงาน",
  9: "ขอสอบโครงงาน",
  10: "บันทึกผลการสอบโครงงาน",
  11: "บันทึกผลการสอบโครงงาน",
  12: "ประเมินรูปเล่มปริญญานิพนธ์",
  13: "ประเมินรูปเล่มปริญญานิพนธ์",
  14: "ผ่านการประเมินรูปเล่มปริญญานิพนธ์",
};
const ASSES_LABEL = {
  1: "ทำได้ตามข้อกำหนด",
  2: "ทำได้บางส่วน",
  3: "ไม่เป็นไปตามข้อกำหนด",
  4: "ไม่สามารถประเมินได้",
};
const SUMMARIZE = {
  1: "เหมาะสม",
  2: "ไม่เหมาะสม",
};

export default function FinalManageProject({ teacherData }) {
  const router = useRouter();
  const [teacher, setTeacher] = useState("");
  const [openMid, setOpenMid] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);
  const [openAsses, setOpenAsses] = useState(false);
  const [openFinalAsses, setOpenFinalAsses] = useState(false);
  const [midResults, setMidResults] = useState([]);
  const [assesResults, setAssesResults] = useState(null);
  const [finalAssesResults, setFinalAssesResults] = useState(null);
  const [finalResults, setFinalResults] = useState([]);
  const [openLogbook, setOpenLogbook] = useState(false);
  const [logbookData, setLogbookData] = useState([]);

  const getMidExamResults = async (id) => {
    await axios
      .get("http://localhost:3001/final-project/mid-exam-result/" + id)
      .then((res) => {
        setMidResults(res.data.exam_result);
        setOpenMid(true);
      })
      .catch((_) => alert("Cannot get results"));
  };

  const getFinalExamResults = async (id) => {
    await axios
      .get("http://localhost:3001/final-project/final-exam-result/" + id)
      .then((res) => {
        setFinalResults(res.data.exam_result);
        setOpenFinal(true);
      })
      .catch((_) => alert("Cannot get results"));
  };

  const getAssesResult = async (id) => {
    await axios
      .get("http://localhost:3001/final-project/get-asses-results/" + id)
      .then((res) => {
        setAssesResults(res.data);
        setOpenAsses(true);
      })
      .catch((_) => alert("Cannot get results"));
  };

  const getFinalAsses = async (id) => {
    await axios
      .get(
        `http://localhost:3001/final-project/get-asses-final/${id}/${final_count}`
      )
      .then((res) => {
        console.log(res.data);
        setFinalAssesResults(res.data);
        setOpenFinalAsses(true);
      })
      .catch((_) => alert("Cannot get results"));
  };

  useEffect(() => {
    if (teacherData) {
      setTeacher(teacherData.id);
      // getProjectFromTeacher();
      ActiveButton(1);
    }
  }, [teacherData]);

  const [project, setProject] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [status, setStats] = useState({
    all: false,
    advisor: false,
    coAdvisor: false,
    committee: false,
  });

  const ActiveButton = (status) => {
    const status_mock = {};
    status_mock.all = status == 1 ? true : false;
    status_mock.advisor = status == 2 ? true : false;
    status_mock.coAdvisor = status == 3 ? true : false;
    status_mock.committee = status == 4 ? true : false;
    setStats(status_mock);
    getProjectByTeacher(status);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProjectByTeacher = (status) => {
    axios
      .get(
        `http://localhost:3001/project/getprojectbyteacher/${teacherData.id}/${status}`
      )
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
      })
      .catch(setProject(null));
  };

  const getProjectById = (id) => {
    setOpen(true);
    axios
      .get(`http://localhost:3001/project/getprojectbyid/${id}`)
      .then(async (res) => {
        console.log(res.data);
        setProjectDetail(res.data);
      })
      .catch
      //setProject(null)
      ();
  };
  const finalGetProjectByID = async (id) => {
    setOpen(true);
    await axios
      .get("http://localhost:3001/final-course/get-project/" + id)
      .then((res) => {
        console.log(res.data);
        setProjectDetail(res.data.results);
        //setProjectData(res.data.results);
        // setCheck(res.data.results.status);
        //setOpenDetail(true);
      });
  };

  const finalGetLogbookProjectByID = async (id) => {
    setOpenLogbook(true);
    await axios
      .get("http://localhost:3001/final-course/get-logbook/" + id)
      .then((res) => {
        console.log(res.data);
        setLogbookData(res?.data);
      });
  };

  return (
    <div>
      <div
        className=" px-4  pt-4 pb-6 text-xl  bg-white rounded-2xl  "
        style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px" }}
      >
        <div className="flex justify-between gap-2 px-2 my-2 flex-wrap">
          <p className=" text-center text-2xl ">รายชื่อโครงงาน </p>
          <div className="flex justify-center gap-2 flex-wrap text-sm">
            <button
              onClick={() => {
                ActiveButton(1);
              }}
              className={
                status.all
                  ? "bg-green-800   py-1 px-4 rounded-lg text-white  focus:outline-none "
                  : "bg-green-600  hover:bg-green-800 py-1 px-4 rounded-lg text-white  focus:outline-none "
              }
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => {
                ActiveButton(2);
              }}
              className={
                status.advisor
                  ? "bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
                  : "bg-blue-500  hover:bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
              }
            >
              อาจารย์ที่ปรึกษา
            </button>
            <button
              onClick={() => {
                ActiveButton(3);
              }}
              className={
                status.coAdvisor
                  ? "bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
                  : "bg-blue-500  hover:bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
              }
            >
              อาจารย์ที่ปรึกษา(ร่วม)
            </button>
            <button
              onClick={() => {
                ActiveButton(4);
              }}
              className={
                status.committee
                  ? "bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
                  : "bg-blue-500  hover:bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
              }
            >
              กรรมการ
            </button>
          </div>
        </div>
        {project ? (
          <div>
            {" "}
            {project.length == 0 ? (
              <p className="text-center">ยังไม่มีข้อมูล...</p>
            ) : (
              <table className={styles.table_for_manage}>
                <thead>
                  <tr className={styles.table__headers}>
                    <th style={{ width: "10%" }} className={styles.header}>
                      ID
                    </th>
                    <th style={{ width: "40%" }} className={styles.header}>
                      ชื่อโครงงาน
                    </th>
                    <th style={{ width: "30%" }} className={styles.header}>
                      สถานะ
                    </th>
                    <th style={{ width: "20%" }} className={styles.header}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.map((project, index) => {
                    return (
                      <tr key={index} className={styles.table__row}>
                        <td className={styles.row__cell}>
                          CPE{project.project_id.toString().padStart(2, 0)}
                        </td>
                        <td className={styles.row__cell}>
                          {project.project_th}
                        </td>
                        <td className={styles.row__cell}>
                          <span
                            style={{ fontSize: "0.95rem" }}
                            className="px-2 py-1  font-medium  bg-green-100 text-green-800 rounded-lg"
                          >
                            {STATE_MAP[project.state]}
                          </span>
                        </td>
                        <td className={"text-lg text-center flex px-0 py-2"}>
                          <Tooltip
                            title={
                              <p style={{ fontSize: 14, padding: 3 }}>
                                ดูรายละเอียด
                              </p>
                            }
                            arrow
                          >
                            <div
                              onClick={() => finalGetProjectByID(project.id)}
                              className="text-yellow-500 cursor-pointer hover:text-yellow-400 it  "
                              style={{ width: "50%" }}
                            >
                              <VisibilityIcon />
                            </div>
                          </Tooltip>
                          &emsp;
                          <Tooltip
                            title={
                              <p style={{ fontSize: 14, padding: 3 }}>
                                Logbooks
                              </p>
                            }
                            arrow
                          >
                            <div
                              onClick={() =>
                                finalGetLogbookProjectByID(project.id)
                              }
                              className="text-gray-800 cursor-pointer hover:text-gray-700"
                              style={{ width: "50%" }}
                            >
                              <LibraryBooksIcon />
                            </div>
                          </Tooltip>
                          &emsp;
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>
          <p className="text-2xl">รายละเอียดโครงงาน</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          {projectDetail ? (
            <div className="px-8 mb-4 space-y-2" style={{ fontSize: "18px" }}>
              <p className=" font-bold">
                รหัสโครงงาน :{" "}
                <span className="font-normal">
                  CPE
                  {projectDetail.project.project_id.toString().padStart(2, 0)}
                </span>
              </p>

              <p className=" font-bold">
                ชื่อโครงงานภาษาไทย :{" "}
                <span className="font-normal">
                  {projectDetail.project.project_name_th}
                </span>
              </p>
              <p className=" font-bold">
                ชื่อโครงงานภาษาอังกฤษ :{" "}
                <span className="font-normal">
                  {projectDetail.project.project_name_eng}
                </span>
              </p>

              <p className="font-bold">รายชื่ออาจารย์</p>

              {projectDetail.committees.map((teacher, index) => {
                return (
                  <div key={index}>
                    <p className="ml-5 ">
                      ชื่อ {teacher.committee_name}{" "}
                      <span className="font-bold">ตำแหน่ง</span> {teacher.role}
                    </p>
                  </div>
                );
              })}

              <p className=" font-bold">สมาชิกในกลุ่ม</p>

              {projectDetail.members.map((mem, index) => {
                //var name = `${mem.prefix_th} ${mem.student_name_th} ${mem.student_lastname_th}`;
                return (
                  <div key={index}>
                    <p className="ml-5 ">
                      <span className="font-bold">รหัสนิสิต</span> {mem.id}{" "}
                      <span className="font-bold">ชื่อ </span> {mem.name}
                    </p>
                  </div>
                );
              })}
              {projectDetail.project.state >= 3 && (
                <>
                  <h3 className="font-bold">ไฟล์โครงงาน</h3>
                  <div className="ml-2 space-x-2">
                    <Button
                      startIcon={<InsertDriveFileIcon />}
                      variant="contained"
                      size="small"
                      style={{
                        fontSize: 14,
                        backgroundColor: "green",
                        color: "white",
                      }}
                      onClick={() =>
                        window.open(`http://localhost:3001/${projectDetail.project.id}/state3file.pdf`,'_blank')
                       }
                    >
                      ไฟล์ขอสอบหัวข้อโครงงงาน
                    </Button>
                    {projectDetail.project.state >= 9 && (
                      <Button
                        startIcon={<InsertDriveFileIcon />}
                        variant="contained"
                        size="small"
                        style={{
                          fontSize: 14,
                          backgroundColor: "green",
                          color: "white",
                        }}
                        onClick={() =>
                         window.open(`http://localhost:3001/${projectDetail.project.id}/state9file.pdf`,'_blank')
                        }
                      >
                        ไฟล์ขอสอบโครงงงาน
                      </Button>
                    )}
                  </div>
                </>
              )}

              <div className="space-x-2 space-y-2">
                {/* {projectDetail.project.state >= } */}
                {projectDetail.project.state >= 6 && (
                  <>
                    <h3 className="font-bold">บันทึกผลการสอบ</h3>
                    <Button
                      startIcon={<ChromeReaderModeIcon />}
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ fontSize: 14 }}
                      onClick={() =>
                        getMidExamResults(projectDetail.project.id)
                      }
                    >
                      บันทึกผลการสอบเสนอหัวข้อโครงงาน
                    </Button>
                  </>
                )}
                {projectDetail.project.state >= 8 && (
                  <Button
                    startIcon={<ChromeReaderModeIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: 14 }}
                    onClick={() => getAssesResult(projectDetail.project.id)}
                  >
                    ผลการประเมินความคืบหน้า
                  </Button>
                )}
                {projectDetail.project.state >= 12 && (
                  <Button
                    startIcon={<ChromeReaderModeIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: 14 }}
                    onClick={() =>
                      getFinalExamResults(projectDetail.project.id)
                    }
                  >
                    บันทึกผลการสอบโครงงาน
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openMid}
        onClose={() => {
          setOpenMid(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการสอบหัวข้อโครงงาน"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4  space-y-4">
          {midResults.map((m, i) => {
            return (
              <div key={i}>
                <h3 className="">
                  <span className="font-bold">{m.role}</span> {m.committee_name}
                </h3>
                <p
                  className="bg-gray-100 py-1"
                  style={{ wordBreak: "break-word", textIndent: "20px" }}
                >
                  {m.exam_details.length === 0
                    ? "ไม่มีข้อเสนอแนะ"
                    : m.exam_details}
                </p>
              </div>
            );
          })}
          <div></div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openFinal}
        onClose={() => {
          setOpenFinal(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการสอบโครงงาน"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4 space-y-2 ">
          {finalResults.map((m, i) => {
            return (
              <div key={i}>
                <h3 className="">
                  <span className="font-bold">{m.role}</span> {m.committee_name}
                </h3>
                <p
                  className="bg-gray-100 py-1"
                  style={{ wordBreak: "break-word", textIndent: "20px" }}
                >
                  {m.exam_details.length === 0
                    ? "ไม่มีข้อเสนอแนะ"
                    : m.exam_details}
                </p>
              </div>
            );
          })}
          <div></div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAsses}
        onClose={() => {
          setOpenAsses(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการประเมินความคืบหน้า"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4 ">
          {assesResults && (
            <div>
              <div className=" indent-2  ">
                <p>
                  {" "}
                  1. การดำเนินงานตามวัตถุประสงค์ &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses1]}
                  </span>
                </p>
                <p>
                  {" "}
                  2. การดำเนินงานตามแผนงาน/ปฏิทิน &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses2]}
                  </span>
                </p>
                <p>
                  {" "}
                  3. การแบ่งงานและการทำงานเป็นทีม (กรณีมีนิสิตมากกว่า 1 คน)
                  &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses3]}
                  </span>
                </p>
                <p>
                  {" "}
                  4. ผลผลิต/ผลลัพธ์ของโครงงาน &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses4]}
                  </span>
                </p>
                <p>
                  {" "}
                  5. ความสมบูรณ์ของรายงาน &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses5]}
                  </span>
                </p>
              </div>

              <p className="my-2 font-bold"> ผลการประเมินนิสิตที่ทำโครงงาน</p>

              <table className="table-auto text-lg">
                <thead>
                  <tr>
                    <th>
                      หัวข้อการประเมิน <hr /> สมาชิกในกลุ่ม
                    </th>
                    <th>ความรู้ความเข้าใจเกี่ยวกับโครงงาน</th>
                    <th> ความรับผิดชอบและการมีส่วนร่วม</th>
                    <th> ความตรงต่อเวลา</th>
                    <th> การปฏิบัติตามจรรยาบรรณของนักวิจัย</th>
                  </tr>
                </thead>
                <tbody>
                  {assesResults.asses_member.map((m, i) => {
                    return (
                      <tr key={i} className="text-center text-base">
                        <td>
                          {m.id_student} {m.name}
                        </td>
                        <td>{m.student1}</td>
                        <td>{m.student2}</td>
                        <td>{m.student3}</td>
                        <td>{m.student4}</td>
                      </tr>
                    );
                  })}
                  {assesResults.asses_project.feedback.length > 0 && (
                    <>
                      <p className="my-2 font-bold"> ข้อเสนอแนะ</p>
                      <div className="indent-2">
                        {assesResults.asses_project.feedback}
                      </div>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div></div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openFinalAsses}
        onClose={() => {
          setOpenFinalAsses(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการประเมินรูปเล่มปริญานิพนธ์"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4 space-y-2 ">
          {/* {JSON.stringify(finalAssesResults)} */}
          {finalAssesResults && (
            <>
              <div>
                <p>
                  1.
                  รูปแบบการพิมพ์รายงานถูกต้องตามระเบียบของคณะและ/หรือมหาวิทยาลัย
                  &nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final1]}
                  </span>
                </p>{" "}
                <p>
                  2. เนื้อหารายงานครบถ้วนสมบูรณ์&nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final2]}
                  </span>
                </p>{" "}
                <p>
                  3. การอ้างอิงบรรณานุกรมถูกต้องตามรูปแบบที่กำหนด&nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final3]}
                  </span>
                </p>
                <p>
                  {" "}
                  4. รูปแบบการเขียนสารบัญเนื้อหา
                  สารบัญรูปภาพและตารางถูกต้องตามกำหนด &nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final4]}
                  </span>
                </p>
              </div>
              <div>
                <h2 className="font-bold">ข้อเสนอแนะ</h2>
                <div className="indent-2">
                  <p>{finalAssesResults[0].final_details}</p>
                </div>
              </div>
            </>
          )}

          {/* {finalResults.map((m, i) => {
            return (
              <div key={i}>
                <h3 className="">
                  <span className="font-bold">{m.role}</span> {m.committee_name}
                </h3>
                <p
                  className="bg-gray-100 py-1"
                  style={{ wordBreak: "break-word", textIndent: "20px" }}
                >
                  {m.exam_details.length === 0
                    ? "ไม่มีข้อเสนอแนะ"
                    : m.exam_details}
                </p>
              </div>
            );
          })} */}
          <div></div>
        </DialogContent>
      </Dialog>
      <ModalTeacherLog
        openLogbook={openLogbook}
        onClose={() => setOpenLogbook(false)}
        logbookData={logbookData}
      />
    </div>
  );
}

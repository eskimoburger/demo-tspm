import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DetailsIcon from "@material-ui/icons/Details";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import axios from "axios";
const InformationDisplay = ({ state, projectData }) => {
  const {
    project_id,
    project_name_th,
    project_name_eng,
    project_description,
    id,
  } = projectData?.projectData;
  const { committees, members } = projectData;
  const [detail, setDetail] = useState(false);
  const [openMid, setOpenMid] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);
  const [midResults, setMidResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);

  const getMidExamResults = async () => {
    await axios
      .get("https://demo-tspm-server.herokuapp.com/final-project/mid-exam-result/" + id)
      .then((res) => {
        setMidResults(res.data.exam_result);
        setOpenMid(true);
      })
      .catch((_) => alert("Cannot get results"));
  };

  const getFinalExamResults = async () => {
    await axios
      .get("https://demo-tspm-server.herokuapp.com/final-project/final-exam-result/" + id)
      .then((res) => {
        setFinalResults(res.data.exam_result);
        setOpenFinal(true);
      })
      .catch((_) => alert("Cannot get results"));
  };

  return (
    <div
      className=" bg-white  rounded-md p-3 mt-5   "
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div className=" flex justify-center gap-4  text-xl flex-wrap ">
        <div
          className="  rounded-lg border border-gray-200 "
          style={{ width: 730 }}
        >
          <div
            className="p-2 text-white rounded-t-lg text-2xl"
            style={{ backgroundColor: "#32a5c2" }}
          >
            ข้อมูลโครงงาน
          </div>
          <div className="bg-white rounded-b-lg m-2 font-medium px-2  ">
            {state == 0 ? (
              <p>ยังไม่มีข้อมูล</p>
            ) : (
              //0ld
              // <div className="text-xl space-y-1 ">
              //   <p>รหัสโครงงาน : CPE{projectData.id.toString().padStart(2, 0)}</p>
              //   <p>ชื่อโครงงาน (ภาษาไทย) : {projectData.name} </p>
              //   <p>ชื่อโครงงาน (ภาษาอังกฤษ) : {projectData.name_eng} </p>
              //   <p className="font-bold">อาจารย์ประจำโครงงาน</p>
              //   {projectData.committees.map((teacher, index) => {
              //     return (
              //       <div className="ml-2" key={index}>
              //         <p>
              //           {index + 1}. {teacher.teacher_name}
              //           {/* <br /> */}
              //           <span className="font-bold">ตำแหน่ง : </span>{" "}
              //           {teacher.role}
              //         </p>
              //       </div>
              //     );
              //   })}
              //   <button
              //     className="bg-yellow-400 text-black px-2 p-1 rounded-lg shadow-lg hover:bg-yellow-300"
              //     onClick={() => {
              //       setDetail(true);
              //     }}
              //   >
              //     ดูรายละเอียดโครงงาน
              //   </button>
              // </div>

              //new
              <div className="text-xl space-y-1 ">
                <p>
                  รหัสโครงงาน :{" "}
                  {project_id === 0
                    ? "ยังไม่มีข้อมูล"
                    : "CPE" + project_id.toString().padStart(2, 0)}
                </p>
                <p>ชื่อโครงงาน (ภาษาไทย) : {project_name_th} </p>
                <p>ชื่อโครงงาน (ภาษาอังกฤษ) : {project_name_eng} </p>
                <p className="font-bold">อาจารย์ประจำโครงงาน</p>
                {committees.map((teacher, index) => {
                  return (
                    <div className="ml-2" key={index}>
                      <p>
                        {index + 1}. {teacher.teacher_name}
                        <span className="font-bold">ตำแหน่ง : </span>{" "}
                        {teacher.role}
                      </p>
                    </div>
                  );
                })}
                <Button
                  variant="contained"
                  style={{ fontSize: 18, backgroundColor: "#ffc107" }}
                  startIcon={<DetailsIcon />}
                  size="small"
                  onClick={() => {
                    setDetail(true);
                  }}
                >
                  ดูรายละเอียดโครงงาน
                </Button>
              </div>
            )}
            <div className="my-2">
              {/* <h3 className="text-xl font-bold my-1">บันผลการสอบ</h3> */}
              <div className="flex flex-wrap gap-2">
                {state >= 6 && (
                  <Button
                    startIcon={<ChromeReaderModeIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: 18 }}
                    onClick={getMidExamResults}
                  >
                    บันทึกผลการสอบเสนอหัวข้อโครงงาน
                  </Button>
                )}
                {state >= 12 && (
                  <Button
                    startIcon={<ChromeReaderModeIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: 18 }}
                    onClick={getFinalExamResults}
                  >
                    บันทึกผลการสอบโครงงาน
                  </Button>
                )}
              </div>
            </div>
            {/* <div>
              <h3 className="text-xl font-bold my-1">ผลการประเมินรูปเล่มวิทยานิพนธ์</h3>
              <Button
                    startIcon={<ChromeReaderModeIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: 18 }}
                    onClick={getMidExamResults}
                  >
                    ข้อเสนอแนะ
                  </Button>
            </div> */}
          </div>
        </div>
        <div
          className=" w-1/2  rounded-lg border border-gray-200 "
          style={{ width: 730 }}
        >
          <div
            className="p-2  text-white rounded-t-lg text-2xl"
            style={{ backgroundColor: "#32a5c2" }}
          >
            สมาชิกในกลุ่ม
          </div>

          <div className="bg-white rounded-b-lg m-2 px-2 text-xl">
            {state == 0 ? (
              <p>ยังไม่มีข้อมูล</p>
            ) : (
              <div>
                {members.map((member, index) => {
                  return (
                    <p key={index}>
                      รหัสนิสิต {member.id} ชื่อ {member.name}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div style={{ height: 50 }} />
        </div>
      </div>

      <Dialog
        open={detail}
        onClose={() => {
          setDetail(false);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"รายละเอียดโครงงาน"}</p>{" "}
        </DialogTitle>
        <DialogContent
          className=" text-xl mb-4 "
          style={{ wordBreak: "break-word", textIndent: "40px" }}
        >
          <p>{project_description}</p>
        </DialogContent>
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
        <DialogContent className=" text-xl mb-4 ">
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
        <DialogContent className=" text-xl mb-4 ">
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
    </div>
  );
};

export default InformationDisplay;

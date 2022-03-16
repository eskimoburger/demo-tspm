import React, { Fragment, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export default function teacherState7({
  projectID,
  projectName,
  teacherID,
  teacherName,
  idNotification,
  functionNew,
}) {
  const [examResult, setExamResult] = useState([]);
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const getFinalExamResults = (id) => {
    axios
      .get("http://localhost:3001/final-teacher/final-exam-result/" + id)
      .then((response) => {
        console.log(response.data);
        setExamResult(response.data.exam_result);
        setProject(response.data.project);
      });
    console.log("hello" + id);
  };

  const validationState11 = async (idP) => {
    await axios
      .put("http://localhost:3001/final-teacher/validation-state11/" + idP, {
        idNotification: idNotification,
      })
      .then(async (res) => {
        await functionNew();

        console.log(res.data);
      })
      .catch((_) => {
        alert("Cannot validation ");
      });
  };

  return (
    <Fragment>
      {" "}
      <div className="my-4">
        <button
          onClick={() => {getFinalExamResults(projectID),setOpen(true)}}
          className="focus:outline-none  bg-white hover:bg-blue-100 text-gray-800 font-semibold py-1 px-4 border  rounded shadow "
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            <i className="bx bxs-detail" style={{ fontSize: "24px" }}></i>
            แสดงรายละเอียด
          </span>
        </button>
      </div>
      <div className="flex space-x-5 justify-center">
        <button
          onClick={() => {
            validationState11(projectID);
          }}
          className="focus:outline-none  bg-green-100 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i
              className="bx bx-check-circle"
              style={{ fontSize: "24px" }}
            ></i>{" "}
            ตรวจสอบเรียบร้อย
          </span>
        </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setOpen(false)}
        fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogTitle>
          <p className="text-2xl">บันทึกผลการสอบโครงงาน</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          <div className="text-xl">
            {project ? (
              <div>
                <p>
                  <span className="font-bold">รหัสโครงงาน :</span> CPE
                  {project.project_id.toString().padStart(2, 0)}
                </p>
                <p>
                  <span className="font-bold">ชื่อโครงงาน : </span>
                  {project.project_name_eng}
                </p>
              </div>
            ) : (
              <div></div>
            )}

            {examResult.map((exam, index) => {
              return (
                <div key={index} className="mb-3">
                  <div>
                    <span className="font-bold"> {exam.role}</span>:{" "}
                    {exam.committee_name}{" "}
                  </div>
                  <div>
                    <span className="font-bold">ความคิดเห็นผู้ประเมิน : </span>
                    {exam.exam_value}
                  </div>
                  <p>สรุปข้อเสนอแนะ</p>
                  <div className="flex justify-center mt-2">
                    <div
                      style={{
                        width: "70%",
                        backgroundColor: "#d1d1d1",
                        wordWrap: "break-word",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      {exam.exam_details.length == 0
                        ? "ไม่มีข้อเสนอแนะ"
                        : exam.exam_details}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

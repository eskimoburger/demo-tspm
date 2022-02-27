import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import Image from "next/image";
//import styles from "../styles/notification.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function teacherState2({
  projectID,
  teacherID,
  teacherName,
  idNotification,functionNew
}) {
  useEffect(() => {
    getExamResults(projectID);
  }, []);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [examResult, setExamResult] = useState([]);
  const [project, setProject] = useState(null);
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const getExamResults = (id) => {
    //setOpen(true);
    axios
      .get("http://localhost:3001/final-teacher/mid-exam-result/" + id)
      .then((response) => {
        console.log(response.data);
        setExamResult(response.data.exam_result);
        setProject(response.data.project);
      });
  };
  const onChangeEdit = (e) => {
    setEdit(e.target.value);
  };

  const sendEdit = (teacherName, id) => {
    var text;

    if ((edit.length = 0)) {
      return (text = null);
    }
    //var text = "||แก้ไขโดย : " + teacherName + " --> " + edit;
    axios
      .put(`http://localhost:3001/project/examresult/${id}`, {
        edit: text,
        idProject: projectID,
      })
      .then((res) => {
        console.log(res.data);
        setEdit("");
      });

    //console.log("//แก้ไขโดย : " + teacherName + edit);
  };

  const [edit, setEdit] = useState("");

  const validation = async(status, des) => {
    var text = "//แก้ไขโดย : " + teacherName + " --> " + edit;
    await axios
      .put(
        `http://localhost:3001/final-teacher/validation-state5/${projectID}/${status}`,
        {
          idNotification: idNotification,
          projectName: project.project_name_eng,
          description: des,
          idTeacher: teacherID,
          edit: text,
        }
      )
      .then(async(res) => {
        console.log(res.data);
        await functionNew()
        setAlert(false)
      });
  };
  return (
    <div>
      <div className="my-4">
        <button
          onClick={() => {
            handleClickOpen();
          }}
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
            setAlert(true);
            setStatus(1);
          }}
          className="focus:outline-none  bg-green-100 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i className="bx bxs-check-square" style={{ fontSize: "24px" }}></i>
            ยอมรับ
          </span>
        </button>
        <button
          onClick={() => {
            handleClickOpenEdit();
            setEdit("");
          }}
          className="focus:outline-none  bg-yellow-100 hover:bg-yellow-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i
              className="bx bxs-edit-alt"
              style={{ fontSize: "24px" }}
            ></i>{" "}
            แก้ไข{" "}
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
          <p className="text-2xl">บันทึกผลการสอบหัวข้อโครงงาน</p>{" "}
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
                  {project.project_name_th}
                </p>
              </div>
            ) : null}

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
                      {exam.exam_details}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
      {/*Edit */}
      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseEdit}
        fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogTitle>
          <p className="text-2xl">แก้ไขบันทึกผลการสอบหัวข้อโครงงาน</p>{" "}
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
                  {project.project_name_th}
                </p>{" "}
              </div>
            ) : null}
            {examResult.map((exam, index) => {
              if (exam.id_teacher == teacherID) {
                return (
                  <div key={index}>
                    <div>
                      <span className="font-bold"> {exam.role}</span>:{" "}
                      {exam.committee_name}{" "}
                    </div>
                    <div>
                      <span className="font-bold">
                        ความคิดเห็นผู้ประเมิน :{" "}
                      </span>
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
                        {exam.exam_details}
                      </div>
                    </div>
                    <div className=" flex justify-center  my-10">
                      <i className="bx bx-chevrons-down bx-fade-down text-8xl text-yellow-400"></i>
                    </div>
                    <label htmlFor="edit">เพิ่มข้อเสนอแนะ : </label>
                    <div className="flex justify-center mt-2">
                      <textarea
                        id="edit"
                        className="bg-gray-100 p-2"
                        placeholder="เพิ่มข้อเสนอแนะ"
                        rows="4"
                        cols="68"
                        value={edit}
                        onChange={onChangeEdit}
                      ></textarea>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEdit}
            variant="contained"
            color="secondary"
          >
            ปิด
          </Button>
         {edit.length != 0 && <Button
            onClick={() => {
              //  sendEdit(teacherName, teacherID);
              //   getExamResults(projectID)
              //   handleCloseEdit()
              setAlert(true);
              setStatus(2);
            }}
            variant="contained"
            color="primary"
          >
            ตกลง
          </Button>}
        </DialogActions>
      </Dialog>

      <Dialog
        open={alert}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">
            {status == 1
              ? "ยืนยันเพื่อดำเนินการต่อโดยไม่แก้ไขเพิ่มเติม ? "
              : status == 2
              ? "ยืนยันการเพิ่มข้อเสนอะแนะ ?"
              : null}
          </p>{" "}
        </DialogTitle>
        <DialogContent className=" text-center ">
          <i
            className="bx bx-error-circle bx-tada  m-2  "
            style={{ fontSize: "180px" }}
          ></i>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setAlert(false);
            }}
            className=" h-10 rounded-lg bg-red-600   uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-4 "
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              if (status == 1) {
                validation(
                  1,
                  `${teacherName}  ได้ยอมรับบันทึกผลการสอบหัวข้อโครงงาน ${project.project_name_eng}`
                );
              } else if (status == 2) {
                validation(
                  2,
                  `${teacherName}  ได้ยอมรับและเพิ่มข้อเสนอแนะบันทึกผลการสอบหัวข้อโครงงาน ${project.project_name_eng}`
                );
              }
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ยืนยัน
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

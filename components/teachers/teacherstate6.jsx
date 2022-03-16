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

export default function teacherState6({
  projectID,
  projectName,
  teacherID,
  teacherName,
  idNotification,
  functionNew,
}) {
  useEffect(() => {
    //getExamResults(projectID);
    getFinalExamResults(projectID);
  }, []);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [examResult, setExamResult] = useState([]);
  const [project, setProject] = useState(null);
  const [isAdvisor, setIsAdvisor] = useState(false);

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

  const getFinalExamResults = (id) => {
    axios
      .get("https://demo-tspm-server.herokuapp.com/final-teacher/final-exam-result/" + id)
      .then((response) => {
        console.log(response.data);
        setExamResult(response.data.exam_result);
        setProject(response.data.project);
      });
    console.log("hello" + id);
  };

  const getExamResults = (id) => {
    //setOpen(true);
    axios
      .get("https://demo-tspm-server.herokuapp.com/project/finalexamresult/" + id)
      .then((response) => {
        console.log(response.data.results);

        setExamResult(response.data.results);
        setProject(response.data.project);

        var teacherStatus = [];
        var advisor = null;

        for (let i = 0; i < response.data.results.length; i++) {
          teacherStatus.push(response.data.results[i].exam_status);
          if (
            response.data.results[i].id_teacher === teacherID &&
            response.data.results[i].role === "อาจารย์ที่ปรึกษา"
          ) {
            advisor = true;
          }
        }

        console.log(teacherStatus);
        console.log(advisor);
        var check = teacherStatus.every(function (status) {
          return status == 1;
        });
        if (check && advisor) {
          setIsAdvisor(true);
        } else {
          setIsAdvisor(false);
        }
      });
  };
  const onChangeEdit = (e) => {
    setEdit(e.target.value);
  };

  const sendEdit = (teacherName, id) => {
    var text = "||แก้ไขโดย : " + teacherName + " --> " + edit;
    axios
      .put(`https://demo-tspm-server.herokuapp.com/project/examresult/${id}`, {
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
  const validationTestExam = async () => {
    await axios
      .put(
        `https://demo-tspm-server.herokuapp.com/final-teacher/validation-state10/${teacherID}/${projectID}`,
        {
          idTeacher: teacherID,
          idNotification: idNotification,
        }
      )
      .then(async (res) => {
        await functionNew();

        console.log(res.data);
      });
  };

  const validationTestExamEdit = async () => {
    var text = "//แก้ไขโดย : " + teacherName + " --> " + edit;
    await axios
      .put(
        `https://demo-tspm-server.herokuapp.com/final-teacher/validation-state10-test/${teacherID}/${projectID}`,
        {
          idTeacher: teacherID,
          idNotification: idNotification,
          edit: text,
        }
      )
      .then(async (res) => {
        await functionNew();
        console.log(res.data);
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
      {/* <div
        className="text-blue-600  cursor-pointer hover:text-indigo-500"
        onClick={() => {
          //   getExamResults(notification.id_project);
          //   modalContent(
          //     2,
          //     "บันทึกผลการสอบโครงงาน",
          //     notification.project_name_th,
          //     notification.id_project
          //   );
          //getExamResults(projectID);
          handleClickOpen();
        }}
      >
        {" "}
        ดูรายละเอียด
      </div> */}
      <div className="flex space-x-5 justify-center">
        <button
          onClick={validationTestExam}
          //onClick={updateAsses}
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
          // onClick={() => {
          //   handleClickOpen(), getAsses();
          // }}
          onClick={() => {
            //getExamResults(projectID);
            handleClickOpenEdit();
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

        {/* <button
          className="bg-green-300 px-8  py-2  text-lg shadow-sm font-medium tracking-wider   rounded-2xl hover:shadow-2xl hover:bg-green-400 focus:outline-none"
          onClick={validation}
        >
          ยอมรับ
        </button>
        <button
          onClick={() => {
            //getExamResults(projectID);
            handleClickOpenEdit();
          }}
          className="bg-yellow-300 px-8 py-2 text-lg shadow-sm font-medium tracking-wider   rounded-2xl hover:shadow-2xl hover:bg-yellow-400 focus:outline-none"
        >
          แก้ไข
        </button> */}
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
          <p className="text-2xl">แก้ไขบันทึกผลการสอบโครงงาน</p>{" "}
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
                        {exam.exam_details.length == 0
                          ? "ไม่มีข้อเสนอแนะ"
                          : exam.exam_details}
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
          {" "}
          <Button
            onClick={handleCloseEdit}
            variant="contained"
            color="secondary"
          >
            ปิด
          </Button>
          <Button
            onClick={() => {
              //sendEdit(teacherName, teacherID);
              // getExamResults(projectID);
              // handleCloseEdit();
              validationTestExamEdit()
              
            }}
            variant="contained"
            color="primary"
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

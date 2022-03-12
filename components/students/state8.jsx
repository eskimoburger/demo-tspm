import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DoneIcon from "@material-ui/icons/Done";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function state8(props) {
  const [status, setStatus] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [alertC, setAlertC] = useState(false);
  const [feedback, setFeedback] = useState("");
  // const [teacher, setTeacher] = useState({
  //   name: "",
  //   id_teacher: 0,
  //   role: "",
  // });

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    //getTeacher();
    setStatus(props.project.asses_status);
    setTeacher(props.project.advisor);
    //getAssesStatus();
  }, []);

  const getAssesFeedback = async () => {
    await axios
      .get(
        "http://localhost:3001/final-project/asses-feedback/" +
          props.project.idP
      )
      .then((res) => {
        setShowFeedback(true);
        setFeedback(res.data.results.feedback);
      })
      .catch((_) => {
        alert("Cannot load feedback!");
      });
  };

  // function getAssesStatus() {
  //     axios
  //       .get(`http://localhost:3001/project/asses/${props.project.id}`)
  //       .then((res) => {
  //         //console.log(res.data[0]);
  //         if (res.data[0].asses_status===1) {
  //           setStatus(true)
  //         }
  //       });
  //   }
  // function getTeacher() {
  //   var teacher = [];
  //   for (let i = 0; i < props.project.committees.length; i++) {
  //     if (props.project.committees[i].role == "อาจารย์ที่ปรึกษา") {
  //       //console.log(props.project.committees[i]);
  //       teacher.push({
  //         name: props.project.committees[i].teacher_name,
  //         id_teacher: props.project.committees[i].id_teacher,
  //         role: props.project.committees[i].role,
  //       });
  //     }
  //   }
  //   console.log(teacher[0]);
  //   setTeacher(teacher[0]);
  //   setStatus(props.project.asses_status);
  // }
  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "450px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#b91c1c",
          opacity: "90%",
        }}
      >
        รอการตอบรับประเมินความคืบหน้า
      </div>
      <div
        className="flex flex-col justify-center mx-auto px-4  pt-4 pb-6 text-xl mt-4 bg-white rounded-2xl  "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
          width: "70%",
        }}
      >
        <p className="text-center text-3xl my-2 text-gray-800">
          {" "}
          ผลการประเมินความก้าวหน้าโครงงงาน
        </p>

        <div className=" m-auto text-gray-700 my-4" style={{ width: "90%" }}>
          {teacher ? (
            <p>
              {" "}
              <span className="font-bold">อาจารย์ที่ปรึกษา : </span>
              {teacher.teacher_name}{" "}
            </p>
          ) : null}
          <p>
            <span className="font-bold">
              สรุปผลการประเมิน :{" "}
              {status === 3 ? (
                <span className="font-normal text-green-500">
                  <DoneIcon /> สมควรให้ดำเนินโครงงานต่อไป
                </span>
              ) : status === 2 ? (
                <span className="font-normal text-green-500">
                  <DoneIcon /> สมควรให้ดำเนินโครงงานต่อไป
                  แต่ควรมีการปรับแก้ตามข้อเสนอแนะ
                </span>
              ) : status === 1 ? (
                <span className="font-normal text-red-500">
                  ไม่สมควรดำเนินโครงงานในหัวข้อนี้ต่อไป
                </span>
              ) : (
                <span className="font-normal text-yellow-500">
                  ยังไม่ได้รับการประเมิน
                </span>
              )}
            </span>
          </p>
        </div>
        {status == 2 ? (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => getAssesFeedback()}
              className="bg-blue-500 p-2 text-white  rounded-lg hover:bg-blue-700 "
              style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
            >
              ดูข้อเสนอแนะ
            </button>
            <button
              onClick={() => setAlertC(true)}
              className="bg-green-600 p-2 text-white  rounded-lg hover:bg-green-900 "
              style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
            >
              <ArrowForwardIcon /> ดำเนินการต่อ
            </button>
          </div>
        ) : status == 3 ? (
          <div className="flex justify-center">
            <button
              onClick={() => setAlertC(true)}
              className="bg-green-600 p-2 text-white  rounded-lg hover:bg-green-900 "
              style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
            >
              <ArrowForwardIcon /> ดำเนินการต่อ
            </button>
          </div>
        ) :null}
      </div>

      <Dialog
        open={alertC}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"ยืนยันเพื่อดำเนินการต่อ ?"}</p>{" "}
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
              setAlertC(false);
            }}
            className=" h-10 rounded-lg bg-red-600   uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-4 "
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              props.functionNext();
              //finalCancelProject();
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ยืนยัน
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showFeedback}
        fullWidth={true}
        maxWidth="lg"
        onClose={() => setShowFeedback(false)}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">ข้อเสนอแนะ</p>{" "}
        </DialogTitle>
        <DialogContent
          className=" text-xl mb-4 "
          style={{ wordBreak: "break-word", textIndent: "40px" }}
        >
          {feedback}
        </DialogContent>
      </Dialog>
    </div>
  );
}

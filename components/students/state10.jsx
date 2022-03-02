import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DoneIcon from "@material-ui/icons/Done";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function state10(props) {
  const [status, setStatus] = useState(0);
  const [dialogStatus, setDialogStatus] = useState(0);
  const [alert, setAlert] = useState(false);

  const handleOpenAlert = (statusD) => {
    setAlert(true);
    setDialogStatus(statusD);
  };

  const ConfirmAlert = () =>{
    if(dialogStatus == 1){
      props.functionNext()

    }else if(dialogStatus ==2){
      backToStageProject()

    }
  }
  // const [teacher, setTeacher] = useState({
  //   name: "",
  //   id_teacher: 0,
  //   role: "",
  // });

  const [teacher, setTeacher] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setStatus(props.project.test_status);
    setTeacher(props.project.advisor);
    getFeedback(props.project.idP);
    //getTeacher();
    //getAssesStatus();
  }, []);

  // function getAssesStatus() {
  //     axios
  //       .get(`https://demo-tspm-server.herokuapp.com/project/asses/${props.project.id}`)
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
  //   setStatus(props.project.test_status);
  // }

  async function getFeedback(id) {
    await axios
      .get("https://demo-tspm-server.herokuapp.com/final-project/get-test-feedback/" + id)
      .then((res) => {
        setFeedback(res.data.results.test_feedback);

        console.log(res.data);
      });
  }

  // function nextStageProject() {
  //   axios
  //     .put(`http://192.168.1.7:3001/project/nextstage/${props.project.idP}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }

  async function backToStageProject() {
    await axios
      .put(
        `https://demo-tspm-server.herokuapp.com/final-project/back-to-stage/${props.project.idP}`,
        {
          state: 8,
        }
      )
      .then((response) => {
        props.function();
        console.log(response.data);
      });
  }

  // var feedbackButton = null;

  // if (feedback) {
  //   if (feedback.length == 0) {
  //     feedbackButton = null;
  //   } else {
  //     feedbackButton = "Hello"
  //   }
  // } else {
  //   feedbackButton = null;
  // }
  return (
    <>
      <div
        className=" bg-white  rounded-md p-5 mt-5"
        style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
      >
        <div
          className="  text-center text-2xl text-white py-2 rounded-md font-bold "
          style={{
            width: "425px",
            height: "50px",
            marginTop: "-25px",
            marginLeft: "-25px",
            boxShadow: "#00000038 1.95px 1.95px 1.95px",

            backgroundColor: "#b91c1c",
            opacity: "90%",
          }}
        >
          รอการตอบรับขอสอบโครงงงาน
        </div>
        <div
          className="flex flex-col justify-center mx-auto px-4  pt-4 pb-6 text-xl mt-4 bg-white rounded-2xl  "
          style={{
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
            width: "60%",
          }}
        >
          <p className="text-center text-3xl my-2 text-gray-800">
            {" "}
            ผลการตอบรับขอสอบโครงงงาน
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
                {status === 1 ? (
                  <span className="font-normal text-green-500">
                    <DoneIcon /> เห็นสมควรให้สอบโครงงานได้
                  </span>
                ) : status === 2 ? (
                  <span className="font-normal text-red-500">
                    ยังไม่สมควรให้สอบโครงงาน
                  </span>
                ) : (
                  <span className="font-normal text-yellow-500">
                    ยังไม่ได้รับการตอบรับ
                  </span>
                )}
              </span>
            </p>
          </div>
          <>
            {status == 2 ? (
              <div className="flex justify-center gap-2">
                {feedback != null && feedback.length != 0 && (
                  <button
                    onClick={() => setShowFeedback(true)}
                    className="bg-blue-500 p-2 text-white  rounded-lg hover:bg-blue-700 "
                    style={{
                      boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
                    }}
                  >
                    ดูข้อเสนอแนะ
                  </button>
                )}
                <button
                  className="bg-yellow-500 p-2 text-white  rounded-lg hover:bg-yellow-600 "
                  style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
                  onClick={()=> 
                    handleOpenAlert(2)
                  //   () => {
                  //   backToStageProject();
                  // }
                }
                >
                  <ArrowForwardIcon /> ดำเนินการต่อ
                </button>
              </div>
            ) : status == 1 ? (
              <div className="flex justify-center gap-2">
                {feedback != null && feedback.length != 0 && (
                  <button
                    onClick={() => setShowFeedback(true)}
                    className="bg-blue-500 p-2 text-white  rounded-lg hover:bg-blue-700 "
                    style={{
                      boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
                    }}
                  >
                    ดูข้อเสนอแนะ
                  </button>
                )}
                <button
                  className="bg-green-600 p-2 text-white  rounded-lg hover:bg-green-900 "
                  style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
                  onClick={()=>
                    handleOpenAlert(1)
                  //   () => {
                    


                  //   nextStageProject();
                  //   props.function();
                  // }
                }
                >
                  <ArrowForwardIcon /> ดำเนินการต่อ
                </button>
              </div>
            ) : null}
          </>
        </div>
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

        <Dialog
          open={alert}
          //onClose={handleClose}
        >
          <DialogTitle>
            {" "}
            <p className="text-2xl">{"ยืนยันเพื่อดำเนินการต่อ !"}</p>{" "}
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
              onClick={ConfirmAlert}
              className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
            >
              ยืนยัน
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

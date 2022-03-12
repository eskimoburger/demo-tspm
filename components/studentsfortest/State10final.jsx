import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DoneIcon from "@material-ui/icons/Done";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import TimerIcon from "@material-ui/icons/Timer";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
  button: {
    //margin: theme.spacing(1),
    color: "white",

    backgroundColor: "#00acc1",
    "&:hover": {
      backgroundColor: "#006064",
    },
  },
  buttonFeed: {
    //margin: theme.spacing(1),
    color: "white",

    backgroundColor: "#fbc02d",
    "&:hover": {
      backgroundColor: "#f9a825",
    },
  },
}));

export default function state10({
  testStatus,
  functionNext,
  projectId,
  advisor,
  refreshData,
  goBack,
}) {
  const classes = useStyles();
  const [status, setStatus] = useState(0);
  const [dialogStatus, setDialogStatus] = useState(0);
  const [alertC, setAlertC] = useState(false);

  const handleOpenAlert = (statusD) => {
    setAlertC(true);
    setDialogStatus(statusD);
  };

  const ConfirmAlert = () => {
    if (dialogStatus == 1) {
      refreshData();
    } else if (dialogStatus == 2) {
      //backToStageProject();
      goBack();
    }
  };
  // const [teacher, setTeacher] = useState({
  //   name: "",
  //   id_teacher: 0,
  //   role: "",
  // });

  const [teacher, setTeacher] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedButton, setSelectedButton] = useState(1);

  useEffect(() => {
    //setStatus(testStatus);
    setTeacher(advisor);
    getFeedback(projectId);
    //getTeacher();
    //getAssesStatus();
  }, []);

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
  //   setStatus(props.project.test_status);
  // }

  async function getFeedback(id) {
    await axios
      .get("http://localhost:3001/final-project/get-test-feedback/" + id)
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
      .put(`http://localhost:3001/final-project/back-to-stage/${projectId}`, {
        state: 8,
      })
      .then((response) => {
        refreshData();
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
  const setStatusButton = (statusB) => {
    if (statusB === 1) {
      setSelectedButton(1);
      setStatus(0);
    } else if (statusB === 2) {
      setSelectedButton(2);
      setStatus(1);
    } else if (statusB === 3) {
      setSelectedButton(3);
      setStatus(2);
    }
  };
  // }
  return (
    <>
      <div
        className=" bg-white  rounded-md p-5 mt-5"
        style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
      >
        <div
          className="  text-center text-xl text-white py-2 rounded-md font-bold stage2:w-[425px] stage2:h-[50px] stage2:text-2xl "
          style={{
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
          className="flex flex-col justify-center mx-auto px-4  pt-4 pb-6 text-xl mt-4 bg-gray-50 rounded-2xl  "
          style={{
            boxShadow:
              " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            width: "90%",
          }}
        >
          <div className="flex justify-center flex-wrap gap-2">
            <button
              // onClick={UploadPass}
              onClick={() => setStatusButton(1)}
              className={`${
                selectedButton === 1 ? "bg-blue-500" : "bg-blue-400"
              }  py-1 px-2 rounded text-white`}
            >
              สถานะ 1
            </button>
            <button
              // onClick={UploadNotPass}
              onClick={() => setStatusButton(2)}
              className={`${
                selectedButton === 2 ? "bg-blue-500" : "bg-blue-400"
              }  py-1 px-2 rounded text-white`}
            >
              สถานะ 2
            </button>
            <button
              // onClick={UploadNotPass}
              onClick={() => setStatusButton(3)}
              className={`${
                selectedButton === 3 ? "bg-blue-500" : "bg-blue-400"
              }  py-1 px-2 rounded text-white`}
            >
              สถานะ 3
            </button>
          </div>
          <h1 className="text-center font-bold  my-2 text-gray-800  text-2xl   stage2:text-3xl">
            {" "}
            ผลการตอบรับ <br /> ขอสอบโครงงงาน
          </h1>
          <br />

          <div
            className="stage2:text-left text-base  stage2:w-[500px] stage2:text-2xl space-y-2 flex flex-col items-center "
            style={{ width: "90%" }}
          >
            {teacher ? (
              <p>
                {" "}
                <span className="font-bold">อาจารย์ที่ปรึกษา : </span>
                {teacher.teacher_name}{" "}
              </p>
            ) : null}
            <div>
              <div className="font-bold flex flex-wrap  justify-center gap-2">
                <h2>สรุปผลการประเมิน : </h2>
                {status === 1 ? (
                  <div className="flex items-center  shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-green-600 px-4 py-1 rounded-full">
                    <DoneIcon /> เห็นสมควรให้สอบโครงงานได้
                  </div>
                ) : status === 2 ? (
                  <div className="flex items-center  shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-red-500 px-4 py-1 rounded-full">
                    <CloseIcon /> ยังไม่สมควรให้สอบโครงงาน
                  </div>
                ) : (
                  <div className="flex items-center  gap-2 shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-yellow-500 px-4 py-1 rounded-full">
                    <TimerIcon /> ยังไม่ได้รับการตอบรับ
                  </div>
                )}
              </div>
            </div>
          </div>
          <br />

          {status == 2 ? (
            <div className="flex justify-center gap-2 mt-4">
              {/* <Button
              className={classes.buttonFeed}
              onClick={() => setShowFeedback(true)}
              variant="contained"
              size="large"
              startIcon={<ErrorOutlineIcon />}
              style={{ fontSize: 20 }}
            >
              ดูข้อเสนอแนะ
            </Button> */}
              <Button
                className={classes.buttonFeed}
                onClick={() => handleOpenAlert(2)}
                variant="contained"
                size="large"
                startIcon={<ArrowForwardIcon />}
                style={{ fontSize: 20 }}
              >
                ดำเนินการต่อ
              </Button>
            </div>
          ) : status == 3 ? (
            <div className="flex justify-center mt-4">
              <Button
                className={classes.button}
                onClick={() => setAlertC(true)}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ArrowForwardIcon />}
                style={{ fontSize: 20 }}
              >
                ดำเนินการต่อ
              </Button>
            </div>
          ) : status == 1 ? (
            <div className="flex justify-center gap-2">
              {feedback != null && feedback.length != 0 && (
                <Button
                  className={classes.buttonFeed}
                  onClick={() => setShowFeedback(true)}
                  variant="contained"
                  size="large"
                  startIcon={<ErrorOutlineIcon />}
                  style={{ fontSize: 20 }}
                >
                  ดูข้อเสนอแนะ
                </Button>
              )}
              <Button
                className={classes.button}
                onClick={() => handleOpenAlert(1)}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ArrowForwardIcon />}
                style={{ fontSize: 20 }}
              >
                ดำเนินการต่อ
              </Button>
            </div>
          ) : null}
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
          open={alertC}
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
                setAlertC(false);
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

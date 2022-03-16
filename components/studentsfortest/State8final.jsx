import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DoneIcon from "@material-ui/icons/Done";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import TimerIcon from "@material-ui/icons/Timer";

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
    color: "black",

    backgroundColor: "#fbc02d",
    "&:hover": {
      backgroundColor: "#f9a825",
    },
  },
}));

export default function State8({
  assesStatus,
  projectId,
  advisor,
  functionNext,
  projectData,
  committees,
  members,
  refreshData,
  goBack
}) {
  const classes = useStyles();
  const [status, setStatus] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [alertC, setAlertC] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [selectedButton, setSelectedButton] = useState(1);

  useEffect(() => {
    //getTeacher();
    //setStatus(assesStatus);
    setTeacher(advisor);
    //getAssesStatus();
  }, []);

  const getAssesFeedback = async () => {
    setShowFeedback(true);
    setFeedback("ไปเพิ่มหรือไปแก้ไขในส่วนของบทที่ 3")
    // await axios
    //   .get("https://demo-tspm-server.herokuapp.com/final-project/asses-feedback/" + projectId)
    //   .then((res) => {
    //     setShowFeedback(true);
    //     setFeedback(res.data.results.feedback);
    //   })
    //   .catch((_) => {
    //     alert("Cannot load feedback!");
    //   });
  };

  const goToStage1 = async () => {
    await axios
      .post("https://demo-tspm-server.herokuapp.com/final-project/delete-project/" + projectId, {
        projectData: projectData,
        committees: committees,
        members: members,
      })
      .then((res) => {
        refreshData();

        console.log(res.data);
      });
  };

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
    } else {
      setSelectedButton(4);
      setStatus(3);
    }
  };

  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-xl text-white py-2 rounded-md font-bold stage2:w-[450px] stage2:h-[50px] stage2:text-2xl "
        style={{
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
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          width: "90%",
        }}
      >
        <div className="flex justify-center flex-wrap gap-2">
          <button
            //onClick={fixedResetData}
            onClick={() => setStatusButton(1)}
            className={`${
              selectedButton === 1 ? "bg-blue-500" : "bg-blue-400"
            }  py-1 px-2 rounded text-white`}
          >
            สถานะ 1
          </button>
          <button
            onClick={() => setStatusButton(2)}
            //onClick={fixedResetSelected}
            className={`${
              selectedButton === 2 ? "bg-blue-500" : "bg-blue-400"
            }  py-1 px-2 rounded text-white`}
          >
            สถานะ 2
          </button>
          <button
            onClick={() => setStatusButton(3)}
            //onClick={fixedResetData}
            className={`${
              selectedButton === 3 ? "bg-blue-500" : "bg-blue-400"
            }  py-1 px-2 rounded text-white`}
          >
            สถานะ 3
          </button>
          <button
            onClick={() => setStatusButton(4)}
            //onClick={fixedResetSelected}
            className={`${
              selectedButton === 4 ? "bg-blue-500" : "bg-blue-400"
            }  py-1 px-2 rounded text-white`}
          >
            สถานะ 4
          </button>
        </div>
        <h1 className="text-center font-bold  my-2 text-gray-800  text-2xl   stage2:text-3xl">
          {" "}
          ผลการประเมินความ
          <br />
          ก้าวหน้าโครงงงาน
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
              {status === 3 ? (
                <div className="flex items-center  shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-green-600 px-4 py-1 rounded-full">
                  <DoneIcon /> สมควรให้ดำเนินโครงงานต่อไป
                </div>
              ) : status === 2 ? (
                <div className="flex items-center  shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-green-600 px-4 py-1 rounded-full">
                  <DoneIcon /> สมควรให้ดำเนินโครงงานต่อไป
                  แต่ควรมีการปรับแก้ตามข้อเสนอแนะ
                </div>
              ) : status === 1 ? (
                <div className="flex items-center  shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-red-500 px-4 py-1 rounded-full">
                  <CloseIcon /> ไม่สมควรดำเนินโครงงานในหัวข้อนี้ต่อไป
                </div>
              ) : (
                <div className="flex items-center  gap-2 shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-yellow-500 px-4 py-1 rounded-full">
                  <TimerIcon /> ยังไม่ได้รับการประเมิน
                </div>
              )}
            </div>
          </div>
        </div>
        {status == 1 ? (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              className={classes.button}
              onClick={goBack}
              variant="contained"
              size="large"
              startIcon={<ArrowForwardIcon />}
              style={{ fontSize: 20 }}
            >
              ดำเนินการเสนอหัวข้อโครงงานใหม่
            </Button>
          </div>
        ) : status == 2 ? (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              className={classes.buttonFeed}
              onClick={() => getAssesFeedback()}
              variant="contained"
              size="large"
              startIcon={<ErrorOutlineIcon />}
              style={{ fontSize: 20 }}
            >
              ดูข้อเสนอแนะ
            </Button>
            <Button
              className={classes.button}
              onClick={() => setAlertC(true)}
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
        ) : null}
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
            onClick={refreshData}
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

import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
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
    color: "white",

    backgroundColor: "#fbc02d",
    "&:hover": {
      backgroundColor: "#f9a825",
    },
  },
}));

export default function state12({ advisor, finalStatus, functionNext,refreshData }) {
  useEffect(() => {
    setTeacher(advisor);
    setStatus(finalStatus);
  }, []);
  const classes = useStyles();
  const [teacher, setTeacher] = useState(null);
  const [status, setStatus] = useState(0);
  const [selectedButton, setSelectedButton] = useState(1);

  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "325px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#b91c1c",
          opacity: "90%",
        }}
      >
        รออาจารย์ตอบกลับ
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
              onClick={() => {setSelectedButton(1),setStatus(2)}}
              className={`${
                selectedButton === 1 ? "bg-blue-500" : "bg-blue-400"
              }  py-1 px-2 rounded text-white`}
            >
              สถานะ 1
            </button>
            <button
              // onClick={UploadNotPass}
              onClick={() => {setSelectedButton(2),setStatus(1)}}
              className={`${
                selectedButton === 2 ? "bg-blue-500" : "bg-blue-400"
              }  py-1 px-2 rounded text-white`}
            >
              สถานะ 2
            </button>
         
          </div>

        <h1 className="text-center font-bold  my-2 text-gray-800  text-2xl   stage2:text-3xl">
          {" "}
          ผลการตอบรับบันทึก <br /> ผลการสอบโครงงงาน
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
              <h2>สรุปผลการสอบโครงงาน : </h2>
              {status === 1 ? (
                <div className="flex items-center  shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-green-600 px-4 py-1 rounded-full">
                  <DoneIcon /> ตรวจสอบเรียบร้อย
                </div>
              ) : (
                <div className="flex items-center  gap-2 shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-yellow-500 px-4 py-1 rounded-full">
                  <TimerIcon /> ยังไม่ได้รับการตรวจสอบ
                </div>
              )}
            </div>
          </div>
        </div>
        <br />

        {status == 1 ? (
          <div className="flex justify-center gap-2">
            <Button
              className={classes.button}
              onClick={refreshData}
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
    </div>
  );
}

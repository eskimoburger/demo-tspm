import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
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

export default function state14({ finalAssesStatus, functionNext,refreshData,projectId}) {
  const classes = useStyles()
  useEffect(() => {
    setStatus(finalAssesStatus);
  }, []);
  const [status, setStatus] = useState(0);

  async function backToStageProject() {
    await axios
      .put(`https://demo-tspm-server.herokuapp.com/project/backToStage/${projectId}`, {
        state: 12,
      })
      .then((_) => {
       refreshData()
      }).catch(_=>alert("Cannot back to stage!"));
  }

  const finalAssesFeedback = async()=> {

  }

  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "300px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#1C3F60",
        }}
      >
        รอผลการประเมินรูปเล่ม
      </div>

      <div
        className="flex flex-col justify-center mx-auto px-4  pt-4 pb-6 text-xl mt-4 bg-gray-50 rounded-2xl  "
        style={{
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          width: "90%",
        }}
      >
        <h1 className="text-center font-bold  my-2 text-gray-800  text-2xl   stage2:text-3xl">
          {" "}
          ผลการประเมิน <br /> รูปเล่มปริญญานิพนธ์
        </h1>
        <br />
        

        <div
          className="stage2:text-left text-base  stage2:w-[500px] stage2:text-2xl space-y-2 flex flex-col items-center "
          style={{ width: "90%" }}
        >
           <h2 className="font-bold"> อาจารย์ประจำรายวิชา </h2>
         

          <div>
            <div className="font-bold flex flex-wrap  justify-center gap-2">
              <h2>สรุปผลการประเมิน : </h2>
              {status === 2 ? (
                <div className="flex items-center  shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-red-600 px-4 py-1 rounded-full">
                  สมควรแก้ไขรายงานตามคำแนะนำและส่งให้ตรวจซ้ำอีกครั้ง{" "}
                </div>
              ) : status === 1 ? (
                <div className="flex items-center  shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-green-600 px-4 py-1 rounded-full">
                   ไม่ต้องทำการแก้ไขรายงาน{" "}
                </div>
              ) : (
                <div className="flex items-center  gap-2 shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-yellow-500 px-4 py-1 rounded-full">
                  ยังไม่ได้รับการตรวจสอบ
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="flex justify-center gap-2">
          {status === 2 ? (
            <>
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

              <Button
                className={classes.button}
                onClick={backToStageProject}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ArrowForwardIcon />}
                style={{ fontSize: 20 }}
              >
                ดำเนินการต่อ
              </Button>
            </>
          ) : status == 1 ? (
            <Button
              className={classes.button}
              onClick={functionNext}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ArrowForwardIcon />}
              style={{ fontSize: 20 }}
            >
              ดำเนินการต่อ
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

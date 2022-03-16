import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
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
const SUMMARIZE = {
  1: "เหมาะสม",
  2: "ไม่เหมาะสม",
};
const DEFAULT_DATA =[
  {
    id: 57,
    id_project: 120,
    final1: 2,
    final2: 2,
    final3: 2,
    final4: 1,
    final_details: "ไปแก้นี่มานะ........",
    times: 0,
  }
] 

export default function state14({
  finalAssesStatus,
  functionNext,
  refreshData,
  projectId,
  finalCount,
  backState
}) {
  const classes = useStyles();
  useEffect(() => {
    //setStatus(finalAssesStatus);
  }, []);
  const [status, setStatus] = useState(0);

  async function backToStageProject() {
    await axios
      .put(`https://demo-tspm-server.herokuapp.com/project/backToStage/${projectId}`, {
        state: 12,
      })
      .then((_) => {
        refreshData();
      })
      .catch((_) => alert("Cannot back to stage!"));
  }

  const getFinalAsses = async () => {
    // await axios
    //   .get(
    //     `https://demo-tspm-server.herokuapp.com/final-project/get-asses-final/${projectId}/${finalCount-1}`
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     setFinalAssesResults(res.data);
    //     setOpenFinalAsses(true);
    //   })
    //   .catch((_) => alert("Cannot get results"));
    setOpenFinalAsses(true);
    setFinalAssesResults(DEFAULT_DATA);
  };
  const [openFinalAsses, setOpenFinalAsses] = useState(false);
  const [finalAssesResults, setFinalAssesResults] = useState(null);
  const [selectedButton, setSelectedButton] = useState(1);

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
        <div className="flex justify-center flex-wrap gap-2">
          <button
            // onClick={UploadPass}
            onClick={() => {
              setSelectedButton(1), setStatus(0);
            }}
            className={`${
              selectedButton === 1 ? "bg-blue-500" : "bg-blue-400"
            }  py-1 px-2 rounded text-white`}
          >
            สถานะ 1
          </button>
          <button
            // onClick={UploadNotPass}
            onClick={() => {
              setSelectedButton(2), setStatus(1);
            }}
            className={`${
              selectedButton === 2 ? "bg-blue-500" : "bg-blue-400"
            }  py-1 px-2 rounded text-white`}
          >
            สถานะ 2
          </button>
          <button
            // onClick={UploadNotPass}
            onClick={() => {
              setSelectedButton(3), setStatus(2);
            }}
            className={`${
              selectedButton === 3 ? "bg-blue-500" : "bg-blue-400"
            }  py-1 px-2 rounded text-white`}
          >
            สถานะ 3
          </button>
        </div>
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
                onClick={getFinalAsses}
                variant="contained"
                size="large"
                startIcon={<ErrorOutlineIcon />}
                style={{ fontSize: 20 }}
              >
                ดูข้อเสนอแนะ
              </Button>

              <Button
                className={classes.button}
                onClick={backState}
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
              onClick={refreshData}
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
      <Dialog
        open={openFinalAsses}
        onClose={() => {
          setOpenFinalAsses(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการประเมินรูปเล่มปริญานิพนธ์"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4 space-y-2 ">
          {/* {JSON.stringify(finalAssesResults)} */}
          {finalAssesResults && (
            <>
              <div>
                <p>
                  1.
                  รูปแบบการพิมพ์รายงานถูกต้องตามระเบียบของคณะและ/หรือมหาวิทยาลัย
                  &nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final1]}
                  </span>
                </p>{" "}
                <p>
                  2. เนื้อหารายงานครบถ้วนสมบูรณ์&nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final2]}
                  </span>
                </p>{" "}
                <p>
                  3. การอ้างอิงบรรณานุกรมถูกต้องตามรูปแบบที่กำหนด&nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final3]}
                  </span>
                </p>
                <p>
                  {" "}
                  4. รูปแบบการเขียนสารบัญเนื้อหา
                  สารบัญรูปภาพและตารางถูกต้องตามกำหนด &nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final4]}
                  </span>
                </p>
              </div>
              <div>
                <h2 className="font-bold">ข้อเสนอแนะ</h2>
                <div className="indent-2">
                  <p>{finalAssesResults[0].final_details}</p>
                </div>
              </div>
            </>
          )}

          {/* {finalResults.map((m, i) => {
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
          })} */}
          <div></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

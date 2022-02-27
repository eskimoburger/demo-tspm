import React, { useState } from "react";
import Logbook from "./logbook";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useRouter } from "next/router";
import axios from "axios"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
var today = year + "-" + month + "-" + day;

const DEFAULT_LOGBOOK = {
  summary: "",
  problem: "",
  solution: "",
  next_date: "",
};

const SaveLogbook = ({ state, logbookData ,projectId,refreshData }) => {
  const router = useRouter();
  const [logbook, setLogbook] = useState(DEFAULT_LOGBOOK);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLogbook(DEFAULT_LOGBOOK);
  };

  const sendLogbook = () => {
    axios
      .post(`http://localhost:3001/project/logbook/${projectId}`, {
        date: today,
        summary: logbook.summary,
        problem: logbook.problem,
        solution: logbook.solution,
        nextDate: logbook.next_date,
        number: logbookData + 1,
      })
      .then(async (res) => {
        console.log(res.data);
        refreshData()
        handleClose();
      });
  };

  return (
    <div
      className="rounded-lg flex flex-col"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px", width: "730px" }}
    >
      <div
        className="p-2  rounded-t-lg text-white  text-2xl"
        style={{ backgroundColor: "hsl(356, 71%, 59%)" }}
      >
        แบบบันทึกความก้าวหน้า (Logbook)
      </div>
      <div
        className="bg-gray-50 rounded-b-lg flex flex-col items-center  "
        style={{ height: "100%" }}
      >
        <p className=" mt-4  text-center mx-2">
          สถานะการส่งแบบบันทึกความก้าวหน้า (Logbook) :{" "}
          <span className="text-yellow-600"> {logbookData}/12</span>{" "}
        </p>
        <Logbook logbook={logbookData} projectId={projectId} />
        {state >= 2 && state < 14 && (
          <div className="my-2">
            <button
              type="button"
              className="bg-yellow-400 text-white px-4 py-1 rounded font-medium  hover:bg-yellow-500 transition duration-200 each-in-out"
              onClick={handleClickOpen}
            >
              บันทึกความก้าวหน้า
            </button>
          </div>
        )}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle className="bg-yellow-500 ">
          <p className="text-2xl font-bold text-white">
            แบบฟอร์มบันทึกความก้าวหน้าครั้งที่ {logbookData + 1}
          </p>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <div className="">
              <label htmlFor="date" className="block text-xl my-2">
                วันที่
              </label>
              <input
                id="date"
                type="date"
                className="w-full p-2 block focus:outline-none focus:border-red-800 border-2 hover:border-red-800 rounded-md"
                defaultValue={today}
              />

              <label htmlFor="conclude" className="block text-xl my-2">
                สรุปความคืบหน้าของงานที่ได้รับมอบหมาย
              </label>
              <textarea
                value={logbook.summary}
                onChange={(e) => {
                  setLogbook((prev) => {
                    return { ...prev, [e.target.id]: e.target.value };
                  });
                }}
                name=""
                id="summary"
                rows="5"
                className="w-full p-2 block hover:border-red-800 border-2 focus:outline-none focus:border-red-800"
                placeholder="สรุปความคืบหน้าของงานที่ได้รับมอบหมาย..."
              ></textarea>
              <label htmlFor="topic" className="block text-xl my-2">
                ปัญหาที่พบหรือหัวข้อที่เข้ารับคำปรึกษา
              </label>
              <textarea
                name=""
                value={logbook.problem}
                id="problem"
                rows="5"
                className="w-full p-2 block hover:border-red-800 border-2 focus:outline-none focus:border-red-800"
                placeholder="ปัญหาที่พบหรือหัวข้อที่เข้ารับคำปรึกษา..."
                onChange={(e) => {
                  setLogbook((prev) => {
                    return { ...prev, [e.target.id]: e.target.value };
                  });
                }}
              ></textarea>
              <label htmlFor="job" className="block text-xl my-2">
                แนวทางการแก้ปัญหา หรือ งานที่ได้รับมอบหมาย
              </label>
              <textarea
                name=""
                id="solution"
                value={logbook.solution}
                onChange={(e) => {
                  setLogbook((prev) => {
                    return { ...prev, [e.target.id]: e.target.value };
                  });
                }}
                rows="5"
                className="w-full p-2 block hover:border-red-800 border-2 focus:outline-none focus:border-red-800"
                placeholder="แนวทางการแก้ปัญหา หรือ งานที่ได้รับมอบหมาย..."
              ></textarea>
              <label htmlFor="next_date" className="block text-xl my-2">
                กำหนดการนัดหมายครั้งต่อไป
              </label>
              <input
                value={logbook.next_date}
                id="next_date"
                type="date"
                className="w-full p-2 block focus:outline-none focus:border-red-800 border-2 hover:border-red-800 rounded-md"
                onChange={(e) => {
                  setLogbook((prev) => {
                    return { ...prev, [e.target.id]: e.target.value };
                  });
                }}
              />
            </div>
            {/* <button
              onClick={() => {
                console.log(logbook);
              }}
              className="bg-blue-500 text-2xl w-full block p-2 my-3 text-white rounded-lg hover:bg-blue-400"
              //type="submit"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
              }}
            >
              ส่ง
            </button> */}
          </form>
          {logbook.solution != "" &&
            logbook.summary != "" &&
            logbook.summary != "" &&
            logbook.next_date != "" && (
              <button
                onClick={
                  sendLogbook
                  //console.log(logbsendLogbook();
                  // handleClose();
                  // router.push("/students");
                }
                className="bg-blue-500 text-2xl w-full block p-2 my-3 text-white rounded-lg hover:bg-blue-400"
                //type="submit"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
                }}
              >
                ส่ง
              </button>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaveLogbook;

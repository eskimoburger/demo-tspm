import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function teacherState4(props) {
  useEffect(() => {
    getFile();
  }, []);

  const [showFile, setShowFile] = useState("");
  const [alert, setAlert] = useState(false);
  const getFile = () => {
    axios
      .get(`http://localhost:3001/final-teacher/file-state3/${props.projectID}`)
      .then((res) => {
        console.log(res.data);
        setShowFile(res.data);
      });
  };

  const validation = async() => {
    await axios
      .put(
        `http://localhost:3001/final-teacher/validation-state3/${props.projectID}`,
        {
          idTeacher: props.teacherID,
          idNotification:props.id,
          description:`${props.teacherName} ได้ยืนยันการขอสอบหัวข้อโครงงงานแล้ว`
        }
      )
      .then(async(res) => {
        await props.function();
        console.log(res.data);
        setAlert(false)
      });
  };

  return (
    <div>
      <div className="my-4">
        <a
          href={showFile}
          target="_blank"
          className=" block mb-2 focus:outline-none  bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border  rounded shadow "
          style={{ width: "173.5px" }}
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            <i className="bx bx-link-alt" style={{ fontSize: "24px" }}></i>
            ไฟล์โครงงาน
          </span>
        </a>
        {/* <div className="text-blue-600  cursor-pointer hover:text-indigo-500">
        <a href={showFile} target="_blank">
          ดูไฟล์โครงงงาน {props.teacherID} {props.projectID}
        </a>
      </div> */}
      </div>
      <div className="flex space-x-5 justify-center">
        <button
          onClick={() => setAlert(true)}
          className="focus:outline-none  bg-green-100 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i
              className="bx bx-check-circle"
              style={{ fontSize: "24px" }}
            ></i>{" "}
            ตรวจสอบเรียบร้อย
          </span>
        </button>

        {/* <button
          onClick={validation}
          className="bg-green-300 px-8  py-2  text-lg shadow-sm font-medium tracking-wider   rounded-2xl hover:shadow-2xl hover:bg-green-400 focus:outline-none"
        >
          ตรวจสอบเรียบร้อย
        </button> */}
        {/* <button className="bg-red-500 px-8 py-2 text-lg shadow-sm font-medium tracking-wider   rounded-2xl hover:shadow-2xl hover:bg-red-600 focus:outline-none">
          ปฏิเสธ
        </button> */}
      </div>

      <Dialog
        open={alert}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"ยืนยันการดำเนินการต่อ ?"}</p>{" "}
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
              validation();
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

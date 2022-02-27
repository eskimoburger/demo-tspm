import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function teacherState5(props) {
  useEffect(() => {
    getFile();
  }, []);
  const router = useRouter();

  const [showFile, setShowFile] = useState("");
  const [testFeedback, setTestFeedback] = useState("");

  const getFile = () => {
    axios
      .get(`http://localhost:3001/final-teacher/file-state9/${props.projectID}`)
      .then((res) => {
        console.log(res.data);
        setShowFile(res.data);
      });
  };

  const updateFeedback = () => {
    axios
      .put(`http://localhost:3001/project/test-feedBack/${props.projectID}`, {
        testFeedback: testFeedback,
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        //setShowFile(res.data);
      });
  };

  const updateStatusFeedback = (status) => {
    axios
      .put(
        `http://localhost:3001/project/test-feedBackStatus/${props.projectID}`,
        {
          status: status,
        }
      )
      .then((res) => {
        console.log(res.data);
        handleClose();
        //setShowFile(res.data);
      });
  };

  const finalConfirmTest = async (status, des) => {
    await axios
      .put(
        `http://localhost:3001/final-teacher/confirm-state9/${props.teacherID}/${status}`,
        {
          idNotification: props.id,
          projectName: props.projectName,
          description: des,
          testFeedback: testFeedback,
          idProject: props.projectID,
        }
      )
      .then(async (response) => {
        await props.function();
        console.log(response.data);
        setAlert(false)
        //console.log(response.data);
      });
  };

  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

        <button
          className="  focus:outline-none  bg-white hover:bg-blue-100 text-gray-800 font-semibold py-1 px-4 border  rounded shadow "
          onClick={handleClickOpen}
        >
          {testFeedback.length == 0 ? (
            <span
              className="flex items-center gap-2"
              style={{ fontSize: "18px" }}
            >
              <i className="bx bx-plus" style={{ fontSize: "24px" }}></i>
              เพิ่มความคิดเห็น
            </span>
          ) : (
            <span
              className="flex items-center gap-2"
              style={{ fontSize: "18px" }}
            >
              <i className="bx bx-edit" style={{ fontSize: "24px" }}></i>
              แก้ไขความคิดเห็น
            </span>
          )}
        </button>

        {/* <div
          className="text-blue-600  cursor-pointer hover:text-indigo-500"
          onClick={handleClickOpen}
        >
          {" "}
          เพิ่มความคิดเห็น
        </div> */}
        {/* <div className="text-blue-600  cursor-pointer hover:text-indigo-500">
          <a href={showFile} target="_blank">
            ไฟล์โครงงาน
          </a>
        </div> */}
      </div>
      <div className="flex space-x-5 justify-center ">
        <button
          onClick={() => {
            setAlert(true);
            setStatus(1);
            //updateStatusFeedback(2);
          }}
          className="focus:outline-none  bg-green-100 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i className="bx bx-check" style={{ fontSize: "24px" }}></i>
            เห็นสมควร
          </span>
        </button>

        <button
          onClick={() => {
            setAlert(true);
            setStatus(2);
            //updateStatusFeedback(1);
          }}
          className="focus:outline-none  bg-red-100 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i className="bx bx-x" style={{ fontSize: "24px" }}></i>ยังไม่สมควร
          </span>
        </button>
      </div>

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          fullWidth={true}
          maxWidth={"lg"}
          //onClose={handleClose}
        >
          <DialogTitle>เพิ่มความคิดเห็น </DialogTitle>
          <DialogContent dividers>
            {" "}
            <textarea
              //id="edit"
              className="bg-gray-100 p-2 w-full"
              placeholder="เพิ่มข้อเสนอแนะ"
              rows="4"
              //cols="150"
              value={testFeedback}
              onChange={(e) => {
                setTestFeedback(e.target.value);
              }}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setTestFeedback("");
              }}
              variant="contained"
              color="secondary"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
              style={{ backgroundColor: "green", color: "white" }}
            >
              ตกลง
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Dialog
        open={alert}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">
            {status == 1
              ? "ยืนยันความเห็นสมควรในการสอบโครงงาน ? "
              : status == 2
              ? "ยืนยันความไม่เห็นสมควรในการสอบโครงงาน ?"
              : null}
          </p>{" "}
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
              if (status == 1) {
                finalConfirmTest(
                  1,
                  `${props.teacherName}  ได้เห็นสมควรในการสอบโครงงาน ${props.projectName}`
                );
              } else if (status == 2) {
                finalConfirmTest(
                  2,
                  `${props.teacherName}  ได้ยังไม่เห็นสมควรในการสอบโครงงาน ${props.projectName}`
                );
              }
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

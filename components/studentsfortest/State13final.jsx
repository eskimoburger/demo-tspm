import React, { useState, useEffect } from "react";
import axios from "axios";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import Modal from "@material-ui/core/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import stylesPdf from "../../styles/Preview.module.css";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SendSharpIcon from "@material-ui/icons/SendSharp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function state13({
  projectId,
  projectCPE,
  finalAssesStatus,
  projectNameTH,
  projectNameENG,
  members,
  committees,
  finalCount,
  functionNext,
}) {
  //const [dialog,setDialog] = useState(false)

  useEffect(() => {
    setStatus(finalAssesStatus);
  });

  const [status, setStatus] = useState(0);

  const [open, setOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const [alertC, setAlertC] = useState(false);

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
      setFilename(e.target.files[0].name);
      setFile(e.target.files[0]);
    } else {
      //console.log("select your file");
      setFilename("ไม่ได้เลือกไฟล์ใด");
      setFile();
      setPdfFile(null);
    }
  };

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
      setShow(true);
    } else {
      setViewPdf(null);
    }
  };
  const handlePdfReset = () => {
    document.getElementById("file").value = null;
    setPdfFile(null);
    setViewPdf(null);
    setShow(false);
    setFilename("ไม่ได้เลือกไฟล์ใด");
    setFile();
  };

  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [Filename, setFilename] = useState("ยังไม่ได้เลือกไฟล์");
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
 
  const uploadFile = () => {
    setOpenUpload(true);
    const formData = new FormData();
    formData.append("file", file, "finalFile.pdf");
    // appending file
    axios
      .post(`http://localhost:3001/upload-file-final/${projectId}`, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          console.log(typeof progress);
          setProgress(progress);
        },
      })
      .then((res) => {
        console.log(res.data);
        setUploadStatus(res.data.status);
        //setOpenUpload(true);

        // getFile({ name: res.data.name,
        //          path: 'http://localhost:4500' + res.data.path
        //        })
      })
      .catch((err) => {
        console.log(err.response.data);
        //setOpenUpload(true);
        setErrorMessage(err.response.data.message);
      });
  };

  const uploadFileEdit = () => {
    setOpenUpload(true);
    const formData = new FormData();
    formData.append("file", file, `finalfile${finalCount}.pdf`);
    // appending file
    axios
      .post(`http://localhost:3001/upload-file-final/${projectId}`, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          console.log(typeof progress);
          setProgress(progress);
        },
      })
      .then((res) => {
        console.log(res.data);
        setUploadStatus(res.data.status);
        //setOpenUpload(true);

        // getFile({ name: res.data.name,
        //          path: 'http://localhost:4500' + res.data.path
        //        })
      })
      .catch((err) => {
        console.log(err.response.data);
        //setOpenUpload(true);
        setErrorMessage(err.response.data.message);
      });
  };

  async function sendNotification() {
    var pnameEN = projectNameENG;
    var description = `${pnameEN} ได้ส่งรูปเล่มโครงงานทั้งหมดให้อาจารย์ประจำรายวิชาได้ตรวจสอบ`;
    var state_name = "ประเมินรูปเล่มปริญญานิพนธ์";
    await axios
      .post("http://localhost:3001/notification/course-teacher/" + projectId, {
        description: description,
        state_name: state_name,
      })
      .then((response) => {
        functionNext();
      });
  }

  async function sendNotificationEdit() {
    var pnameEN = projectNameENG;
    var description = `${pnameEN} ได้ส่งรูปเล่มโครงงานทั้งหมดให้อาจารย์ประจำรายวิชาได้ตรวจสอบ`;
    var state_name = `แก้ไขรูปเล่มปริญญานิพนธ์ครั้งที่ ${finalCount}`;
    await axios
      .post("http://localhost:3001/notification/course-teacher/" + projectId, {
        description: description,
        state_name: state_name,
      })
      .then((response) => {
        functionNext();
      });
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
        ส่งรูปเล่มโครงงงาน
      </div>

      <div
        className="flex flex-col justify-center mx-auto px-4  pt-4 pb-8 text-xl mt-4 bg-white rounded-2xl  "
        style={{
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          width: "90%",
        }}
      >
        <h1 className="text-center text-2xl stage2:text-3xl my-2 text-gray-800 font-bold">
          {" "}
          {status == 2
            ? ` แก้ไขรูปเล่มปริญญานิพนธ์ครั้งที่ ${finalCount} `
            : "ประเมินรูปเล่มปริญญานิพนธ์"}
        </h1>

        <div
          className=" m-auto text-gray-700 my-4  text-lg stage2:text-2xl space-y-2  flex  flex-col items-center  "
          style={{ width: "90%" }}
        >
          <div className="w-full stage2:w-[500px] space-y-2 " style={{}}>
            <h2>
              {" "}
              <span className="font-bold"> ชื่อโครงงาน :</span> {projectNameTH}
            </h2>
            <h2>
              {" "}
              <span className="font-bold">
                {" "}
                ชื่อโครงงาน (ภาษาอังกฤษ) :
              </span>{" "}
              {projectNameENG}
            </h2>

            <h2 className="font-bold">สมาชิกในกลุ่ม</h2>
            {members.map((val, index) => {
              return (
                <p key={index} className="ml-2   font-normal">
                  {" "}
                  {index + 1}. {val.name}
                </p>
              );
            })}
            <h2 className="font-bold">อาจารย์ประจำโครงงาน</h2>
            {committees.map((val, index) => {
              return (
                <p key={index} className="ml-2  font-normal">
                  {" "}
                  {index + 1}. {val.teacher_name}
                </p>
              );
            })}

            <h2 className="font-bold mt-2">
              {status == 2
                ? "อัพโหลดไฟล์รายงานที่ทำการแก้ไขเรียบร้อยแล้ว"
                : "อัพโหลดไฟล์รายงาน"}{" "}
            </h2>
            <form onSubmit={handlePdfFileSubmit}>
              <input
                id="file"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handlePdfFileChange}
                required
                multiple
              />
              <label
                htmlFor="file"
                className="mt-2 px-3 py-1 text-black uppercase break-word border-2 border-rose-50 hover:bg-rose-300 rounded cursor-pointer transition duration-500"
              >
                เลือกไฟล์
              </label>

              <div className="mt-2 p-2 break-words  text-lg stage2:text-xl block">
                {Filename}
              </div>

              {pdfFile && (
                <button
                  onClick={handleOpen}
                  type="submit"
                  className={
                    "  px-3 py-1 text-black uppercase break-word border-2 border-green-50 hover:bg-green-300 rounded cursor-pointer transition duration-500 block "
                  }
                >
                  ตัวอย่างไฟล์
                </button>
              )}
            </form>
          </div>
          <div></div>
          {pdfFile && (
            <Button
              onClick={() => {
                setAlertC(true);
              }}
              fullWidth
              variant="outlined"
              color="primary"
              style={{ fontSize: 18 }}
              startIcon={<SendSharpIcon />}
            >
              ส่งแบบคำขอประเมินรูปเล่มวิทยานิพนธ์
            </Button>
          )}
        </div>
      </div>
      {/* ---------------Modal---------------------- */}

      <Modal
        open={show}
        onClose={handleClose}
        className="flex justify-between items-center  overflow-auto  "
      >
        <div className=" flex flex-col   mt-8 " style={{ width: "80%" }}>
          <div className="flex bg-white  h-16 items-center  justify-between p-5 ">
            <p className=" text-3xl">ตัวอย่างไฟล์ PDF</p>
            <CancelIcon
              className=" cursor-pointer"
              color="error"
              fontSize="large"
              onClick={handleClose}
            />
          </div>
          <div className="bg-blue-500">
            <div className={stylesPdf.pdf_container}>
              {viewPdf && (
                <>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js  ">
                    <Viewer
                      fileUrl={viewPdf}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </>
              )}

              {!viewPdf && <>No pdf file selected</>}
            </div>
          </div>
          <div className="bg-white p-5">
            <div className=" flex  justify-end space-x-8">
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={handleClose}
              >
                ปิดหน้าต่าง
              </Button>
              <Button
                variant="contained"
                onClick={handlePdfReset}
                style={{ backgroundColor: "yellow", color: "black" }}
              >
                เลือกไฟล์ใหม่
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* -------------------------------------------------------- */}

      <Dialog
        open={alertC}
        //onClose={handleClose}
        //TransitionComponent={Transition}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">
            {"ยืนยันการส่งแบบประเมินรูปเล่มปริญญานิพนธ์ ?"}
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
              setAlertC(false);
            }}
            className=" h-10 rounded-lg bg-red-600   uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-4 "
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              if (status == 2) {
                console.log("Hello");
                uploadFileEdit(), setAlertC(false);
              } else {
                uploadFile(), setAlertC(false);
              }
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ยืนยัน
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpload}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth={"xs"}
        // keepMounted
      >
        <DialogContent dividers>
          {/* <div className="text-center">
            
            <i
              className="bx bx-check-circle bx-tada "
              style={{ fontSize: "200px", color: "#00FF00" }}
            ></i>
            <div>
              {uploadStatus ? (
                <p className=" text-2xl font-bold">อัพโหลดไฟล์เสร็จสมบูรณ์</p>
              ) : (
                <p></p>
              )}
            </div>
          </div> */}

          {progress === 100 ? (
            <div>
              <div className="text-center">
                <i
                  className={
                    uploadStatus
                      ? "bx bx-check-circle bx-tada "
                      : "bx bx-error-circle bx-tada"
                  }
                  style={
                    uploadStatus
                      ? { fontSize: "200px", color: "#00FF00" }
                      : { fontSize: "200px", color: "red" }
                  }
                ></i>
                <div>
                  {uploadStatus ? (
                    <p className=" text-2xl font-bold">
                      อัพโหลดไฟล์เสร็จสมบูรณ์
                    </p>
                  ) : (
                    <p className=" text-2xl font-bold">{errorMessage}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-2">
                {uploadStatus ? (
                  <button
                    className=" bg-blue-600 w-full text-white font-bold mt-5 py-1 rounded-md "
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
                    }}
                    onClick={() => {
                      if (status == 2) {
                        sendNotificationEdit();
                      } else {
                        sendNotification();
                      }
                    }}
                  >
                    ดำเนินการต่อ
                  </button>
                ) : (
                  <button
                    className=" bg-yellow-500 w-full text-white font-bold mt-5 py-1 rounded-md "
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
                    }}
                    onClick={() => {
                      setOpenUpload(false);
                      handlePdfReset();
                    }}
                  >
                    ย้อนกลับ
                  </button>
                )}
              </div>{" "}
            </div>
          ) : (
            <div className="relative ">
              <div className="overflow-hidden h-4 my-4 text-xs flex rounded bg-pink-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                ></div>
              </div>
              {/* <p className="text-8xl">{progress} {"%"}</p> */}
            </div>
          )}
          {/* <div className="flex justify-center mt-2">
            <button
              className=" bg-blue-600 w-full text-white font-bold mt-5 py-1 rounded-md "
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
              }}
              onClick={async () => {
                await sendNotification();
                await nextStageProject();
                await props.function();
              }}
            >
              ดำเนินการต่อ
            </button>
          </div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
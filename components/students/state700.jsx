import React, { useState } from "react";
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

export default function state7(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => {
    setOpen(true);
  };

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
      console.log("select your file");
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
  const [progress, setProgess] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(false);

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file , "state7file.pdf"); // appending file
    axios
      .post(`http://localhost:3001/upload2/cpetest/${props.project.idP}`, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          console.log(typeof progress);
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res.data.status);
        setUploadStatus(res.data.status);
        // getFile({ name: res.data.name,
        //          path: 'http://localhost:4500' + res.data.path
        //        })
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "280px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#1C3F60",
        }}
      >
        ขอสอบโครงงงาน
      </div>
      <div className="mx-16 my-2 text-xl space-y-1">
        <p>
          <span className="font-bold">รหัสโครงงาน : </span> CPE
          {props.project.id.toString().padStart(2, 0)}
        </p>
        <p>
          {" "}
          <span className="font-bold"> ชื่อโครงงาน {props.project.idP} :</span>55555 {props.project.name}
        </p>
        <p className="font-bold">สมาชิกในกลุ่ม</p>
        {props.project.members.map((val, index) => {
          return (
            <p key={index} className="text-xl font-normal">
              {" "}
              {index + 1}. {val.name}
            </p>
          );
        })}
        <p className="font-bold">อาจารย์ประจำโครงงาน</p>
        {props.project.committees.map((val, index) => {
          return (
            <p key={index} className="text-xl font-normal">
              {" "}
              {index + 1}. {val.teacher_name}
            </p>
          );
        })}

        <p className="font-bold mt-2">อัพโหลดไฟล์รายงาน</p>
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
            className="mt-2 inline-block rounded-sm font-bold text-white px-2 cursor-pointer py-1 "
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
              backgroundColor: "#f93154",
            }}
          >
            เลือกไฟล์
          </label>
          <span className="p-2">{Filename}</span>
          <button
            onClick={handleOpen}
            type="submit"
            className={
              pdfFile != null
                ? "block mt-2  font-bold bg-green-600 hover:bg-green-700 px-2 py-1 rounded-sm text-white"
                : "hidden"
            }
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
              width: "130px",
            }}
          >
            ตัวอย่างไฟล์
          </button>
        </form>
        <div>
          <button
            onClick={uploadFile}
            className={
              pdfFile != null
                ? " bg-blue-600 w-full text-white font-bold mt-5 py-1 rounded-md "
                : "hidden"
            }
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
            }}
          >
            ส่งแบบขอสอบหัวข้อโครงงาน
          </button>
        </div>
        <div>
          {uploadStatus ? (
            <p className="text-green-600 text-2xl font-bold">
              อัพโหลดไฟล์เสร็จสมบูรณ์
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      {/* ---------------Modal---------------------- */}
      <div className="">
        <Modal open={show} onClose={handleClose}>
          <>
            <div className="flex justify-center mt-5 ">
              <div className=" flex flex-col  w-9/12 ">
                <div className="flex bg-white  h-16 items-center  justify-between p-5 ">
                  <p className=" text-3xl">ตัวอย่างไฟล์ PDF</p>
                  {/* //<button className="text-2xl border-none text-gray-300" onClick={handleClose}>✖</button> */}
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
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
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
                <div></div>
              </div>
            </div>
          </>
        </Modal>
      </div>
      {/* -------------------------------------------------------- */}
    </div>
  );
}

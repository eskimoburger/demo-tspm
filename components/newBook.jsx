import React, { useState } from "react";
import styles from "../styles/request.module.scss";
import Close from "../public/close.svg";
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

import stylesPdf from "../styles/Preview.module.css";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";

export default function NewBook(props) {
  //------------------------------------------------------------------///
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseM = () => {
    setOpen(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //----------------------------------------------------------------///
  const [file, setFile] = useState();
  const [Filename, setFilename] = useState("ไม่ได้เลือกไฟล์ใด");

  function onChangeHandler(event) {
    setFilename(event.target.files[0].name);
    setFile(event.target.files[0]);
    const data = new FormData();
    data.append("file", event.target.files[0]);
  }
  function confirmOn() {
    var modal = document.getElementById("confirmModal");
    modal.style.display = "block";
  }
  function confirmOff() {
    var modal = document.getElementById("confirmModal");
    modal.style.display = "none";
  }

  //-------------------------------------------------------//
  async function sendExam() {

    var project = props.project.id
    let str = project.toString();
    str = str.padStart(2, 0);
    var project_name = "CPE" + str;
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await axios.post(
        `https://demo-tspm-server.herokuapp.com/upload-file/${project_name}`,
        data
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }

    //axios.post("https://demo-tspm-server.herokuapp.com/upload-file/CPE01,")
    //เขียน axios
    //update state +1
    var project_id = props.project.id;
    var file_url = "";
    //บันทึกในตาราง examrequest [id,projectid,file_url]
  }
  return (
    <div className={styles.request}>
      <div className={styles.header}> {props.topic}</div>
      <div className={styles.body}>
        <p className="font-bold text-3xl flex justify-center mb-5 pt-5  ">
          {props.topic}
        </p>
        <p>
          <label className="  text-xl font-semibold ">
            รหัสโครงงาน :{" "}
            <label className=" font-normal ">CPE{props.project.id.toString().padStart(2,0)}</label>
          </label>
        </p>

        <p>
          <label className="text-xl font-semibold">
            ชื่อโครงงาน :
            <label className="font-normal"> {props.project.name}</label>
          </label>
        </p>
        <div>
          <label className="text-xl font-semibold">
            สมาชิก
            <ul>
              {props.project.members.map((val, index) => {
                return (
                  <li key={index} className="text-xl font-normal">
                    {" "}
                    {index + 1}. {val.name}
                  </li>
                );
              })}{" "}
            </ul>
          </label>
        </div>
        {/* <p>
          <label className="text-xl font-semibold">
            อาจารย์ :{" "}
            <label className={styles.indent}>{props.project.teacher}</label>
          </label>
        </p> */}
        <div>
          <label className="text-xl font-semibold">
            อาจารย์ประจำโครงงาน
            <ul>
              {props.project.committees.map((val, index) => {
                return (
                  <li key={index} className="text-xl font-normal">
                    {" "}
                    {index + 1}. {val.teacher_name}
                  </li>
                );
              })}{" "}
            </ul>
          </label>
        </div>
        <p className={styles.upload}>
          <label className={styles.topic}>
            <label className={styles.title}>อัพโหลดไฟล์รายงาน</label>
          </label>
        </p>

        {/* ///////  */}
        <form onSubmit={handlePdfFileSubmit}>
          <p>
            <input
              id="file"
              type="file"
              accept=".pdf"
              className={styles.file}
              onChange={handlePdfFileChange}
              required
            />
            <label htmlFor="file">เลือกไฟล์</label>

            <label className={styles.filename}>{Filename}</label>
          </p>
          {pdfFileError && (
            <div className={styles.error_msg}>{pdfFileError}</div>
          )}
          <button
            type="submit"
            onClick={handleOpen}
            style={{ width: "30% ", backgroundColor: "green" }}
            className=" ml-10   font-bold shadow-xl mt-5 rounded-md"
            onClick={() => console.log("Hello")}
          >
            ตัวอย่างไฟล์
          </button>

          {/* <button type="submit" onClick={handleOpen}>
          Preview
        </button> */}
        </form>
        {/* ///// */}

        <p>
          <button onClick={confirmOn}>ส่งแบบขอสอบ</button>
        </p>
      </div>
      <div id="confirmModal" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <h2>{props.topic}</h2>
            <div className={styles.close} onClick={confirmOff}>
              <Close width="30" height="30" />
            </div>
          </div>
          <div className={styles.modal_body}>
            <p className="">
              <label>รหัสโครงงาน: {props.project.id}</label>
            </p>
            <p>
              <label>ชื่อโครงงาน: {props.project.name}</label>
            </p>
            <div style={{ marginLeft: "40px" }}>
              <label className="text-xl font-semibold">
                สมาชิก
                <ul>
                  {props.project.members.map((val, index) => {
                    return (
                      <li key={index} className="text-xl font-normal">
                        {" "}
                        {index + 1}. {val.name}
                      </li>
                    );
                  })}{" "}
                </ul>
              </label>
            </div>
            <div style={{ marginLeft: "40px" }}>
              <label className="text-xl font-semibold">
                อาจารย์ประจำโครงงาน
                <ul>
                  {props.project.committees.map((val, index) => {
                    return (
                      <li key={index} className="text-xl font-normal">
                        {" "}
                        {index + 1}. {val.teacher_name}
                      </li>
                    );
                  })}{" "}
                </ul>
              </label>
            </div>
            <p>
              <label className="">ไฟล์รายงาน: {Filename}</label>
            </p>
            <button onClick={sendExam}>ยืนยัน</button>
          </div>
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

import React, { useState } from "react";
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

import styles from "../styles/Preview.module.css";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";

export const App = () => {
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
    document.getElementById("myInputFileID").value = null;
    setPdfFile(null);
    setViewPdf(null);
    setShow(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="">
      <br></br>

      <form className="form-group" onSubmit={handlePdfFileSubmit}>
        <input
          id="myInputFileID"
          type="file"
          className="form-control"
          onChange={handlePdfFileChange}
        />
        {pdfFileError && <div className={styles.error_msg}>{pdfFileError}</div>}
        <br></br>

        <button type="submit" onClick={handleOpen}>
          Preview
        </button>
      </form>
      <div></div>

      <br></br>

      <Modal open={open} onClose={handleCloseM}>
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
                  onClick={() => console.log("Clicked")}
                />
              </div>
              <div className="bg-blue-500">
                <div className={styles.pdf_container}>
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
                  >
                    ปิดหน้าต่าง
                  </Button>
                  <Button
                    variant="contained"
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
  );
};

export default App;

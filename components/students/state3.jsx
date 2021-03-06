import React, { useState, useRef } from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function state3(props) {
  //const [dialog,setDialog] = useState(false)

  const [open, setOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [alert, setAlert] = useState(false);

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
      //console.log();
      setFilename("???????????????????????????????????????????????????");
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
    setFilename("???????????????????????????????????????????????????");
    setFile();
  };

  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [Filename, setFilename] = useState("??????????????????????????????????????????????????????");
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const uploadFile = () => {
    setOpenUpload(true);
    const formData = new FormData();
    formData.append("file", file, "state3file.pdf");
    // appending file
    axios
      .post(
        `https://demo-tspm-server.herokuapp.com/upload-file/${props.project.idP}`,
        formData,
        {
          onUploadProgress: (ProgressEvent) => {
            let progress = Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            );

            //console.log(typeof progress);
            setProgress(progress);
          },
        }
      )
      .then((res) => {
        console.log(res.data.status);
        setUploadStatus(res.data.status);

        // getFile({ name: res.data.name,
        //          path: 'http://localhost:4500' + res.data.path
        //        })
      })
      .catch((err) => {
        //setOpenUpload(true);
        setErrorMessage(err.response.data.message);

        console.log(err.response);
      });
  };

  function nextStageProject() {
    axios
      .put(`https://demo-tspm-server.herokuapp.com/project/nextstage/${props.project.idP}`)
      .then((response) => {
        console.log(response.data);
      });
  }
  ///??????????????????????????????
  function sendNotification() {
    //console.log(props.project.committees[0])
    for (let i = 0; i < props.project.committees.length; i++) {
      var id = props.project.committees[i].id_teacher;
      var name = props.project.committees[i].teacher_name;
      //var role = props.project.committees.role;
      var pnameEN = props.project.name_eng;
      var description = `${pnameEN} ?????????????????????????????????????????????????????????????????????????????? ${name} ??????????????????????????????`;
      var state_name = "??????????????????????????????????????????????????????";

      axios
        .post("https://demo-tspm-server.herokuapp.com/notification/id", {
          description: description,
          state_name: state_name,
          id_teacher: id,
          idProject: props.project.idP,
        })
        .then((response) => {
          console.log(response.data);
          //alert('??????????????????????????? notification')
        });
      //console.log(id,name,description)
    }
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
        ?????????????????????????????????????????????????????????
      </div>
      <div
        className="flex flex-col justify-center mx-auto px-4  pt-4 pb-8 text-xl mt-4 bg-white rounded-2xl  "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
          width: "50%",
        }}
      >
        <p className="text-center text-3xl my-2 text-gray-800">
          {" "}
          ?????????????????????????????????????????????????????????
        </p>

        <div className=" m-auto text-gray-700 my-4" style={{ width: "90%" }}>
          <p className="font-bold">???????????????????????????????????????</p>
          {props.project.members.map((val, index) => {
            return (
              <p key={index} className="ml-2 text-xl font-normal">
                {" "}
                {index + 1}. {val.name}
              </p>
            );
          })}
          <p className="font-bold">?????????????????????????????????????????????????????????</p>
          {props.project.committees.map((val, index) => {
            return (
              <p key={index} className="ml-2 text-xl font-normal">
                {" "}
                {index + 1}. {val.teacher_name}
              </p>
            );
          })}

          <p className="font-bold mt-2">???????????????????????????????????????????????????</p>
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
              ???????????????????????????
            </label>
            <span className="p-2 break-words">{Filename}</span>
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
              ????????????????????????????????????
            </button>
          </form>
          {/* <button
          onClick={() => {
            sendNotification();
            //console.log("complete")
          }}
        >
          test
        </button> */}
        </div>
        <div>
          <button
            onClick={
              () => {
                setAlert(true);
              }

              //uploadFile
            }
            className={
              pdfFile != null
                ? " bg-blue-600 w-full text-white font-bold mt-5 py-1 rounded-md "
                : "hidden"
            }
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
            }}
          >
            ????????????????????????????????????????????????????????????????????????
          </button>
        </div>
      </div>
      {/* ---------------Modal---------------------- */}
      <Modal
        open={show}
        onClose={handleClose}
        className="flex justify-between  overflow-auto  "
      >
        <div className=" flex flex-col   mt-8 " style={{ width: "80%" }}>
          <div className="flex bg-white  h-16 items-center  justify-between p-5 ">
            <p className=" text-3xl">???????????????????????????????????? PDF</p>
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
                ?????????????????????????????????
              </Button>
              <Button
                variant="contained"
                onClick={handlePdfReset}
                style={{ backgroundColor: "yellow", color: "black" }}
              >
                ???????????????????????????????????????
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Dialog
        open={alert}
        //onClose={handleClose}
        //TransitionComponent={Transition}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">
            {"??????????????????????????????????????????????????????????????????????????????????????????????????? ?"}
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
            ??????????????????
          </button>
          <button
            onClick={() => {
              uploadFile(), setAlert(false);
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ??????????????????
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
                <p className=" text-2xl font-bold">?????????????????????????????????????????????????????????????????????</p>
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
                      ?????????????????????????????????????????????????????????????????????
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
                    onClick={ () => {
                      sendNotification();
                      nextStageProject();
                      props.function();
                    }}
                  >
                    ????????????????????????????????????
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
                    ????????????????????????
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
              ????????????????????????????????????
            </button>
          </div> */}
        </DialogContent>
      </Dialog>
      {/* -------------------------------------------------------- */}

      <div></div>
    </div>
  );
}

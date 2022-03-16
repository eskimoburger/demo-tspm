import React, { useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function teacherState1(props) {
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(0);
  const [projectDetail, setProjectDetail] = useState({
    project_th: "",
    project_eng: "",
    description: "",
    teachers: [],
    name: [],
  });
  const [projectData, setProjectData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  function getProjectByName(name) {
    axios
      .get("http://localhost:3001/project/getprojectbyname/" + name)
      .then((response) => {
        setProjectDetail(response.data);
        setOpen(true);
      });
  }

  // async function deleteNotification(id) {
  //   axios
  //     .delete("http://localhost:3001/notification/project/" + id)
  //     .then(async (response) => {
  //       console.log(response.data);
  //       await props.function();
  //     });
  // }

  // function submitted(projectName, teacherID) {
  //   axios
  //     .put(
  //       `http://localhost:3001/project/submitted/${projectName}/${teacherID}`
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }

  // function rejected(projectName, teacherID) {
  //   console.log(projectName, teacherID);
  //   axios
  //     .put(`http://localhost:3001/project/rejected/${projectName}/${teacherID}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }
  const finalGetProject = async (id) => {
    setOpen(true);
    await axios
      .get(`http://localhost:3001/final-teacher/get-project/${id}`)
      .then((res) => {
        console.log(res.data)
        setProjectData(res.data) 
      });
  };
  const finalConfirm = async (status, des) => {
    await axios
      .put(
        `http://localhost:3001/final-teacher/confirm-state1/${props.teacherID}/${status}`,
        {
          idNotification: props.id,
          projectName: props.projectName,
          description: des,
        }
      )
      .then(async (response) => {
        await props.function();
        setAlert(false);
        console.log(response.data);
        //console.log(response.data);
      });
  };
  return (
    <>
      <div>
        <div className="my-4">
          <button
            onClick={() => {
              finalGetProject(props.projectID);
            }}
            className="focus:outline-none  bg-white hover:bg-blue-100 text-gray-800 font-semibold py-1 px-4 border  rounded shadow "
          >
            <span
              className="flex items-center gap-2"
              style={{ fontSize: "18px" }}
            >
              <i className="bx bxs-detail" style={{ fontSize: "24px" }}></i>
              แสดงรายละเอียด
            </span>
          </button>
        </div>

        <div className="flex space-x-5 justify-center">
          <button
            onClick={() => {
              setAlert(true);
              setStatus(1);
              //submitted(props.projectName, props.teacherID);
            }}
            className="focus:outline-none  bg-green-100 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
          >
            <span
              className="flex items-center gap-2"
              style={{ fontSize: "18px" }}
            >
              {" "}
              <i
                className="bx bxs-check-square"
                style={{ fontSize: "24px" }}
              ></i>
              ยอมรับ
            </span>
          </button>
          <button
            onClick={() => {
              setAlert(true);
              setStatus(2);
              //rejected(props.projectName, props.teacherID);
            }}
            className="focus:outline-none  bg-red-100 hover:bg-red-200  transition text-gray-800 font-semibold py-2 px-4   rounded shadow"
          >
            <span
              className="flex items-center gap-2"
              style={{ fontSize: "18px" }}
            >
              {" "}
              <i
                className="bx bxs-x-square"
                style={{ fontSize: "24px" }}
              ></i>{" "}
              ปฏิเสธ
            </span>
          </button>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle className=" bg-blue-600">
          {" "}
          <p className="text-white text-3xl font-bold">
            รายละเอียดโครงงาน
          </p>{" "}
        </DialogTitle>
        <DialogContent dividers>

          {projectData &&  <>   <div className="text-2xl">
            <p>ชื่อโครงงานภาษาไทย : {projectData.data.project_details.project_name_th}</p>
            <p>ชื่อโครงงานภาษาอังกฤษ : {projectData.data.project_details.project_name_eng}</p>
            <p className="py-3">รายละเอียดโครงงาน</p>
          </div>
          <div
            className="bg-gray-100 break-words"
            style={{ textIndent: "50px" }}
          >
            {/* <p
              className=" border-2 border-gray-100 rounded-md mt-3 bg-gray-100 p-2 "
              style={{
                minHeight: "400px",
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              
            </p>
            {projectDetail.description} */}
            {projectData.data.project_details.project_description}
          </div>
          <p className=" text-2xl my-3"> รายชื่ออาจารย์</p>
          {projectData.data.committees.map((val, index) => {
            return (
              <div key={index} className="flex">
                <div className="text-xl ml-4  " style={{ minWidth: "40%" }}>
                  {" "}
                  <p> ชื่อ {val.teacher_name}</p>
                </div>
                <div className=" text-xl  " style={{ minWidth: "60%" }}>
                  {" "}
                  <p>{val.role}</p>
                </div>
              </div>
            );
          })}
          <p className=" text-2xl my-3"> รายชื่อสมาชิกในกลุ่ม</p>
          {projectData.data.members.map((val, index) => {
            return (
              <div key={index} className="text-xl ml-3">
                <p>
                  รหัสนิสิต : {val.id}{" "}
                  <span className="font-normal"> ชื่อ {val.name} </span>
                </p>
              </div>
            );
          })}
          </> 
          }
     
        </DialogContent>
      </Dialog>

      <Dialog
        open={alert}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">
            {status == 1
              ? "ยืนยันการยอมรับหัวข้อโครงงาน ? "
              : status == 2
              ? "ยืนยันปฏิเสธหัวข้อโครงงาน ?"
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
                finalConfirm(
                  1,
                  `${props.teacherName}  ได้ยอมรับหัวข้อโครงงาน ${props.projectName}`
                );
              } else if (status == 2) {
                finalConfirm(
                  2,
                  `${props.teacherName}  ได้ปฏิเสธหัวข้อโครงงาน ${props.projectName}`
                );
              }
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ยืนยัน
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

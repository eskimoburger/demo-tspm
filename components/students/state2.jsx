import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import Image from "next/image";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function state2({projectId,projectName}) {
  useEffect(() => {
    getRequest();
    getAllTeacher();
    getReject();
    //setProjectName(props.projectName)
  }, []);
  //console.log(projectId)

  

  const [request, SetRequest] = useState([]);
  const [wait, setWait] = useState(false);
  const [nextStage, SetNextStage] = useState(false);
  const [reject, SetReject] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [rejectTeacher, SetRejectTeacher] = useState([]);
  const [allTeacher, SetAllTeacher] = useState([]);
  const [data, SetData] = useState([]);
  const [idProject, setIdProject] = useState(0);
  const [alert, setAlert] = useState(false);
  const [alertChange, setAlertChange] = useState(false);

  async function getRequest() {
    await axios
      .get(
        `https://demo-tspm-server.herokuapp.com/final-project/get-request-state2/${projectId}`
      )
      .then((response) => {
        const {data_request,checkSubmitAll,checkNext,checkReject} = response.data;
        console.log(response.data);
        SetRequest(data_request);
        SetReject(checkReject);
        setWait(checkSubmitAll);
        SetNextStage(checkNext);

        // var teacherStatus = [];
        // for (let i = 0; i < data_request.length; i++) {
        //   teacherStatus.push(data_request[i].status);
        // }
        
        // //console.log(teacherStatus);

        // const checkSubmitAll = teacherStatus.every(function (status) {
        //   return status == 0;
        // }) ;
        // const checkNext = teacherStatus.every(function (status) {
        //   return status == 1;
        // });
        // //
        // let checkReject = false;
        // for (let i = 0; i < teacherStatus.length; i++) {
        //   if (teacherStatus[i] == 2) {
        //      checkReject = true;
        //   }
        // }

        console.log("rejectStatus : " + checkReject," nextStatus : " + checkNext);
        //console.log(checkNext);
      
      });
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/getmainproject/${projectName}`)
      .then((response) => {
        //setIdProject(response.data[0].project_id);
        console.log(response.data);
        setIdProject(response.data.project_id);
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getAllTeacher() {
    axios.get(`https://demo-tspm-server.herokuapp.com/allteacher`).then((response) => {
      //console.log(response.data);
      SetAllTeacher(response.data);
    });
  }

  function getReject() {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/final-project/reject-teacher/${projectId}`)
      .then((response) => {
        console.log(response.data);
        SetRejectTeacher(response.data);
      });
  }

  const finalChange = async () => {
    await axios
      .post(
        `https://demo-tspm-server.herokuapp.com/final-project/state-1/change/${projectId}`,
        {
          changeTeacher: data,
          rejectTeacher: rejectTeacher,
          project_eng: props.project.name_eng,
        }
      )
      .then(async (res) => {
        console.log(res.data);
        await props.function();
        getRequest();
        handleClose();
        setAlertChange(false);
      });
  };
  //CancelProject
  const finalCancelProject = async () => {
    await axios
      .post(`https://demo-tspm-server.herokuapp.com/final-project/cancel/${projectId}`)
      .then(async (res) => {
        await props.function();
        //console.log(res)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChangeTeacher = (e,index,teacher) => {
    const selectedTeacher = allTeacher[e.target.value];
    //console.log(index);
    //console.log(e.target.value);
    e.preventDefault();
   // console.log(selectedTeacher, teacher.role);

    for (let i = 0; i < data.length; i++) {
      if (data[i].index == index) {
        data.splice(i, 1);
      }
    }

    SetData([
      ...data,
      {
        teacher: selectedTeacher,
        role: teacher.role,
        index: index,
        project_name_eng: teacher.project_name_eng,
      },
    ]);
  }

  let waitContent = null;

  if (wait || reject == false) {
    waitContent = (
      <>
        <div className="text-xl text-center my-2 ">
          <p> กรุณารอการตอบรับของอาจารย์เพื่อดำเนินการต่อ...</p>
          <div className="mt-4">
            <button
              onClick={
                () => {
                  setAlert(true);
                }
                //cancelProject
              }
              className="px-4 py-2 rounded-md text-xl font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-red-500 border-red-800 hover:bg-red-600 active:bg-red-700 focus:ring-red-300"
            >
              <ErrorOutlineIcon /> ยกเลิกหัวข้อโครงงานนี้
            </button>
          </div>
        </div>
      </>
    );
  }
  if (nextStage) {
    waitContent = (
      <div className="text-xl text-center my-2">
        <p> กรุณารอรับรหัสหัวข้อโครงงานจากอาจารย์ประจำรายวิชา</p>
      </div>
    );
  }
  if (nextStage && idProject > 0) {
    let str = idProject.toString();
    str = str.padStart(2, 0);
    var id_project_new = "CPE" + str;
    waitContent = (
      <div className="flex flex-col text-center space-y-3 mt-2">
        <p className="text-xl">
          รหัสหัวข้อของโครงงานคือ{" "}
          <span className="font-bold">{id_project_new}</span>
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-500 transition duration-200 each-in-out "
            style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
            onClick={() => {
              props.functionNext();
            }}
          >
            ดำเนินการต่อ
          </button>
        </div>
      </div>
    );
  } else if (reject) {
    waitContent = (
      <div className="flex justify-center mt-3 gap-2 flex-wrap">
        <button
          onClick={
            () => {
              setAlert(true);
            }
            //cancelProject
          }
          className="px-4 py-2 rounded-md text-xl font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-red-500 border-red-800 hover:bg-red-600 active:bg-red-700 "
        >
          <ErrorOutlineIcon /> ยกเลิกหัวข้อโครงงานนี้
        </button>
        <button
          className="bg-yellow-500 border-b-2 border-yellow-800 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none"
          onClick={handleClickOpen}
          style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
        >
          <i
            className="bx bxs-message-square-edit mr-2"
            style={{ fontSize: "20px" }}
          ></i>
          แก้ไขรายชื่ออาจารย์ที่ปฎิเสธหัวข้อโครงงาน
        </button>
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            //keepMounted
            //onClose={handleClose}
            fullWidth={true}
            maxWidth={"lg"}
          >
            <DialogTitle className="bg-red-500">
              <p className="text-3xl text-white font-semibold ">
                แก้ไขรายชื่ออาจารย์ที่ปรึกษาและกรรมการ
              </p>
            </DialogTitle>
            <DialogContent dividers>
              <p className=" text-2xl mb-2 text-red-500 ">
                รายชื่ออาจารย์ที่ปฏิเสธหัวข้อโครงงาน
              </p>
              {rejectTeacher.map((teacher, index) => {
                return (
                  <div key={index} className=" text-xl ml-10 ">
                    <p>
                      <span className="font-bold">{teacher.role} : </span>{" "}
                      {teacher.committee_name}
                    </p>
                  </div>
                );
              })}

              <div className=" flex justify-center  my-10">
                <i className="bx bx-chevrons-down bx-fade-down text-8xl text-yellow-400"></i>
              </div>
              <p className=" text-2xl mb-5 text-green-600 ">
                เลือกอาจารย์ประจำหัวข้อโครงงานใหม่
              </p>
              {rejectTeacher.map((teacher, index) => {
                return (
                  <div
                    key={index}
                    className=" text-black font-bold text-xl ml-10 mb-3"
                  >
                    <p>{teacher.role} </p>
                    <div className="relative">
                      <FormControl
                        style={{ minWidth: "600px", minHeight: "100px" }}
                      >
                        <InputLabel style={{ fontSize: "18px " }}>
                          {teacher.role} คนใหม่
                        </InputLabel>
                        <Select
                          defaultValue=""
                          style={{ fontSize: "18px" }}
                          onChange={(e)=>{handleChangeTeacher(e,index,teacher)}}
                        >
                          {allTeacher.map((teacherAll, index) => (
                            <MenuItem key={index} value={index}>
                              {teacherAll.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                );
              })}

              {/* <button onClick={()=>{finalChange()}}>TestAPI</button> */}
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => {
                  handleClose();
                  SetData([]);
                }}
              >
                ยกเลิก
              </Button>

              {data.length === rejectTeacher.length && (
                <Button
                  onClick={() => {
                    setAlertChange(true);
                  }}
                  color="primary"
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  ยืนยัน
                </Button>
              ) }
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-yellow-900 py-2 rounded-md font-bold "
        style={{
          width: "300px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#FAD02C",
        }}
      >
        หน้ารออาจารย์ตอบกลับ
      </div>
      <div
        className="flex flex-col justify-center mx-auto p-4  text-xl mt-4 bg-white rounded-2xl "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
          width: "70%",
        }}
      >
        {/* <button onClick={()=>{finalCancelProject()}}>Test API</button> */}
        <div className=" m-auto text-gray-700" style={{ width: "90%" }}>
          <p className="text-center text-3xl my-2 text-gray-800">
            {" "}
            เสนอหัวข้อโครงงงาน
          </p>
          {/* <button
          onClick={() => {
            console.log(rejectTeacher[0].id_teacher);
          }}
        >
          Test {props.projectName}
        </button> */}
          {/* {data.length === rejectTeacher.length ? <p>Pass</p>: <p>Error</p>} */}
          {request.map((val, index) => {
            var content = null;
            if (val.status == 0) {
              content = (
                <span className="text-yellow-500">
                  <i className="bx bx-time-five bx-spin  mx-2 text-2xl"></i>
                  ยังไม่ได้รับการยืนยัน
                </span>
              );
            } else if (val.status == 1) {
              content = (
                <span className="text-green-500">
                  <i className="bx bx-check-square bx-rotate-90 bx-burst mx-2 text-2xl"></i>
                  ได้รับการยืนยันเรียบร้อย
                </span>
              );
            } else if (val.status == 2) {
              content = (
                <span className="text-red-500">
                  <i className="bx bx-x bx-tada mx-2 text-2xl"></i>
                  ปฏิเสธหัวข้อโครงงาน
                </span>
              );
            }

            return (
              <div key={index} className=" my-4 text-xl text-left">
                <p className="font-semibold   ">
                  {val.role} :{" "}
                  <span className="font-medium ">{val.committee_name} </span>{" "}
                </p>
                <p>
                  สถานะการยืนยัน {"-->"} {content}
                </p>
              </div>
            );
          })}
        </div>
        {waitContent}
      </div>

      <Dialog
        open={alert}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"ยืนยันการยกเลิกหัวข้อโครงงาน ?"}</p>{" "}
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
              finalCancelProject();
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ยืนยัน
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={alertChange}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">
            {"ยืนยันการแก้ไขรายชื่ออาจารย์ในโครงงาน ?"}
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
              setAlertChange(false);
            }}
            className=" h-10 rounded-lg bg-red-600   uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-4 "
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              finalChange();
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

//old function

// function nextStageProject() {
//   axios
//     .put(`https://demo-tspm-server.herokuapp.com/project/nextstage/${projectId}`)
//     .then((response) => {
//       console.log(response.data);
//       props.function();
//     });
// }

// const sendNewTeachers = () => {
//   for (let i = 0; i < data.length; i++) {
//     var id = data[i].teacher.id;
//     var name = data[i].teacher.name;
//     var role = data[i].role;
//     var pnameEN = data[i].project_name_eng;
//     var description = `${pnameEN} ได้ส่งคำขอให้ ${name} เป็น ${role} ประจำโครงงาน`;
//     var state_name = "เสนอหัวข้อโครงงาน";

//     //console.log(id,name,role,pnameEN)

//     axios
//       .post("https://demo-tspm-server.herokuapp.com/project/addcommitproject", {
//         committee_name: name,
//         role: role,
//         id_teacher: id,
//         project_eng: pnameEN,
//       })
//       .then((response) => {
//         //alert('ได้ป่าววะ03')
//       });

//     axios
//       .post("https://demo-tspm-server.herokuapp.com/notification/", {
//         description: description,
//         state_name: state_name,
//         id_teacher: id,
//         project_name_eng: pnameEN,
//       })
//       .then((response) => {
//         console.log(response.data);
//         //alert('ได้ป่าววะ notification')
//       });
//   }
// };

// const deleteRejectTeachers = () => {
//   for (let i = 0; i < rejectTeacher.length; i++) {
//     axios
//       .delete(
//         `https://demo-tspm-server.herokuapp.com/project/deleterejecteacher/${rejectTeacher[i].id_teacher}`,
//         { data: { project: props.projectName } }
//       )
//       .then((res) => {
//         console.log(res.data);
//         props.function()
//       });
//   }
// };
// const cancelProject = () =>{
//   axios.post(`https://demo-tspm-server.herokuapp.com/project/cancel/${projectId}`,{
//     projectName:props.projectName
//   }).then((res)=>{
//     props.function()
//     console.log(res)
//   })
// }

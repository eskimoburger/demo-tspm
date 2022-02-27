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
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";

import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function state2({ projectId, projectName,projectCPE,refreshData,functionNext }) {
  useEffect(() => {
    getRequest();
    getAllTeacher();
    getReject();
  }, []);

  

  const [request, SetRequest] = useState([]);
  const [wait, setWait] = useState(false);
  const [nextStage, SetNextStage] = useState(false);
  const [reject, SetReject] = useState(false);
  const [open, setOpen] = useState(false);
  const [rejectTeacher, SetRejectTeacher] = useState([]);
  const [allTeacher, SetAllTeacher] = useState([]);
  const [data, SetData] = useState([]);
  const [idProject, setIdProject] = useState(0);
  const [alert, setAlert] = useState(false);
  const [alertChange, setAlertChange] = useState(false);
  const [duplicate, setDuplicate] = useState([]);

  async function getRequest() {
    await axios
      .get(
        `http://localhost:3001/final-project/get-request-state2/${projectId}`
      )
      .then((response) => {
        const { data_request, checkSubmitAll, checkNext, checkReject } =
          response.data;
        console.log(response.data);
        SetRequest(data_request);
        SetReject(checkReject);
        setWait(checkSubmitAll);
        SetNextStage(checkNext);
        console.log(
          "rejectStatus : " + checkReject,
          " nextStatus : " + checkNext,
          " nextSubmitAll : " + checkSubmitAll
        );
      });
    // axios
    //   .get(`http://localhost:3001/project/getmainproject/${projectName}`)
    //   .then((response) => {
    //     //setIdProject(response.data[0].project_id);
    //     console.log(response.data);
    //     setIdProject(response.data.project_id);
    //   });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getAllTeacher() {
    axios.get(`http://localhost:3001/allteacher`).then((response) => {
      console.log(response.data);
      SetAllTeacher(response.data);
    });
  }

  async function getReject() {
    await axios
      .get(`http://localhost:3001/final-project/reject-teacher/${projectId}`)
      .then((response) => {
        ///console.log(response.data);
        SetRejectTeacher(response.data);
        setDuplicate(response.data);
      });
  }

  const finalChange = async () => {
    await axios
      .post(`http://localhost:3001/final-project/state-1/change/${projectId}`, {
        changeTeacher: data,
        rejectTeacher: rejectTeacher,
        project_eng: projectName,
      })
      .then((res) => {
        console.log(res.data);
        //refreshData()
        //getRequest();
        handleClose();
        setAlertChange(false);
      });
  };
  //CancelProject
  const finalCancelProject = async () => {
    await axios
      .post(`http://localhost:3001/final-project/cancel/${projectId}`)
      .then((res) => {
        alert("CancelSuccess");
        //console.lo g(res)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChangeTeacher = (e, index, teacher) => {
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
  };

  const waitContent = () => {
    if (nextStage && projectCPE > 0) {
      let str = projectCPE.toString();
      str = str.padStart(2, 0);
      var id_project_new = "CPE" + str;
      return (
        <div className="flex flex-col text-center space-y-3 mt-2">
          <p className="text-xl">
            รหัสหัวข้อของโครงงานคือ{" "}
            <span className="font-bold">{id_project_new}</span>
          </p>
          <div className="flex justify-center">
          <Button
              onClick={() => {
                functionNext();
              }}
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<NavigateNextOutlinedIcon />}
            style={{ fontSize: 20 }}
          >
            ดำเนินการต่อ
          </Button>
            {/* <button
              className="bg-blue-800 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-500 transition duration-200 each-in-out "
              style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
              onClick={() => {
                functionNext();
              }}
            >
              ดำเนินการต่อ
            </button> */}
          </div>
        </div>
      );
    }
    if (nextStage) {
      return (
        <div className="text-xl text-center my-2">
          <p> กรุณารอรับรหัสหัวข้อโครงงานจากอาจารย์ประจำรายวิชา</p>
        </div>
      );
    }
    if (wait || !reject) {
      return (
        <div className="text-xl text-center my-2 space-y-2 ">
          <p> กรุณารอการตอบรับของอาจารย์เพื่อดำเนินการต่อ...</p>
          <Button
            onClick={
              () => {
                setAlert(true);
              }
              //cancelProject
            }
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<ErrorOutlineIcon />}
            style={{ fontSize: 20 }}
          >
            ยกเลิกหัวข้อโครงงานนี้
          </Button>
        </div>
      );
    }
    if (reject) {
      return (
        <div className="flex justify-center mt-3 gap-2 flex-wrap">
          <Button
            onClick={
              () => {
                setAlert(true);
              }
              //cancelProject
            }
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<ErrorOutlineIcon />}
            style={{ fontSize: 18 }}
          >
            ยกเลิกหัวข้อโครงงานนี้
          </Button>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            size="small"
            startIcon={<ListOutlinedIcon />}
            style={{ fontSize: 16 }}
          >
            แก้ไขรายชื่ออาจารย์ที่ปฎิเสธหัวข้อโครงงาน
          </Button>

          <div>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              //keepMounted
              //onClose={handleClose}
              fullWidth={true}
              maxWidth={"lg"}
            >
              <DialogTitle className="">
                <p className="text-3xl  font-semibold ">
                  แก้ไขรายชื่ออาจารย์ที่ปรึกษาและกรรมการ
                </p>
              </DialogTitle>
              <DialogContent dividers>
                <h2 className=" text-2xl mb-2  text-rose-500">
                  รายชื่ออาจารย์ที่ปฏิเสธหัวข้อโครงงาน
                </h2>
                {rejectTeacher.map((teacher, index) => {
                  return (
                    <div key={index} className=" text-xl">
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
                <h2 className=" text-2xl mb-5 text-green-600 ">
                  เลือกอาจารย์ประจำหัวข้อโครงงานใหม่
                </h2>
                {rejectTeacher.map((teacher, index) => {
                  return (
                    <div
                      key={index}
                      className=" text-black font-bold text-xl  "
                    >
                      <p>{teacher.role} </p>

                      <Select
                        fullWidth
                        defaultValue=""
                        style={{ fontSize: "18px" }}
                        onChange={(e) => {
                          handleChangeTeacher(e, index, teacher);
                        }}
                      >
                        <MenuItem value="" disabled>
                          กรุณาเลือก{teacher.role} คนใหม่
                        </MenuItem>
                        {allTeacher.map((teacherAll, index) => (
                          <MenuItem key={index} value={index}>
                            {teacherAll.name}
                          </MenuItem>
                        ))}
                      </Select>
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
                )}
              </DialogActions>
            </Dialog>
          </div>
        </div>
      );
    }
  };

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
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          width: "90%",
        }}
      >
        {/* <button onClick={()=>{finalCancelProject()}}>Test API</button> */}
        <div className=" m-auto text-gray-700" style={{ width: "90%" }}>
          <h1 className="text-center font-bold  my-2 text-gray-800  text-2xl   stage2:text-3xl ">
            {" "}
            เสนอหัวข้อโครงงงาน
          </h1>
          <div className="flex flex-col p-2  items-center">
            {request.map((val, index) => {
              var content = null;
              if (val.status == 0) {
                content = (
                  <div className=" shadow-lg text-black  text-sm  stage2:text-lg font-bold bg-yellow-400 px-4 py-1 rounded-full">
                    ยังไม่ได้รับการยืนยัน
                  </div>
                );
              } else if (val.status == 1) {
                content = (
                  <div className="shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-green-600 px-4 py-1 rounded-full">
                    ได้รับการยืนยันเรียบร้อย
                  </div>
                );
              } else if (val.status == 2) {
                content = (
                  <div className="shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-red-500 px-4 py-1 rounded-full">
                    ปฏิเสธหัวข้อโครงงาน
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className="stage2:text-left text-base  stage2:w-[500px] stage2:text-2xl  "
                >
                  <div>
                    <p className="font-semibold   ">
                      {val.role} :{" "}
                      <span
                        className="font-medium "
                        style={{ wordWrap: "break-word" }}
                      >
                        {val.committee_name}{" "}
                      </span>{" "}
                    </p>
                  </div>

                  <div className="flex item-center flex-wrap  my-2 ">
                    {" "}
                    <p>
                      สถานะการยืนยัน<span className="mx-2">&#8594;</span>
                    </p>{" "}
                    {content}
                  </div>
                </div>
              );
            })}
          </div>
          {/* {data.length === rejectTeacher.length ? <p>Pass</p>: <p>Error</p>} */}
        </div>
        {waitContent()}

        {/* {duplicate.map((d, index) => {

          return (
            
            <Select
              key={index}
              fullWidth
              value={d.id_teacher}
              onChange={(e) => {
                const cloneData = [...rejectTeacher];
                const cloneTeachers = [...allTeacher]
                //console.log(cloneTeachers)
                cloneData[index]["id_teacher"] = e.target.value
                cloneData[index]["project_name_eng"]= projectName
                cloneData[index]["status"]= 0
                cloneData[index]["committee_name"] = cloneTeachers[e.target.value-1].name;
                setDuplicate(cloneData);
              }}
              style={{ fontSize: "18px" }}
            >
               <MenuItem value={d.id_teacher} disabled>
                  กรุณาเลือก{d.role} คนใหม่
                </MenuItem>;
              {allTeacher.map((teacherAll, indexT) => {

                return (
                  <MenuItem key={indexT} value={teacherAll.id}>
                    {teacherAll.name}
                  </MenuItem>
                );
              })}
            </Select>
            
          );
        })}

        {duplicate !== rejectTeacher && <button
          onClick={() => {
            console.log(duplicate);
          }}
        >
          5555555
        </button>
        } */}
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
//     .put(`http://localhost:3001/project/nextstage/${projectId}`)
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
//       .post("http://localhost:3001/project/addcommitproject", {
//         committee_name: name,
//         role: role,
//         id_teacher: id,
//         project_eng: pnameEN,
//       })
//       .then((response) => {
//         //alert('ได้ป่าววะ03')
//       });

//     axios
//       .post("http://localhost:3001/notification/", {
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
//         `http://localhost:3001/project/deleterejecteacher/${rejectTeacher[i].id_teacher}`,
//         { data: { project: props.projectName } }
//       )
//       .then((res) => {
//         console.log(res.data);
//         props.function()
//       });
//   }
// };
// const cancelProject = () =>{
//   axios.post(`http://localhost:3001/project/cancel/${projectId}`,{
//     projectName:props.projectName
//   }).then((res)=>{
//     props.function()
//     console.log(res)
//   })
// }

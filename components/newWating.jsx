import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function newWating(props) {
  useEffect(() => {
    getRequest();
    getAllTeacher();
    getReject();
    //setProjectName(props.projectName)
  }, []);
  const classes = useStyles();
  //const [projectName,setProjectName] = useState("")
  const [request, SetRequest] = useState([]);
  const [wait, setWait] = useState(false);
  const [nextStage, SetNextStage] = useState(false);
  const [reject, SetReject] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [rejectTeacher, SetRejectTeacher] = useState([]);
  const [allTeacher, SetAllTeacher] = useState([]);
  const [data, SetData] = useState([]);
  const [idProject, setIdProject] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getRequest() {
    axios
      .get(`http://localhost:3001/project/getrequest/${props.projectName}`)
      .then((response) => {
        //console.log(response.data);
        //console.log(response.data[0].project_id);
        setIdProject(response.data[0].project_id);
        SetRequest(response.data);

        var teacherStatus = [];
        for (let i = 0; i < response.data.length; i++) {
          teacherStatus.push(response.data[i].status);
        }
        console.log(teacherStatus);

        var checkSubmitAll = teacherStatus.every(function (status) {
          return status == 0;
        });
        var checkNext = teacherStatus.every(function (status) {
          return status == 1;
        });
        //
        var checkReject = false;
        for (let i = 0; i < teacherStatus.length; i++) {
          if (teacherStatus[i] == 2) {
            checkReject = true;
          }
        }

        console.log(checkReject);
        console.log(checkNext);
        SetReject(checkReject);
        setWait(checkSubmitAll);
        SetNextStage(checkNext);
      });
  }

  function getAllTeacher() {
    axios.get(`http://localhost:3001/allteacher`).then((response) => {
      console.log(response.data);
      SetAllTeacher(response.data);
    });
  }

  function getReject() {
    axios
      .get(`http://localhost:3001/project/rejectteacher/${props.projectName}`)
      .then((response) => {
        console.log(response.data);
        SetRejectTeacher(response.data);
      });
  }

  const sendNewTeachers = () => {
    for (let i = 0; i < data.length; i++) {
      var id = data[i].teacher.id;
      var name = data[i].teacher.name;
      var role = data[i].role;
      var pnameEN = data[i].project_name_eng;
      var description = `${pnameEN} ได้ส่งคำขอให้ ${name} เป็น ${role} ประจำโครงงาน`;
      var state_name = "เสนอหัวข้อโครงงาน";

      //console.log(id,name,role,pnameEN)

      axios
        .post("http://localhost:3001/project/addcommitproject", {
          committee_name: name,
          role: role,
          id_teacher: id,
          project_eng: pnameEN,
        })
        .then((response) => {
          //alert('ได้ป่าววะ03')
        });

      axios
        .post("http://localhost:3001/notification/", {
          description: description,
          state_name: state_name,
          id_teacher: id,
          project_name_eng: pnameEN,
        })
        .then((response) => {
          console.log(response.data);
          //alert('ได้ป่าววะ notification')
        });
    }
  };

  const deleteRejectTeachers = () => {
    for (let i = 0; i < rejectTeacher.length; i++) {
      var id = rejectTeacher[i].id_teacher;
      var pnameEN = rejectTeacher[i].project_name_eng;
      console.log(id, pnameEN);
      axios
        .delete("http://localhost:3001/project/deletecommitproject", {
          data: { id_teacher: id, project_eng: pnameEN },
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  var waitContent = null;

  if (wait || reject == false) {
    waitContent = (
      <div className="text-2xl text-center flex flex-col space-y-5">
        <p> กรุณารอการตอบรับของอาจารย์เพื่อดำเนินการต่อ</p>
      </div>
    );
  }

  if (nextStage) {
    waitContent = (
      <div className="text-2xl text-center flex flex-col space-y-5">
        <p> กรุณารอรับรหัสหัวข้อโครงงานจากอาจารย์ประจำรายวิชา</p>
      </div>
    );
  }

  if (nextStage && idProject > 0) {
    let str = idProject.toString();
    str = str.padStart(2, 0);
    var id_project_new = "CPE" + str;
    waitContent = (
      <div className="flex flex-col text-center space-y-4">
        <p className="text-2xl">
          {" "}
          รหัสหัวข้อของโครงงานคือ{" "}
          <span className="font-bold">{id_project_new}</span>
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-800 text-white p-4 rounded-xl">
            {" "}
            ดำเนินการต่อ
          </button>
        </div>
      </div>
    );
  } else if (reject) {
    waitContent = (
      <div>
        <button
          className="bg-yellow-500 text-white p-4 rounded-xl"
          onClick={handleClickOpen}
        >
          {" "}
          กรุณาแก้ไขรายละเอียดโครงงาน
        </button>
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"lg"}
          >
            <DialogTitle>
              <p className="flex  justify-center  text-5xl font-semibold ">
                แก้ไขรายชื่ออาจารย์ที่ปรึกษาและกรรมการ
              </p>
            </DialogTitle>
            <DialogContent dividers>
              <p className=" text-3xl mb-5 ">
                รายชื่ออาจารย์ที่ปฏิเสธหัวข้อโครงงาน
              </p>
              {rejectTeacher.map((teacher) => {
                return (
                  <>
                    <div className=" text-red-600 text-2xl ml-10 ">
                      <p>
                        {teacher.role} {teacher.committee_name}
                      </p>
                    </div>
                  </>
                );
              })}

              <div className=" flex justify-center  my-10">
                <Image src="/down-arrow.png" width="100" height="100" />
              </div>
              <p className=" text-3xl mb-5 ">เลือกอาจารย์ใหม่</p>
              {rejectTeacher.map((teacher, index) => {
                return (
                  <div
                    key={index}
                    className=" text-green-600 text-2xl ml-10 mb-3"
                  >
                    <p>{teacher.role} </p>
                    <div className="relative">
                      {/* <select
                            value={data}
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            onChange={(e) => {
                              const selectedTeacher =
                                allTeacher[e.target.value];
                              console.log(index)
                              e.preventDefault();
                              console.log(selectedTeacher, teacher.role);

                              for (var i = 0; i < data.length; i++) {
                                if (data[i].index == index) {
                                  data.splice(i, 1);
                                }
                              }

                              SetData([
                                ...data,
                                {
                                  teacher: selectedTeacher,
                                  role: teacher.role,
                                  index:index
                                },
                              ]);
                            }}
                          >
                            <option disabled selected>
                              กรุณาเลือก{teacher.role}คนใหม่
                            </option>
                            {allTeacher.map((teacherAll, index) => {
                              return (
                                <>
                                  <option value={index}>
                                    {teacherAll.name}
                                  </option>
                                </>
                              );
                            })}
                          </select> */}

                      <FormControl
                        style={{ minWidth: "600px", minHeight: "100px" }}
                      >
                        <InputLabel style={{ fontSize: "18px " }}>
                          {teacher.role} คนใหม่
                        </InputLabel>
                        <Select
                          defaultValue=""
                          style={{ fontSize: "18px" }}
                          onChange={(e) => {
                            const selectedTeacher = allTeacher[e.target.value];
                            console.log(index);
                            console.log(e.target.value);
                            e.preventDefault();
                            console.log(selectedTeacher, teacher.role);

                            for (var i = 0; i < data.length; i++) {
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
                          }}
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
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => {
                  handleClose;
                }}
              >
                ยกเลิก
              </Button>
              <Button
                onClick={() => {
                  handleClose(),
                    sendNewTeachers(),
                    deleteRejectTeachers(),
                    getRequest();
                }}
                color="primary"
                style={{ backgroundColor: "green", color: "white" }}
              >
                ยืนยัน
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className=" text-2xl relative bg-green-400  w-2/6 p-3 text-white font-bold rounded-xl  shadow-xl text-center "
        style={{ left: "-40px", top: "-10px" }}
      >
        หน้ารออาจารย์ตอบกลับ
      </div>

      {request.map((val, index) => {
        var content = null;
        if (val.status == 0) {
          content = <p className="text-yellow-500">ยังไม่ได้รับการยืนยัน</p>;
        } else if (val.status == 1) {
          content = <p className="text-green-500">ได้รับการยืนยันเรียบร้อย</p>;
        } else if (val.status == 2) {
          content = <p className="text-red-500">ปฏิเสธหัวข้อโครงงาน</p>;
        }

        return (
          <div
            key={index}
            className=" ml-14 flex space-x-5  text-2xl text-left"
          >
            <p className=" font-bold">{val.role}:</p>
            <p>{val.committee_name}</p>
            {content}
          </div>
        );
      })}

      <br />

      <br />

      {/* <div className="flex justify-center mb-5 text-2xl ">
        รอรับหมายเลขโครงงานงานจากอาจารย์ประจำรายวิชา
      </div> */}

      <div className="flex justify-center mb-5 ">{waitContent}</div>
      <button onClick={() => console.log(data)}>Test</button>
    </div>
  );
}

export default newWating;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/manageteacher.module.scss";

//material ui
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function hometeacher(props) {
  useEffect(() => {
    getProjectFromTeacher();
  }, []);

  const [advisorProject, SetAdvisorProject] = useState([]);
  const [committeeProject, SetCommitteeProject] = useState([]); ///ยังไม่ได้ทำ
  const [coAdvisorProject, SetCoAdvisorProject] = useState([]); //ยังไม่ได้ทำ

  //modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showProject, setShowProject] = useState({
    id: 0,
    name: "",
    members: [],
    teachers: [],
    logbook: "",
    state: "",
  });

  const projectOn = (val) => {
    setOpen(true);
    setShowProject({
      id: val.id_project,
      name_th: val.project_th,
      name_eng: val.project_eng,
      members: val.name,
      teachers: val.teachers,
      //state: state,

      // member: ["std1", "std2"],
      // logbook: 5,
      // state: val.stat,
    });
  };

  function getProjectFromTeacher(id) {
    axios
      .get(
        `https://demo-tspm-server.herokuapp.com/project/getprojectbyteacher/${props.teacher.id}`
      )
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].role == "กรรมการ") {
            // console.log("กรรมการ" + i);
            //console.log(response.data[i]);
            axios
              .get(
                `https://demo-tspm-server.herokuapp.com/project/getprojectbyname/${response.data[i].project_name_eng}`
              )
              .then((res) => {
                //console.log(res.data);
                SetCommitteeProject((oldArray) => [...oldArray, res.data]);
              });

            //SetAdvisorProject([...advisorProject, {role: response.data[i].project_name_eng}])
          }
          if (response.data[i].role == "อาจารย์ที่ปรึกษา") {
            axios
              .get(
                `https://demo-tspm-server.herokuapp.com/project/getprojectbyname/${response.data[i].project_name_eng}`
              )
              .then((res) => {
                console.log(res.data);
                SetAdvisorProject((oldArray) => [...oldArray, res.data]);
              });
          }
          if (response.data[i].role == "อาจารย์ที่ปรึกษาร่วม") {
            axios
              .get(
                `https://demo-tspm-server.herokuapp.com/project/getprojectbyname/${response.data[i].project_name_eng}`
              )
              .then((res) => {
                console.log(res.data);
                SetCoAdvisorProject((oldArray) => [...oldArray, res.data]);
              });
          }
        }
      });
  }
  var projectContent = null;

  if (advisorProject.length > 0) {
    projectContent = (
      <div>
        <div className={styles.table_manage}>
          <table style={{ width: "70%" }}>
            <caption className="bg-red-500 rounded-t-lg text-2xl text-white py-3">
              รายชื่อโครงงานที่เป็นอาจารย์ที่ปรึกษา
            </caption>
            <thead>
              <tr>
                <th
                  className="bg-yellow-400 text-white"
                  style={{ width: "15%" }}
                >
                  ID
                </th>
                <th className="bg-blue-600 text-white" style={{ width: "40%" }}>
                  ชื่อโครงงาน
                </th>
                <th
                  className="bg-green-600 text-white"
                  style={{ width: "30%" }}
                >
                  สถานะ
                </th>
                <th className="bg-yellow-700 text-white" style={{}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {advisorProject.map((project, index) => {
                return (
                  <tr key={index}>
                    <th>CPE{project.id_project.toString().padStart(2, 0)}</th>
                    <th> {project.project_th}</th>
                    <th> {project.state}</th>
                    <th>
                      <div
                        onClick={() => {
                          projectOn(project);
                        }}
                        className="text-blue-500 cursor-pointer hover:text-blue-800 text-lg "
                      >
                        ดูรายละเอียด
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <br />
      </div>
    );
  }

  return (
    <div>
      <div
        className="bg-red-500 text-center rounded-lg text-white text-4xl py-4 "
        style={{
          width: "300px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        จัดการโครงงาน
      </div>
      <br />
      {projectContent}

      {/* modal */}

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle>
            {" "}
            <p className="text-2xl">รายละเอียดโครงงาน</p>{" "}
          </DialogTitle>
          <DialogContent dividers>
            <div className="flex flex-col px-8 mb-5 space-y-2">
              <p className="text-2xl font-bold">
                รหัสโครงงาน : CPE{showProject.id.toString().padStart(2, 0)}
              </p>
              <p className="text-2xl font-semibold">
                ชื่อโครงงานภาษาไทย : {showProject.name_th}
              </p>
              <p className="text-2xl font-semibold">
                ชื่อโครงงานภาษาอังกฤษ : {showProject.name_eng}
              </p>
              <p className="text-2xl font-semibold">สมาชิกในกลุ่ม</p>

              {showProject.members.map((mem,index) => {
                return (
                  <div key={index}>
                    <p className="ml-5 text-2xl">
                      รหัสนิสิต {mem.id} <span>ชื่อ {mem.name}</span>
                    </p>
                  </div>
                );
              })}
              <p className="text-2xl font-semibold">รายชื่ออาจารย์</p>
              {showProject.teachers.map((teacher,index) => {
                return (
                  <div key={index}>
                    <p className="ml-5 text-2xl ">
                      ชื่อ {teacher.teacher_name}{" "}
                      <span className="font-bold">{teacher.role}</span>
                    </p>
                  </div>
                );
              })}
              <p className="text-2xl font-semibold">
                สถานะ : <span className="text-green-500"></span>
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              ปิด
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

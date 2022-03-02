import React, { useState, useEffect } from "react";
import styles from "../styles/t_index.module.scss";
import Close from "../public/close.svg";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Router from 'next/router';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function T_index() {
  useEffect(() => {
    getProjectFromTeacher();
  }, []);

  const [allProject, SetAllProject] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getProjectFromTeacher() {
    axios
      .get("https://demo-tspm-server.herokuapp.com/project/getallproject")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // console.log("กรรมการ" + i);
          //console.log(response.data[i]);
          axios
            .get(
              `https://demo-tspm-server.herokuapp.com/project/getprojectbyname/${response.data[i].project_name_eng}`
            )
            .then((res) => {
              console.log(res.data);
              SetAllProject((oldArray) => [...oldArray, res.data]);
              //SetAllProject(res.data)
            });
        }
      });
  }

  const [showProject, setshowProject] = useState({
    id: "",
    name: "",
    members: [],
    teachers: [],
    logbook: "",
    state: "",
  });
  function projectOn(val, state) {
    var modal = document.getElementById("projectModal");
    modal.style.display = "block";

    setshowProject({
      id: val.id_project,
      name_th: val.project_th,
      name_eng: val.project_eng,
      members: val.name,
      teachers: val.teachers,
      state: state,

      // member: ["std1", "std2"],
      // logbook: 5,
      // state: val.stat,
    });
  }
  function projectOff() {
    var modal = document.getElementById("projectModal");
    modal.style.display = "none";
  }

  const [idProject ,setIdProject]=useState(0)
  function updateProjectID(id){
    axios.put(`https://demo-tspm-server.herokuapp.com/project/updateidbyname/${showProject.name_eng}`,{id_project:id}).then((response)=>{
     console.log(response.data.message) 
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    
    axios.put(`https://demo-tspm-server.herokuapp.com/project/updateidbyname/${showProject.name_eng}`,{id_project:idProject}).then( async(response)=>{
     console.log(response.data.message) 
     Router.reload()
     //await getProjectFromTeacher()
    })
  };

  var allProjectContent = null;

  if (allProject.length > 0) {
    allProjectContent = (
      <>
        <div className={styles.project_list}>
          <div className={styles.title_table}>รายชื่อโครงงานทั้งหมด</div>
          <div className={styles.project_title}>
            <div className={styles.project_i_title}>ID</div>
            <div className={styles.project_name_title}>ชื่อโครงงาน</div>
            <div className={styles.project_stat_title}>สถานะโครงงาน</div>
          </div>
          {allProject.map((val) => {
            var id = "";
            var state = "";
            if (val.id_project == 0) {
              id = "CPEXX";
            } else {
              let str = val.id_project.toString();
              str = str.padStart(2, 0);
              //var id_project_new = "CPE" + str;

              id = "CPE" + str;
            }

            if (val.state == 1 || val.state == 0) {
              state = "เสนอหัวข้อโครงงาน";
            }
            if (val.state == 2) {
              state = "ขอสอบหัวข้อโครงงาน";
            }
            if (val.state == 4) {
              state = "บันทึกผลการสอบ";
            }

            return (
              <div
                className={styles.project}
                onClick={() => projectOn(val, state)}
              >
                <div className={styles.project_i}>{id}</div>
                <div className={styles.project_name}>{val.project_th}</div>
                <div className={styles.project_stat}>{state}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>จัดการโครงงาน</div>
      </div>
      <div id="projectModal" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <div className="text-4xl font-bold">รายละเอียดโครงงาน</div>

            <div className={styles.close} onClick={projectOff}>
              <Close width="30" height="30" />
            </div>
          </div>
          <div className="flex flex-col px-8 mb-5 space-y-2">
            <p className="text-3xl font-bold">รหัสโครงงาน : {showProject.id}</p>
            <p className="text-2xl font-semibold">
              ชื่อโครงงานภาษาไทย : {showProject.name_th}
            </p>
            <p className="text-2xl font-semibold">
              ชื่อโครงงานภาษาอังกฤษ : {showProject.name_eng}
            </p>
            <p className="text-2xl font-semibold">สมาชิกในกลุ่ม</p>

            {showProject.members.map((mem) => {
              return (
                <>
                  <p className="ml-5 text-2xl">
                    รหัสนิสิต {mem.id} <span>ชื่อ {mem.name}</span>
                  </p>
                </>
              );
            })}
            <p className="text-2xl font-semibold">รายชื่ออาจารย์</p>
            {showProject.teachers.map((teacher) => {
              return (
                <>
                  <p className="ml-5 text-2xl ">
                    ชื่อ {teacher.teacher_name}{" "}
                    <span className="font-bold">{teacher.role}</span>
                  </p>
                </>
              );
            })}
            <p className="text-2xl font-semibold">
              สถานะ :{" "}
              <span className="text-green-500">{showProject.state}</span>
            </p>
          </div>
          <div className="flex justify-center mb-5">
            <button
              onClick={handleClickOpen}
              className="bg-yellow-500 text-2xl p-5  rounded-2xl shadow-lg"
            >
              แก้ไขรหัสโครงงาน
            </button>
          </div>
        </div>
      </div>
      {allProjectContent}

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>
            {" "}
            <p className="text-2xl"> แก้ไขรหัสโครงงาน</p>{" "}
          </DialogTitle>
          <DialogContent dividers>
            <form id="update-id" onSubmit={handleSubmit} >
            <input
              defaultValue=""
              required
              type="number"
              onChange={(e)=>{setIdProject(e.target.value)}}
              className=" text-4xl  border-2 p-2"
              min="0"
              placeholder="กรุณากรอกรหัสโครงงาน"
            ></input>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}  variant="contained" color="secondary">
              ยกเลิก
            </Button>
            <Button  form="update-id" type="submit" style={{backgroundColor:"green" ,color:"white"}}>
              ตกลง
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <button
        onClick={() => {
          console.log(allProject);
        }}
      >
        Test
      </button>
    </div>
  );
}

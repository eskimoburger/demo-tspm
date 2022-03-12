import React, { useState, useEffect } from "react";
import Image from "next/image";
import Alarm from "../public/bell.svg";
import UserMenu from "../public/userMenu.svg";
import NavHome from "../public/home.svg";
import NavSearch from "../public/search.svg";
import NavDoc from "../public/text.svg";
import NavLogbook from "../public/logbook.svg";
import NavLogout from "../public/logout.svg";
import NavUserI from "../public/user.svg";
import NavUser from "../public/person.svg";
import styles from "../styles/css2.module.scss";
import Link from "next/link";

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

import axios from "axios";

export default function T_Layout(props) {
  useEffect(() => {
    getNotification();
  }, []);
  // don't  forget id
  const getNotification = () => {
    axios
      .get("http://localhost:3001/notification/project/2")
      .then((response) => {
        console.log(response.data.results);
        setNotic(response.data.results);
      });
  };

  async function deleteNotification(id) {
    axios
      .delete("http://localhost:3001/notification/project/" + id)
      .then(async (response) => {
        console.log(response.data);
        await getNotification();
      });
  }

  async function AcceptAndDeleteNotification() {
    axios
      .delete("http://localhost:3001/notification/project/153")
      .then(async (response) => {
        console.log(response.data);
        await getNotification();
      });
  }

  function getProjectByName(name) {
    axios
      .get("http://localhost:3001/project/getprojectbyname/" + name)
      .then((response) => {
        //console.log(response.data);
        SetProjectDetail(response.data);
        setOpen(true);
      });
  }

  function submitted(projectname) {
    axios
      .put(`http://localhost:3001/project/submitted/${projectname}/5`)
      .then((response) => {
        console.log(response.data);
      });
  }

  function rejected(projectname) {
    axios
      .put(`http://localhost:3001/project/rejected/${projectname}/5`)
      .then((response) => {
        console.log(response.data);
      });
  }

  function pushNotification(des, state, id, project) {
    axios
      .post(`http://localhost:3001/notification/student/`, {
        description: des,
        state_name: state,
        id_teacher: id,
        project_name_eng: project,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  const [svgColor1, updateSvgColor1] = useState("black");
  const [svgColor2, updateSvgColor2] = useState("black");
  const [projectDetail, SetProjectDetail] = useState({
    project_th: "",
    project_eng: "",
    description: "",
    teachers: [],
    name: [],
  });

  const [Notic, setNotic] = useState([
    {
      topic: "เสนอหัวข้อโครงงาน",
      sender: "Student 1",
      des: "ระบบจัดการการทำโครงงาน",
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function dropdownShow(id) {
    if (id == "noctic_box") {
      if (document.getElementById(id).style.display == "none") {
        if (document.getElementById("userMenu").style.display == "none") {
          document.getElementById(id).style.display = "block";
          updateSvgColor1("#cc184e");
        } else {
          document.getElementById("userMenu").style.display = "none";
          document.getElementById(id).style.display = "block";
          updateSvgColor2(" #423034");
          updateSvgColor1("#cc184e");
        }
      } else {
        document.getElementById(id).style.display = "none";
        updateSvgColor1(" #423034");
      }
    }
    if (id == "userMenu") {
      if (document.getElementById(id).style.display == "none") {
        if (document.getElementById("noctic_box").style.display == "none") {
          document.getElementById(id).style.display = "block";
          updateSvgColor2("#cc184e");
        } else {
          document.getElementById("noctic_box").style.display = "none";
          document.getElementById(id).style.display = "block";
          updateSvgColor1(" #423034");
          updateSvgColor2("#cc184e");
        }
      } else {
        document.getElementById(id).style.display = "none";
        updateSvgColor2(" #423034");
      }
    }
  }
  function logOut() {
    sessionStorage.clear();
  }
  return (
    <div className={styles.display}>
      {/*--------------------------topbar--------------------------*/}
      <div className={styles.topbar}>
        <div className={styles.topbar_img}>
          <a href="/">
            <Image src="/logo.jpg" width="67" height="67" />
          </a>
        </div>
        <div className={styles.topbar_title}>
          The Student Project Management System
        </div>
        <div className={styles.topMenu_box}>
          <div className={styles.topMenu_text}>
            <a href="/user">
              <div className={styles.topMenu_name}>{props.user.username}</div>
            </a>
          </div>
          <Badge
            color="secondary"
            variant="dot"
            className={styles.topMenu}
            onClick={(e) => {
              dropdownShow("noctic_box");
            }}
          >
            <Alarm width="" height="20" fill={svgColor1} />
            <div id="noctic_box" className={styles.topMenu_content}>
              <p className=" text-3xl pl-2 pt-2 font-bold">การแจ้งเตือน</p>
              {Notic.map((val) => {

                if(val.state_name == "บันทึกผลการสอบหัวข้อโครงงาน" ){
                  return (
                    <div className="p-3 border-b-2 border-white ">
                    <p className="" style={{ fontSize: "24px" }}>
                      {" "}
                      {val.state_name}
                    </p>
                    <p
                      className=" leading-normal "
                      style={{ fontSize: "14px" }}
                    >
                      {" "}
                      &nbsp;&nbsp;{val.description}
                    </p>
                    {/* ()=>getProjectByName(val.project_name_eng) */}
                    <p
                      className=" text-blue-500"
                      onClick={() => getProjectByName(val.project_name_eng)}
                    >
                      ดูรายละเอียด
                    </p>
                    <p className=" flex  justify-end">{val.time}</p>

                    <div className="flex space-x-5 justify-center">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "green", color: "white" }}
      
                      >
                        ยอมรับ
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "yellow", color: "black" }}
                      >
                        แก้ไข
                      </Button>
                    </div>
                  </div>

                  )

                }
                




                return (
                  <>
                    <div className="p-3 border-b-2 border-white ">
                      <p className="" style={{ fontSize: "24px" }}>
                        {" "}
                        {val.state_name}
                      </p>
                      <p
                        className=" leading-normal "
                        style={{ fontSize: "14px" }}
                      >
                        {" "}
                        &nbsp;&nbsp;{val.description}
                      </p>
                      {/* ()=>getProjectByName(val.project_name_eng) */}
                      <p
                        className=" text-blue-500"
                        onClick={() => getProjectByName(val.project_name_eng)}
                      >
                        ดูรายละเอียด
                      </p>
                      <p className=" flex  justify-end">{val.time}</p>

                      <div className="flex space-x-5 justify-center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "green", color: "white" }}
                          onClick={() => {
                            var message =
                              val.name +
                              "ได้ตอบตกลงในการเสนอหัวข้อโครงงาน " +
                              val.project_name_eng;
                            deleteNotification(val.id_noti);
                            getNotification();
                            submitted(val.project_name_eng);
                            pushNotification(
                              message,
                              val.state_name,
                              val.id,
                              val.project_name_eng
                            );
                          }}
                        >
                          ยอมรับ
                        </Button>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() => {
                            var message =
                              val.name +
                              "ได้ปฏิเสธในการเสนอหัวข้อโครงงาน " +
                              val.project_name_eng;
                            deleteNotification(val.id_noti);
                            rejected(val.project_name_eng);
                            getNotification();
                            submitted(val.project_name_eng);
                            pushNotification(
                              message,
                              val.state_name,
                              val.id,
                              val.project_name_eng
                            );
                          }}
                        >
                          ปฏิเสธ
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </Badge>
          <div
            className={styles.topMenu}
            onClick={(e) => {
              dropdownShow("userMenu");
            }}
          >
            <UserMenu width="" height="20" fill={svgColor2} />
            <div id="userMenu" className={styles.topMenu_content}>
              <Link href="/user">
                <a>ข้อมูลผู้ใช้</a>
              </Link>
              <Link href="/password">
                <a>รหัสผ่าน</a>
              </Link>
              <Link href="/">
                <a onClick={logOut}>ออกจากระบบ</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*---------------------------sidebar--------------------------------*/}
      <div className={styles.sidebar}>
        <Link href="/">
          <a>
            <NavHome className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>หน้าหลัก</p>
          </a>
        </Link>
        <Link href="/user">
          <a>
            <NavUser className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>ข้อมูลผู้ใช้</p>
          </a>
        </Link>
        <Link href="/logbook">
          <a>
            <NavLogbook
              className={styles.sidebar_icon}
              width="30"
              height="30"
            />
            <p className={styles.sidebar_text}>ประวัตินักศึกษา</p>
          </a>
        </Link>
        <Link href="/">
          <a>
            <NavSearch className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>ค้นหาโครงงาน</p>
          </a>
        </Link>
        <Link href="/">
          <a>
            <NavDoc className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>ไฟล์เอกสาร</p>
          </a>
        </Link>
        <Link href="/">
          <a onClick={logOut}>
            <NavLogout className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>ออกจากระบบ</p>
          </a>
        </Link>
      </div>
      {/* ----------------------------Dialog----------------------------------- */}
      <div>
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
            <div className="text-2xl">
              <p>ชื่อโครงงานภาษาไทย : {projectDetail.project_th}</p>
              <p>ชื่อโครงงานภาษาอังกฤษ : {projectDetail.project_eng}</p>
              <p className="py-3">รายละเอียดโครงงาน</p>
            </div>
            <div>
              <p
                className=" border-2 border-gray-100 rounded-md mt-3 bg-gray-100 p-2 "
                style={{
                  minHeight: "400px",
                  maxHeight: "400px",
                  overflowY: "scroll",
                }}
              >
                {projectDetail.description}
              </p>
            </div>
            <p className=" text-2xl my-3"> รายชื่ออาจารย์</p>
            {projectDetail.teachers.map((val) => {
              return (
                <>
                  <div className="flex">
                    <div className="text-xl ml-4  " style={{ minWidth: "40%" }}>
                      {" "}
                      <p> ชื่อ {val.teacher_name}</p>
                    </div>
                    <div className=" text-xl  " style={{ minWidth: "60%" }}>
                      {" "}
                      <p>{val.role}</p>
                    </div>
                  </div>
                </>
              );
            })}
            <p className=" text-2xl my-3"> รายชื่อสมาชิกในกลุ่ม</p>
            {projectDetail.name.map((val) => {
              return (
                <>
                  <div className="text-xl ml-3">
                    <p>
                      รหัสนิสิต : {val.id}{" "}
                      <span className="font-normal"> ชื่อ {val.name} </span>
                    </p>
                  </div>
                </>
              );
            })}
          </DialogContent>
        </Dialog>
      </div>

      {/*---------------------------content-------------------------------*/}
      <div className={styles.content}>{props.children}</div>
      {/*-------------------------------------------------------------*/}
      <div className={styles.footer}></div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavHome from "../public/home.svg";
import styles from "../styles/css2.module.scss";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from '@material-ui/icons/ListAlt';

import ManageTeacher from "./manageteacher";
import { useRouter } from "next/router";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationTeacher from "./notificationTeacher";


import axios from "axios";

export default function TeacherLayout(props) {
  useEffect(() => {
    get_teacher();
  }, []);

  const get_teacher = () => {
    if (sessionStorage.getItem("useID")) {
      axios
        .get(
          `http://localhost:3001/allteacher/byuser/${sessionStorage.getItem(
            "useID"
          )}`
        )
        .then((res) => {
          console.log(res.data);
          setTeacherDetail(res.data[0]);
        });
    } else {
      console.log("Nodata");
      router.push("/");
    }
  };
  const [teacherDetail, setTeacherDetail] = useState({
    id: 0,
    name: "",
    username: "",
  });

  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [content, setContent] = useState(0);

  var dropdownContent = null;
  var showContent = null;

  if (dropdown) {
    dropdownContent = (
      <div
        className="absolute bg-gray-200 rounded-xl p-2 justify-center flex"
        style={{ top: "70px", right: "10px", width: "175px" }}
      >
        <Button
          startIcon={<ExitToAppIcon />}
          variant="contained"
          style={{ backgroundColor: "red", color: "white", fontSize: "16px" }}
          onClick={() => {
            router.push("/"), sessionStorage.clear();
          }}
        >
          ออกจากระบบ
        </Button>
      </div>
    );
  }

  if (content === 0) {
    showContent = <div className="text-4xl">ยินดีต้อนรับ {teacherDetail.name}</div>;
  } else if (content === 1) {
    showContent = <NotificationTeacher teacher={teacherDetail} />;
  } else if (content === 2) {
    showContent = <ManageTeacher teacher={teacherDetail} />;
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
            <div className={styles.topMenu_nameT}>{teacherDetail.name}</div>
          </div>
          <div className="flex items-center justify-center relative  ">
            <div
              className="bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <DragHandleIcon style={{ width: "45px", height: "45px" }} />
            </div>

            {dropdownContent}
          </div>
        </div>
      </div>
      {/*---------------------------sidebar--------------------------------*/}
      <div className={styles.sidebar} id="sidebar">
        <div onClick={() => setContent(0)}>
          <a>
            <NavHome className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>หน้าแรก</p>
          </a>
        </div>
        <div onClick={() => setContent(1)}>
          <a>
          <NotificationsActiveIcon className={styles.sidebar_icon} style={{width:"30px",height:"30px",marginLeft:"-30px",color:"#F6BE00"}}/>
            <p className={styles.sidebar_text}>การแจ้งเตือน</p>
          </a>
        </div>
        <div onClick={() => setContent(2)}>
          <a>
          <ListAltIcon className={styles.sidebar_icon} style={{width:"30px",height:"30px",marginLeft:"-30px",color:"gray"}}/>
            <p className={styles.sidebar_text}>การจัดการโครงงาน</p>
          </a>
        </div>
      </div>
      {/*---------------------------content-------------------------------*/}
      <div
        className={styles.content}
        style={{ minHeight: "100vh", maxHeight: "100%" }}
      >
        {props.children}
       
        {showContent}
      </div>
      {/*-------------------------------------------------------------*/}
      <div className={styles.footer}></div>
    </div>
  );
}

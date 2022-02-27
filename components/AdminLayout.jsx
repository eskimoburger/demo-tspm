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
import DragHandleIcon from "@material-ui/icons/DragHandle";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CreateIcon from '@material-ui/icons/Create';
import HomeAdmin from './homeadmin'
import EditTeacher from './editTeacher'
import UploadCsv from './uploadCsv'
import { useRouter } from 'next/router'

export default function AdminLayout(props) {

  const router = useRouter()
  const [svgColor1, updateSvgColor1] = useState("black");
  const [svgColor2, updateSvgColor2] = useState("black");
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
          onClick={() => router.push('/')}
        >
          ออกจากระบบ
        </Button>
      </div>
    );
  }

  if (content === 0) {
    showContent = <HomeAdmin/>
  } else if (content === 1) {
    showContent = <EditTeacher/>;
  }else if (content === 2) {
    showContent = <UploadCsv/>;
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
            <div className={styles.topMenu_name}>Admin</div>
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
          <CreateIcon className={styles.sidebar_icon} style={{width:"30px",height:"30px",marginLeft:"-30px",color:"blue"}}/>
            <p className={styles.sidebar_text}>เพิ่ม/แก้ไข รายชื่ออาจารย์</p>
          </a>
        </div>
        <div onClick={() => setContent(2)}>
          <a>
          <InsertDriveFileIcon className={styles.sidebar_icon} style={{width:"30px",height:"30px",marginLeft:"-30px",color:"green"}}/>
            <p className={styles.sidebar_text}>เพิ่มรายชื่อนักเรียน</p>
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

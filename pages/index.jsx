import React, { useState, useEffect } from "react";
import Image from "next/image";
import Axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/login.module.css";
import Head from "next/head";

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

export default function login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function signIn() {
    //------Request---------//
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    // send request (userid,password) => response({ loginstat:(true/false), userid:"xxxxxxxx", role:(student/teacher/admin) })

    sessionStorage.login = true; //res.loginstat
    sessionStorage.useID = "60360197"; //res.userid
    var role = "student"; //res.role
    /////////////////
    if (sessionStorage.login) {
      if (role == "student") {
        router.push("/");
      } else if (role == "teacher") {
        router.push("/teacher");
      } else if (role == "admin") {
        router.push("/admin");
      }
    } else {
      window.alert("login fail");
    }
  }

  //  Login in System
  const login = () => {
    if (username === "admin" && password === "admin") {
      router.push("/admin");
    } else {
      Axios.post("http://192.168.1.7:3001/user/all", {
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.loggedIn) {
          sessionStorage.setItem("login", true);
          sessionStorage.setItem("useID", response.data.username);
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("id", response.data.id);

          var role = sessionStorage.getItem("role");
          var id = sessionStorage.getItem("useID");
          if (sessionStorage.getItem("login") && role == "student") {
            // if (sessionStorage.getItem("useID") == 60360000){

            // }

            Axios.get(`http://192.168.1.7:3001/user/getproject/${id}`).then(
              (response) => {
                sessionStorage.setItem(
                  "projectname",
                  response.data[0].project_name_eng
                );
                console.log(response.data);
              }
            );
            router.push("/student");
          } else if (sessionStorage.getItem("login") && role == "teacher") {
            router.push("/newteacher");
          } else if (
            sessionStorage.getItem("login") &&
            role == "course_lecture"
          ) {
            console.log("hello ");
            setOpen(true);
          }
        } else {
          setErrorMessage(response.data.message);
        }
      });
    }
  };

  return (
    <div className={styles.display}>
      <Head>
        <title>Login</title>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>
      {/*--------------------------topbar--------------------------*/}
      <div className={styles.topbar}>
        <div className={styles.topbar_img}>
          <a href="/">
            <Image src="/logo.jpg" width="65" height="65" />
          </a>
        </div>
        <div className={styles.topbar_title}>
          <p>The Student Project Management System</p>
          <p className={styles.university}>
            Department of Electrical and Computer Engineering Naresuan
            University
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.box}>
          <div className={styles.box_title}>
            <p>เข้าสู่ระบบ</p>
            <br />
            <Image src="/logo.png" width="200" height="200" />
          </div>
          <div className={styles.content}>
            <input
              id="userid"
              placeholder="รหัสประจำตัว"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="password"
              id="password"
              placeholder="รหัสผ่าน"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <p style={{ color: "red" }}>{errorMessage}</p>
            <button onClick={login}>เข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">เลือกสถานะในการเข้าสู่ระบบ</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          <div className="flex space-x-2  ">
            <button
              onClick={() => {
                router.push("/courselecturer");
              }}
              className="p-2 bg-blue-300 border-2 border-black rounded-md"
            >
              อาจารย์ประจำรายวิชา
            </button>
            <button
              onClick={() => {
                router.push("/newteacher");
              }}
              className="p-2 bg-red-400 border-black border-2 rounded-md"
            >
              อาจารย์ที่ปรึกษาหรือกรรมการประจำโครงงาน
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/*-------------------------------------------------------------*/}
      <div className={styles.footer}>foot</div>
    </div>
  );
}

import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";


import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



export default function newlogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const router = useRouter();

  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const login = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      sessionStorage.setItem("login", true);
      router.push("/admins");
    } else {
      axios
        .post("https://demo-tspm-server.herokuapp.com/user/all", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.loggedIn) {
            sessionStorage.setItem("login", true);
            sessionStorage.setItem("useID", response.data.username);
            sessionStorage.setItem("role", response.data.role);
            sessionStorage.setItem("id", response.data.id);

            var role = sessionStorage.getItem("role");
            var id = sessionStorage.getItem("useID");
            if (sessionStorage.getItem("login") && role == "student") {
              // axios
              //   .get(`https://demo-tspm-server.herokuapp.com/user/getproject/${id}`)
              //   .then((response) => {
              //     sessionStorage.setItem(
              //       "projectname",
              //       response.data[0].project_name_eng
              //     );
              //     console.log(response.data);
              //   });
              router.push(`/students/${id}`);
            } else if (sessionStorage.getItem("login") && role == "teacher") {
              router.push("/teachers");
            } else if (
              sessionStorage.getItem("login") &&
              role == "course_lecture"
            ) {
              console.log("hello ");
              setOpen(true);
            }
          } else {
            setErrorMessages(response.data.message);
          }
        });
    }
  };

  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ</title>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>
      <div
        className="w-screen h-screen fixed overflow-hidden  "
        style={{ zIndex: "-1" }}
      >
        <Image
          alt="Background"
          src="/login_bg.jpg"
          layout="fill"
          objectFit="cover"
          //quality={100}
        ></Image>
      </div>
      <div className="flex items-center justify-center h-screen w-screen">
        <div
          className="bg-white  rounded-2xl flex opacity-95 "
          style={{ width: "80%", height: "80%" }}
        >
          <div className="w-1/2 p-8  ">
            <div className="flex flex-col justify-center items-center  space-y-8 h-full w-full   ">
              <Image
                alt="logo"
                src="/logo.jpg"
                layout="intrinsic"
                width={250}
                height={250}
              />
              <div className=" text-2xl font-bold  mt-5  border-yellow-400 border-4 p-8 rounded-xl  ">
                <p className="uppercase text-center">
                  The Student Project <br /> Management System
                </p>
              </div>
              <p className="text-center text-xl  font-bold  ">
                Department of Electrical and Computer <br /> Engineering
                Naresuan University
              </p>
            </div>
          </div>

          <div className="bg-gray-300 w-1/2 rounded-2xl p-6">
            <div className="w-full h-full flex flex-col justify-center">
              <h1 className="text-5xl font-bold">เข้าสู่ระบบ</h1>
              <p className="mt-2 text-2xl font-normal">
                กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
              </p>
              <form onSubmit={login}>
                <div className="mt-12  space-y-6 ">
                  <label
                    className="block  tracking-wide text-gray-800   text-xl font-bold mb-2"
                    htmlFor="username"
                  >
                    รหัสประจำตัว
                  </label>

                  <input
                    value={username}
                    required
                    className="border-gray-100 border-2 bg-gray-100 p-3 w-full rounded-lg appearance-none focus:border-red-800  focus:outline-none focus:bg-white  "
                    type="text"
                    name=""
                    id="username"
                    placeholder="รหัสประจำตัว ..."
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label
                    className="block  tracking-wide text-gray-800 text-xl font-bold mb-2"
                    htmlFor="password"
                  >
                    รหัสผ่าน
                  </label>

                  <input
                    value={password}
                    required
                    className="border-gray-100 border-2 bg-gray-100 p-3 w-full rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-red-800   "
                    type="password"
                    name=""
                    id="password"
                    placeholder="รหัสผ่าน ..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="text-2xl bg-red-800 text-white px-6 py-4 rounded font-medium  hover:bg-red-700 hover:text-white transition duration-200 each-in-out w-full"
                  style={{ marginTop: "70px" }}
                >
                  เข้าสู่ระบบ
                </button>
              </form>

              <div className="text-xl text-red-500 text-center mt-10 font-bold">
                {errorMessages}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">เลือกสถานะในการเข้าสู่ระบบ</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          <div className="flex justify-between  ">
            <div
              onClick={() => {
                router.push("/course");
              }}
              className="py-2 flex  space-x-2  rounded-md  text-black items-center cursor-pointer  px-8 border-2 border-black hover:border-red-800" 
            >
              <Image
                alt="logo"
                src="/logo.png"
                layout="fixed"
                width={50}
                height={50}
              />
              <p className="ml-2"> อาจารย์ <br /> ประจำรายวิชา</p>
              
            </div>
            <div
              onClick={() => {
                router.push("/teachers");
              }}
              className="py-2  flex space-x-2 px-8   rounded-md  text-black border-2 border-black hover:border-red-800 cursor-pointer"
            >
               <Image
                alt="logo"
                src="/logo.png"
                layout="fixed"
                width={50}
                height={50}
              />
              <p className="ml-2">อาจารย์ที่ปรึกษาหรือ <br /> กรรมการประจำโครงงาน</p>
              
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

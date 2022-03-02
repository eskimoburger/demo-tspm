import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import DescriptionIcon from "@material-ui/icons/Description";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import axios from "axios";
import { useRouter } from "next/router";

export default function studentLayout({ children, title }) {
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    await axios
      .get(
        `https://demo-tspm-server.herokuapp.com/allstudent/test/${
          //sessionStorage.getItem("useID")
          router.query.id
        }
          `
      )
      .then((response) => {
        setName(
          `${response.data.studentList[0].prefix_th}${response.data.studentList[0].thname} ${response.data.studentList[0].thlastname} `
        );
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  };

  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const [sideShow, setSideShow] = useState(false);
  const { id } = router.query;

  var editContent = null;
  if (edit) {
    editContent = (
      <div
        className="absolute p-5 bg-white rounded-xl  "
        style={{
          top: "50px",
          left: "-160px",
          width: "200px",
          height: "300px",
          boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
          zIndex: "2",
        }}
      >
        <div
          onClick={() => {
            router.push("/newlogin"), sessionStorage.clear();
          }}
          className=" flex items-center rounded-md hover:bg-gray-100 text-black cursor-pointer "
        >
          <i className="bx bx-exit text-3xl bg-gray-300 rounded-full px-1 mr-2"></i>
          ออกจากระบบ
        </div>
      </div>
    );
  }

  // if (error) {
  //   return <div>ServerError</div>;
  // }

  //alert(router.pathname)

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>

      <div className="min-h-screen h-screen relative flex flex-col font-All  ">
        <div
          className="bg-white  flex items-center  justify-between px-5  border-gray-300 border-b-2"
          style={{
            height: "70px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <div className="flex   items-center  ">
            <div className="flex items-center p-4">
              <Image
                src="/logo.png"
                className="p-5"
                width={60}
                height={60}
                layout="intrinsic"
              />
            </div>

            {/* <style jsx>{`
        .image2 {
          padding: 50px;
        }
      `}</style> */}

            <div className="   uppercase  iphone:text-sm laptop:text-sm  desktop:text-base font-bold mx-2">
              the student project <br /> management system
            </div>
          </div>
          <div className="flex items-center  h-full gap-2 ">
            <div className="mx-2">
              <i
                onClick={() => setSideShow(!sideShow)}
                className="bx bx-menu text-4xl block   desktop:hidden"
              />
            </div>

            <div className="desktop:text-base  iphone:text-xs bg-white p-2 rounded-full text-black cursor-pointer hover:bg-gray-200 font-bold hidden desktop:block ">
              <p>{name}</p>
            </div>
            {/* <div onClick={() => setEdit(!edit)} className="">
              <i className="bx bx-menu-alt-right text-2xl"></i>
              {editContent}
            </div> */}
            <div className="hidden  desktop:block">
              <div
                onClick={() => setEdit(!edit)}
                className={
                  !edit
                    ? "rounded-full bg-gray-200 w-10 h-10 items-center flex justify-center relative     "
                    : " rounded-full bg-red-200 w-10 h-10 items-center flex justify-center  relative text-red-500"
                }
              >
                <i className="bx bx-menu-alt-right text-2xl"></i>
                {editContent}
              </div>
            </div>
          </div>
        </div>
        {/* // desktop:-translate-x-full  */}
        <div
          className={`absolute  w-72 transition  duration-200 ease-in-out inset-y-0 left-0 min-h-screen bg-gray-50 transform desktop:-translate-x-full     ${
            !sideShow ? " -translate-x-full     " : "translate-x-0"
          }`}
          style={{ zIndex: "10", height: "100%" }}
        >
          <div className="mx-2 flex justify-end">
            <i
              onClick={() => setSideShow(false)}
              className=" cursor-pointer text-4xl bx bx-x font-bold text-red-500"
            />
          </div>

          {/* logo */}
          <div className="text-black flex flex-col items-center space-x-2 px-4 space-y-4 bg-gray-300 p-4 rounded-lg ">
            <Image className="image" src="/logo.png" width={80} height={80} />

            {/* <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg> */}
            <span className="text-lg font-extrabold">
              Student Project Management System
            </span>
          </div>
          <br />

          {/* nav */}
          <nav className=" text-xl space-y-2">
            <Link href="/students">
              <a
                className={`flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800 ${
                  router.pathname == `/students/${id}/?login=true`
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <HomeIcon /> หน้าแรก 
              </a>
            </Link>
            <Link href="/students/profile">
              <a className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
                <PersonIcon /> ข้อมูลผู้ใช้
              </a>
            </Link>
            <Link href="/students/search">
              <a className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
                <SearchIcon /> ค้นหาโครงงาน
              </a>
            </Link>
            <Link href="/students/document">
              <a className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
                <DescriptionIcon /> ไฟล์เอกสาร
              </a>
            </Link>

            <div className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
              <ExitToAppIcon /> ออกจากระบบ
            </div>
          </nav>
        </div>

        <div className=" flex flex-row h-full ">
          <div
            className={`text-xl font-medium p-5 p  space-y-6 bg-gray-50  border-r-2 border-gray-300  hidden  desktop:block`}
            style={{ flex: "0 250px" }}
          >
            {/* <Link href="/students">
              <a className=" block w-full rounded-full hover:bg-gray-200 p-3 ">
                <i className="bx bxs-home-circle text-red-500 mr-2"></i>
                หน้าแรก
              </a>
            </Link>
            <Link href="/students/profile">
              <a className=" block w-full rounded-full hover:bg-gray-200 p-3 ">
                <i className="bx bxs-user-account mr-2"></i>
                ข้อมูลผู้ใช้
              </a>
            </Link>

            <Link href="/students/search">
              <a className=" block w-full rounded-full hover:bg-gray-200 p-3 ">
                <i className="bx bx-search  mr-2"></i>
                ค้นหาโครงงาน
              </a>
            </Link>
            <Link href="/students/document">
              <a className=" block w-full rounded-full hover:bg-gray-200 p-3 ">
                <i className="bx bx-file  mr-2"></i>
                ไฟล์เอกสาร
              </a>
            </Link> */}

            <Link href={`/students/${id}`}>
              <a
                className={` flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800 ${
                  router.asPath === `/students/${id}` ? "bg-gray-200" : ""
                }`}
              >
                <HomeIcon /> หน้าแรก
              </a>
            </Link>

            <Link href={`/students/${id}/profile`}>
              <a
                className={` flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800 ${
                  router.asPath === `/students/${id}/profile`
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <PersonIcon /> ข้อมูลผู้ใช้
              </a>
            </Link>
            <Link href={`/students/${id}/search`}>
              <a
                className={` flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800 ${
                  router.asPath === `/students/${id}/search`
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <SearchIcon /> ค้นหาโครงงาน
              </a>
            </Link>
            <Link href={`/students/${id}/document`}>
              <a
                className={` flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800 ${
                  router.asPath === `/students/${id}/document`
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <DescriptionIcon /> ไฟล์เอกสาร
              </a>
            </Link>

            {/* <div className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
              <ExitToAppIcon /> ออกจากระบบ
            </div> */}
          </div>
          <div
            className="bg-gray-100 w-auto overflow-x-auto overflow-y-auto p-5  "
            style={{ flex: "1" }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

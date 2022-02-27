import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function adminLayout({ children, title, number }) {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.length == 0) router.push("/newlogin");
  }, []);

  const [edit, setEdit] = useState(false);

  var editContent = null;
  if (edit) {
    editContent = (
      <div
        className="absolute p-5 bg-white rounded-xl "
        style={{
          top: "50px",
          left: "-160px",
          width: "200px",
          height: "300px",
          boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
        }}
      >
        <div className=" flex items-center rounded-md hover:bg-gray-100 text-black cursor-pointer ">
          <i class="bx bx-exit text-3xl bg-gray-300 rounded-full px-1 mr-2"></i>
          ออกจากระบบ
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/logo.ico" />
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      <div className="h-screen w-screen  flex flex-col ">
        <div
          className="bg-white w-full flex items-center  justify-between px-5  border-gray-300 border-b-2"
          style={{
            height: "70px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
          }}
        >
          <div className="flex items-center space-x-5 ">
            <Image src="/logo.png" width={65} height={65} />

            <div className="uppercase text-xl font-bold">
              the student project management system
            </div>
          </div>
          <div className="flex space-x-5">
            <div className="bg-white p-2 rounded-full text-black cursor-pointer hover:bg-gray-200">
              <p className="font-bold">Admin</p>
            </div>
            <div
              onClick={() => setEdit(!edit)}
              className={
                !edit
                  ? "rounded-full bg-gray-200 w-10 h-10 items-center flex justify-center relative   "
                  : " rounded-full bg-red-200 w-10 h-10 items-center flex justify-center relative text-red-500"
              }
            >
              <i className="bx bx-menu-alt-right text-2xl"></i>
              {editContent}
            </div>
          </div>
        </div>

        <div className=" flex flex-row h-full ">
          <div
            className=" text-2xl font-medium p-5 p  space-y-6 bg-gray-50  border-r-2 border-gray-300 "
            style={{ flex: "0 325px" }}
          >
            <Link href="/admins">
              <a
                className={
                  number == 1
                    ? "  block w-full rounded-full hover:bg-gray-200 p-3  text-red-800 bg-gray-200 "
                    : "block w-full rounded-full hover:bg-gray-200 p-3 "
                }
              >
                <i className="bx bxs-home-circle text-red-500 mr-2"></i>
                หน้าแรก
              </a>
            </Link>
            <Link href="/admins/addteacher">
              <a
                className={
                  number == 2
                    ? "  block w-full rounded-full hover:bg-gray-200 p-3  text-red-800 text-xl bg-gray-200 "
                    : "block w-full rounded-full hover:bg-gray-200 p-3 text-xl"
                }
              >
                <i className="bx bxs-user-account mr-2"></i>
                เพิ่มหรือแก้ไขรายชื่ออาจารย์
              </a>
            </Link>
            <Link href="/admins/addstudent">
              <a
                className={
                  number == 3
                    ? "  block w-full rounded-full hover:bg-gray-200 p-3  text-red-800 bg-gray-200 "
                    : "block w-full rounded-full hover:bg-gray-200 p-3 "
                }
              >
               
                <i className='bx bxs-user-plus mr-2'></i>
                เพิ่มรายชื่อนักเรียน
              </a>
            </Link>
            {/* <Link href="/courseteachers/history">
              <a className=" block w-full rounded-full hover:bg-gray-200 p-3 ">
                <i className="bx bx-edit-alt mr-2"></i>
                ประวัตินักศึกษา
              </a>
            </Link>
            <Link href="/newsearch">
              <a className=" block w-full rounded-full hover:bg-gray-200 p-3 ">
                <i className="bx bx-search  mr-2"></i>
                ค้นหาโครงงาน
              </a>
            </Link>
            <Link href="/student">
              <a className=" block w-full rounded-full hover:bg-gray-200 p-3 ">
                <i className="bx bx-file  mr-2"></i>
                ไฟล์เอกสาร
              </a>
            </Link> */}
          </div>
          <div
            className="bg-gray-100 w-auto overflow-auto p-5 "
            style={{ flex: "1" }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

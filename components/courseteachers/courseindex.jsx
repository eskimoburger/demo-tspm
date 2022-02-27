import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
export default function CourseIndexComp() {
  const [length, setLength] = useState({
    all: 0,
    progress: 0,
    complete: 0,
  });
  useEffect(() => {
    setLength({
      all: 200,
      progress: 200,
      complete: 200,
    });
  }, []);

  return (
    <div
      className="  pt-4 pb-6 text-xl  bg-white rounded-2xl h-[90vh]  "
      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px" }}
    >
      <div className="text-3xl text-center my-8">
        Welcome, อาจารย์ประจำรายวิชา
      </div>

      <div
        className="flex gap-4 flex-wrap justify-center mx-auto   "
        style={{ width: "90%" }}
      >
        <div
          className="bg-blue-800  rounded-xl p-4 flex flex-col justify-between"
          style={{
            boxShadow:
              " rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
            width: "250px",
          }}
        >
          <p className="text-2xl text-right text-white ">จำนวนโครงงานทั้งหมด</p>
          <i
            style={{ fontSize: "50px" }}
            className="bx bxs-graduation text-right text-white"
          ></i>
          <p className="text-2xl my-4 text-white text-right">
            {" "}
            <CountUp end={length.all} duration={1}  />{" "}<span className="text-2xl">โครงงาน</span>{" "}
          </p>
        </div>

        <div
          className="bg-yellow-400  rounded-xl p-4 flex flex-col justify-between"
          style={{
            boxShadow:
              " rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
            width: "250px",
          }}
        >
          <p className="text-2xl text-right text-white ">
            โครงงานที่กำลังดำเนินการ
          </p>
          <div className="text-right">
            <i
              style={{ fontSize: "50px" }}
              className="bx bx-loader-alt bx-spin    text-white"
            ></i>
          </div>

          <p className="text-2xl my-4 text-white text-right">
            {" "}
            <CountUp end={length.progress} duration={1}  />{" "}<span className="text-2xl">โครงงาน</span>{" "}
          </p>
        </div>
        <div
          className="bg-green-500  rounded-xl p-4 flex flex-col justify-between"
          style={{
            boxShadow:
              " rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
            width: "250px",
          }}
        >
          <p className="text-2xl text-right text-white ">โครงงานที่ทำสำเร็จ</p>
          <br />
          <i
            style={{ fontSize: "50px" }}
            className="bx bxs-flag text-right text-white"
          ></i>
          <p className="text-2xl my-4 text-white text-right">
            {" "}
            <CountUp end={length.complete} duration={1}  />{" "}<span className="text-2xl">โครงงาน</span>{" "}
          </p>
        </div>
      </div>
    </div>
    //     <div className="text-4xl">
    //     ยินดีต้อนรับเข้าสู่หน้าอาจารย์ประจำรายวิชา
    //     <div className="flex gap-4 flex-wrap mt-10">
    //     <div className="bg-blue-800  rounded-xl p-4 flex flex-col justify-between" style={{width:"400px",height:"400px",boxShadow:" rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"}}>
    //         <p className="text-5xl text-right text-white ">จำนวนโครงงานทั้งหมด</p>
    //         <i style={{fontSize:"125px"}} className='bx bxs-graduation text-right text-white' ></i>
    //         <p className="text-8xl my-4 text-white text-right"><CountUp end={length.all} duration={1}  /> <span className="text-4xl">โครงงาน</span> </p>
    //     </div>
    //     <div className="bg-yellow-400  rounded-xl p-4 flex flex-col justify-between" style={{width:"400px",height:"400px",boxShadow:" rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"}}>
    //         <p  className="text-5xl text-right text-white ">โครงงานที่กำลังดำเนินการอยู่</p>
    //         <div className="text-right">
    //         <i   style={{fontSize:"125px"}} className='bx bx-loader-alt bx-spin    text-white' ></i>
    //         </div>
    //         <p  className="text-8xl text-white text-right my-4"><CountUp end={length.progress} duration={1}  /> <span className="text-4xl">โครงงาน</span> </p>
    //     </div>
    //     <div className="bg-green-500  rounded-xl p-4 flex flex-col justify-between" style={{width:"400px",height:"400px",boxShadow:" rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"}}>
    //         <p className="text-5xl text-right text-white ">โครงงานทำสำเร็จ</p>
    //         <br />

    //         <i className='bx bxs-flag-checkered text-right text-white' style={{fontSize:"125px"}} ></i>
    //         <p className="text-8xl  text-white text-right my-4"><CountUp end={length.complete} duration={1}  /> <span className="text-4xl">โครงงาน</span> </p>
    //     </div>

    //     </div>
    // </div>
  );
}

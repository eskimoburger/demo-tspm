import React, { useState, useEffect, createRef } from "react";

export default function state9(props) {
  const [fileName, setFilename] = useState("ยังไม่ได้เลือกไฟล์");
  const handleFile = (e) =>{
      if (e.target.files[0]) {
        setFilename(e.target.files[0].name);
      }
      else{
        setFilename("ยังไม่ได้เลือกไฟล์")
      }
    
  }
  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "380px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#b91c1c",
          opacity: "90%",
        }}
      >
        ประเมินรูปเล่มปริญญานิพนธ์
      </div>
      <div className="mx-16 my-2 text-xl space-y-1">
        <span className="font-bold">รหัสโครงงาน : </span> CPE
        {props.project.id.toString().padStart(2, 0)}
        <p>
          {" "}
          <span className="font-bold"> ชื่อโครงงาน :</span> {props.project.name}
        </p>
        <p className="font-bold">สมาชิกในกลุ่ม</p>
        {props.project.members.map((val, index) => {
          return (
            <p key={index} className="text-xl font-normal">
              {" "}
              {index + 1}. {val.name}
            </p>
          );
        })}
        <p className="font-bold">อัพโหลดไฟล์รูปเล่มปริญญานิพนธ์</p>
        <div className="my-4">
          <label className="cursor-pointer ">
            <span
              className="focus:outline-none text-white font-bold text-sm py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-400 hover:shadow-lg"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
              }}
            >
              Browse
            </span>
            <span className="ml-2 font-normal">{fileName}</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFile}
            />
          </label>
        </div>
        <div className="mt-2">
        <button
            //onClick={uploadFile}
            className={
              
                " bg-blue-600 w-full text-white font-bold mt-5 py-1 rounded-md "
             
            }
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
            }}
          >
            ส่งแบบขอสอบหัวข้อโครงงาน
          </button>
          </div>
      </div>
    </div>
  );
}

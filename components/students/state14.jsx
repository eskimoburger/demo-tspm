import React, { useState, useEffect } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import axios from "axios";



export default function state14(props) {
  useEffect(() => {
    setStatus(props.project.final_asses);
  }, []);
  const [status, setStatus] = useState(0);

  function backToStageProject() {
    axios
      .put(`https://demo-tspm-server.herokuapp.com/project/backToStage/${props.project.idP}`,{state:12})
      .then((response) => {
        console.log(response.data);
      });

    
  }

  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "300px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#1C3F60",
        }}
      >
        รอผลการประเมินรูปเล่ม
      </div>
        <div
        className="flex flex-col justify-center mx-auto px-4  pt-4 pb-6 text-xl mt-4 bg-white rounded-2xl  "
        style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",width:"50%" }}
      >
        <p className="text-center text-3xl my-2 text-gray-800"> ผลการประเมินรูปเล่มปริญญานิพนธ์</p>

        <div className=" m-auto text-gray-700 my-4" style={{width:"90%"}}>
        <p className="font-bold"> อาจารย์ประจำรายวิชา{" "} </p>

      
      <p> 
      <span className="font-bold">
        สรุปผลการประเมิน : {" "}
        {status == 1 ? (
          <span className="text-green-400"> ไม่ต้องทำการแก้ไขรายงาน </span>
        ) : status == 2 ? (
          <span className="text-red-500 ">
            สมควรแก้ไขรายงานตามคำแนะนำและส่งให้ตรวจซ้ำอีกครั้ง{" "}
          </span>
        ) : (
          <span className="text-yellow-400"> ยังไม่ได้รับการตรวจสอบ</span>
        )}
      </span></p>
      </div>
    
     {
      status == 2 ? <div className="flex justify-center gap-2">
           <button
        className="bg-blue-500 p-2 text-white  rounded-lg hover:bg-blue-700 "
        style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
      >
        ดูข้อเสนอแนะ
      </button>
    <button
      className="bg-yellow-500 p-2 text-white  rounded-lg hover:bg-yellow-600 "
      style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
      onClick={ () => {
        backToStageProject();
        props.function();
      }}
    >
      <ArrowForwardIcon /> ดำเนินการต่อ
    </button>
  </div>: 
      status == 1 ? <div className="flex justify-center gap-2">
        {/* <button
        className="bg-blue-500 p-2 text-white  rounded-lg hover:bg-blue-700 "
        style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
      >
        ดูข้อเสนอแนะ
      </button> */}
      <button
        className="bg-green-600 p-2 text-white  rounded-lg hover:bg-green-900 "
        style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
        onClick={ () => {
           
            props.functionNext();
          }}
      >
        <ArrowForwardIcon /> ดำเนินการต่อ
      </button>
    </div> : null}
     </div>

    
    </div>
  );
}

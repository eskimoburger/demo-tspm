import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
export default function state4(props) {
  const [request, setRequest] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = () => {
    axios
      .get(`http://localhost:3001/project/getcommittee/${props.project.idP}`)
      .then((res) => {
        console.log(res.data)
        setRequest(res.data);
        var teacherStatus = [];
        for (let i = 0; i < res.data.length; i++) {
          teacherStatus.push(res.data[i].status_state3);
        }

        var checkNext = teacherStatus.every(function (status) {
          return status == 1;
        });

        if (checkNext) {
          setShow(true);
        }

        // console.log(checkNext)
      });
  };

  // function nextStageProject() {
  //   axios
  //     .put(`http://192.168.1.7:3001/project/nextstage/${props.project.idP}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }

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
        หน้ารออาจารย์ตอบกลับ
      </div>
      <div
        className="flex flex-col justify-center mx-auto p-4  text-xl mt-4 bg-white rounded-2xl "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
          width: "70%",
        }}
      >
       <p className="text-center text-3xl my-2 text-gray-800"> ขอสอบหัวข้อโครงงงาน</p>
        <div className=" m-auto  text-gray-700" style={{ width: "90%" }}>
          {/* {props.project.idP} */}
          {request.map((val, index) => {
            var content = null;
            if (val.status_state3 == 0) {
              content = (
                <span className="text-yellow-500">
                  <i className="bx bx-time-five bx-spin  mx-2 text-2xl"></i>
                  ยังไม่ได้รับการตรวจสอบ
                </span>
              );
            } else if (val.status_state3 == 1) {
              content = (
                <span className="text-green-500">
                  <i className="bx bx-check-square  bx-burst mx-2 text-2xl"></i>
                  ได้รับการยืนยันเรียบร้อย
                </span>
              );
            } else if (val.status_state3 == 2) {
              content = (
                <span className="text-red-500">
                  <i className="bx bx-x bx-tada mx-2 text-2xl"></i>
                  ปฏิเสธหัวข้อโครงงาน
                </span>
              );
            }

            return (
              <div key={index} className=" mx-6 text-xl text-left mt-2">
                <p className="font-semibold   ">
                  {val.role} :{" "}
                  <span className="font-medium ">{val.committee_name} </span>{" "}
                </p>
                <p>
                  สถานะการยืนยัน {"-->"} {content}
                </p>
              </div>
            );
          })}

          <div className="flex justify-center mt-4">
            {show ? (
              <button
                className="bg-blue-800 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-500 transition duration-200 each-in-out "
                style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
                onClick={() => {
                  props.functionNext();
                }}
              >
                ดำเนินการต่อ
              </button>
            ) : (
              <p>กรุณารออาจารย์ตอบกลับ...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

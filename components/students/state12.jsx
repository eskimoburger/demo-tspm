import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
export default function state12(props) {
  useEffect(() => {
    getTeacher();
  }, []);
  const [teacher, setTeacher] = useState({
    name: "",
    id_teacher: 0,
    role: "",
  });
  const [status, setStatus] = useState(0);
  function getTeacher() {
    var teacher = [];
    for (let i = 0; i < props.project.committees.length; i++) {
      if (props.project.committees[i].role == "อาจารย์ที่ปรึกษา") {
        //console.log(props.project.committees[i]);
        teacher.push({
          name: props.project.committees[i].teacher_name,
          id_teacher: props.project.committees[i].id_teacher,
          role: props.project.committees[i].role,
        });
      }
    }
    //console.log(teacher[0]);
    setTeacher(teacher[0]);
    setStatus(props.project.final_status);
  }
  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "325px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#b91c1c",
          opacity: "90%",
        }}
      >
        รออาจารย์ตอบกลับ
      </div>

      <div
        className="flex flex-col justify-center mx-auto px-4  pt-4 pb-6 text-xl mt-4 bg-white rounded-2xl  "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
          width: "70%",
        }}
      >
        <p className="text-center text-3xl my-2 text-gray-800"> ผลการตอบรับบันทึกผลการสอบโครงงงาน</p>
        <div className=" m-auto text-gray-700 my-4" style={{ width: "90%" }}>
          <p>
            <span className="font-bold">อาจารย์ที่ปรึกษา : </span>
            {teacher.name}{" "}
          </p>
          <p>
            <span className="font-bold">สรุปผลการสอบโครงงาน : </span>
            {status == 1 ? (
              <span className="text-green-400"> ตรวจสอบเรียบร้อย</span>
            ) : (
              <span className="text-yellow-400"> ยังไม่ได้รับการตรวจสอบ</span>
            )}
          </p>
        </div>

        {status == 1 && (
          <div className="flex justify-center">
            <button
            onClick={() =>props.functionNext()}
              className="bg-green-600 p-2 text-white  rounded-lg hover:bg-green-900 "
              style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
            >
              <ArrowForwardIcon /> ดำเนินการต่อ
            </button>
          </div>
        ) }
      </div>
    </div>
  );
}

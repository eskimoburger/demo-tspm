import React, { useState, useEffect } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";

export default function AssesWaiting(props) {
  const [teacher, setTeacher] = useState({
    name: "",
    id_teacher: 0,
    role: "",
  });
  useEffect(() => {
    getTeacher();
    getAssesStatus();
  }, []);
  const [status, setStatus] = useState(false);

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
    console.log(teacher[0])
    setTeacher(teacher[0]);
  }

  function getAssesStatus() {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/asses/${props.project.id}`)
      .then((res) => {
        console.log(res.data[0]);
        if (res.data[0].asses_status===1) {
          setStatus(true)
        }
      });
  }

  return (
    <div>
      <div className="w-full bg-yellow-500 rounded-t-lg p-2 text-2xl">
        หน้ารอการตอบรับการประเมิน
      </div>
      <div className="flex justify-center text-xl my-3  ">
        <p>
          <span className="font-bold">อาจารย์ที่ปรึกษา : </span>
          {teacher.name}
          <span className="font-bold">
            สถานะ :{" "}
            {status ? (
              <span className="font-normal text-green-500">
                <DoneIcon /> ยืนยันแล้ว
              </span>
            ) : (
              <span className="font-normal text-yellow-500">
                ยังไม่ได้รับการยืนยัน
              </span>
            )}
          </span>
        </p>
      </div>
      {status ? (
        <div className="flex justify-center">
          <button
            className="bg-green-600 p-2 text-white  rounded-lg hover:bg-green-900 "
            style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
          >
            <ArrowForwardIcon /> ดำเนินการต่อ
          </button>
        </div>
      ) : (
        <div></div>
      )}

      <br />
    </div>
  );
}

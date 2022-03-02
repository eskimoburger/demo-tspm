import React, { useState, useEffect } from "react";
import axios from "axios";

export default function state8(props) {
  useEffect(() => {
    getTeachers();
  }, []);

  const [teachers, setTeachers] = useState([]);

  function getTeachers() {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/getrequest/${props.project.name_eng}`)
      .then((response) => {
        console.log(response.data.length);
        console.log(response.data);
        setTeachers(response.data);
      });
  }

  const [statusValue, setStatusValue] = useState([]);
  const [detail, setDetail] = useState([]);

  function getTeachers() {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/getrequest/${props.project.name_eng}`)
      .then((response) => {
        console.log(response.data);

        setTeachers(response.data);
        //setStatusValue(response.data)
      });
  }
  function SendExamResult() {
    var data = [];
    for (let i = 0; i < statusValue.length; i++) {
      for (let j = 0; j < detail.length; j++) {
        if (statusValue[i].id_teacher == detail[j].id_teacher) {
          //console.log("hello")
          data.push({
            id: statusValue[i].id_teacher,
            role: statusValue[i].role,
            name: statusValue[i].name,
            value: statusValue[i].value,
            detail: detail[j].detail,
          });
        }
      }
    }

    console.log(data);

    for (let k = 0; k < data.length; k++) {
      axios
        .post("https://demo-tspm-server.herokuapp.com/project/examresult", {
          exam_value: data[k].value,
          exam_details: data[k].detail,
          id_project: props.project.id,
          id_teacher: data[k].id,
        })
        .then((res) => {
          console.log(res.data);
        });

      axios
        .post("https://demo-tspm-server.herokuapp.com/notification", {
          description: `${props.project.name_eng} ได้ส่งแบบบันทึกผลการสอบหัวข้อโครงงานให้ ${data[k].name} ตรวจสอบ !! `,
          state_name: "บันทึกผลการสอบหัวข้อโครงงาน",
          id_teacher: data[k].id,
          project_name_eng: props.project.name_eng,
        })
        .then((res) => {
          console.log(res.data);
        });

      // console.log({
      //   id_teacher: data[k].id,
      //   exam_value: data[k].value,
      //   id_project: props.project.id,
      //   detail: data[k].detail,
      // });
    }
  }
  function showData() {
    var data = [];
    for (let i = 0; i < statusValue.length; i++) {
      for (let j = 0; j < detail.length; j++) {
        if (statusValue[i].id_teacher == detail[j].id_teacher) {
          //console.log("hello")
          data.push({
            id: statusValue[i].id_teacher,
            role: statusValue[i].role,
            name: statusValue[i].name,
            value: statusValue[i].value,
            detail: detail[j].detail,
          });
        }
      }
    }
    setShow(data);

    console.log(data);

    // for(let k = 0 ; k < data.length;k++){
    //   console.log(data[k])

    // }
  }
  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "400px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#59981A",
        }}
      >
        แบบบันทึกผลการสอบโครงงาน
      </div>
      <br />
      <div className="px-10">
        {teachers.map((teacher, index) => {
          return (
            <div key={index} className="">
              <p className=" text-xl font-bold">{teacher.role}</p>
              <div className="flex  ">
                <label
                  className="text-xl"
                  htmlFor={teacher.id_teacher}
                  style={{ width: "40%" }}
                >
                  {teacher.committee_name}{" "}
                </label>

                <select
                  id={teacher.id_teacher}
                  className=" p-2 rounded-lg bg-gray-100  "
                  style={{ height: "40px", width: "60%" }}
                  defaultValue=""
                  onChange={(event) => {
                    for (var i = 0; i < statusValue.length; i++) {
                      if (statusValue[i].id_teacher == teacher.id_teacher) {
                        statusValue.splice(i, 1);
                      }
                    }
                    setStatusValue([
                      ...statusValue,
                      {
                        id_teacher: teacher.id_teacher,
                        role: teacher.role,
                        name: teacher.committee_name,
                        value: event.target.value,
                      },
                    ]);
                  }}
                >
                  <option hidden>ความคิดเห็นผู้ประเมิน</option>

                  <optgroup label="ความคิดเห็นผู้ประเมิน">
                    <option>ผ่าน</option>
                    <option>ไม่ผ่าน</option>
                  </optgroup>

                  <optgroup label="ผ่านแบบมีเงื่อนไข">
                    <option>สอบใหม่</option>
                    <option>ไม่ต้องสอบใหม่</option>
                  </optgroup>
                </select>
              </div>
            </div>
          );
        })}

        <p className="text-2xl mb-5">สรุปข้อเสนอแนะ</p>

        {teachers.map((teacher, index) => {
          return (
            <div key={index}>
              <p className=" text-xl font-bold">{teacher.role}</p>
              <div className="flex ">
                <label
                  className="text-xl"
                  htmlFor={teacher.id_teacher}
                  style={{ width: "40%" }}
                >
                  {teacher.committee_name}{" "}
                </label>

                <textarea
                  className=" p-2 bg-gray-100 mb-5"
                  style={{ width: "60%", height: "100px" }}
                  type="text"
                  id={teacher.id_teacher}
                  placeholder={"สรุปข้อเสนอแนะ ของ " + teacher.committee_name}
                  onChange={(event) => {
                    for (var i = 0; i < detail.length; i++) {
                      if (detail[i].id_teacher == teacher.id_teacher) {
                        detail.splice(i, 1);
                      }
                    }
                    setDetail([
                      ...detail,
                      {
                        id_teacher: teacher.id_teacher,
                        detail: event.target.value,
                      },
                    ]);
                  }}
                />
              </div>
            </div>
          );
        })}

        <button
          className="w-full bg-blue-500 rounded-md py-1 text-white text-xl "
          style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
          onClick={() => console.log(teachers)}
        >
          {" "}
          ส่งแบบบันทึกผลการสอบหัวข้อโครงงาน
        </button>
      </div>
    </div>
  );
}

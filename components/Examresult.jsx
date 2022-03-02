import React, { useState, useEffect } from "react";
import style from "../styles/es.module.scss";
import axios from "axios";

export default function examresult(props) {
  useEffect(() => {
    getTeachers();
  }, []);

  const [user, setUser] = useState(props.user);
  const [teachers, setTeachers] = useState([]);
  const [statusValue, setStatusValue] = useState([]);

  function getTeachers() {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/getrequest/${props.projectName}`)
      .then((response) => {
        console.log(response.data);

        setTeachers(response.data);
        //setStatusValue(response.data)
      });
  }
  function SendData() {
    for (let i = 0; i < statusValue.length; i++) {
      var status = statusValue[i].value;
      var id = statusValue[i].id_teacher;
      console.log({ status: status, id: id });
    }
  }

  var c_result0 = "";
  var c_result1 = "";
  var c_result2 = "";
  var c_tComment = "";
  var c_c1Comment = "";
  var c_c2Comment = "";

  function send() {
    var state = props.state;
    var result0 = document.getElementById("result0").value;
    var result1 = document.getElementById("result1").value;
    var result2 = document.getElementById("result2").value;
    var tComment = document.getElementById("tComment").value;
    var c1Comment = document.getElementById("c1Comment").value;
    var c2Comment = document.getElementById("c2Comment").value;
    c_result0 = result0;
    c_result1 = result1;
    c_result2 = result2;
    c_tComment = tComment;
    c_c1Comment = c1Comment;
    c_c2Comment = c2Comment;

    //ส่งไปบันทึกdatabase
    //update state +1
    // state มี 2 state คือ 4(ผลสอบหัวข้อ) กับ 10(ผลสอบจบ)
    // c_result0 = ผลสอบ อ.ที่ปรึกษา
    // c_result1 = ผลสอบ อ.กรรมการ1
    // c_result2 = ผลสอบ อ.กรรมการ2
    // c_tComment = ความเห็น อ.ที่ปรึกษา
    // c_c1Comment = ความเห็น อ.กรรมการ1
    // c_c2Comment = ความเห็น อ.กรรมการ2
  }

  return (
    <div className={style.content}>
      <div className={style.title}>แบบบันทึกผลการสอบ</div>
      <div className={style.body}>
        <p className={style.header} style={{ fontSize: "22px" }}>
          ความคิดเห็นผู้ประเมิน
        </p>
        <p></p>
        {teachers.map((teacher, index) => {
          return (
            <>
              <p>{teacher.role}</p>
              {/* <p>{teacher.committee_name}</p> */}
              <select
                defaultValue=""
                id={teacher.id_teacher}
                key={index}
                
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
                      value: event.target.value,
                    },
                  ]);
                }}
              >
                <option disabled selected>
                  ความคิดเห็นผู้ประเมิน
                </option>
                <option>ผ่าน</option>
                <option>ไม่ผ่าน</option>
                <optgroup label="ผ่านแบบมีเงื่อนไข">
                  <option>สอบใหม่</option>
                  <option>ไม่ต้องสอบใหม่</option>
                </optgroup>
              </select>
            </>
          );
        })}
        {/* <p>อาจารย์ที่ปรึกษา</p>
        <select id="result0">
          <option disabled selected>
            ความคิดเห็นผู้ประเมิณ
          </option>
          <option>ผ่าน</option>
          <option>ไม่ผ่าน</option>
          <optgroup label="ผ่านแบบมีเงื่อนไข">
            <option>สอบใหม่</option>
            <option>ไม่ต้องสอบใหม่</option>
          </optgroup>
        </select>
        <p>อาจารย์กรรมการ1</p>
        <select id="result1">
          <option disabled selected>
            ความคิดเห็นผู้ประเมิณ
          </option>
          <option>ผ่าน</option>
          <option>ไม่ผ่าน</option>
          <optgroup label="ผ่านแบบมีเงื่อนไข">
            <option>สอบใหม่</option>
            <option>ไม่ต้องสอบใหม่</option>
          </optgroup>
        </select>
        <p>อาจารย์กรรมการ2</p>
        <select id="result2">
          <option disabled selected>
            ความคิดเห็นผู้ประเมิณ
          </option>
          <option>ผ่าน</option>
          <option>ไม่ผ่าน</option>
          <optgroup label="ผ่านแบบมีเงื่อนไข">
            <option>สอบใหม่</option>
            <option>ไม่ต้องสอบใหม่</option>
          </optgroup>
        </select> */}
        <p className={style.header} style={{ fontSize: "22px" }}>
          สรุปข้อเสนอแนะ
        </p>{" "}
        <p></p>
        {teachers.map((teacher) => {
          return (
            <>
              <p>{teacher.role}</p>
              <textarea id="tComment" className="" />
            </>
          );
        })}
        {/* <p>อาจารย์ที่ปรึกษา</p>
        <textarea id="tComment" />
        <p>กรรมการ1</p>
        <textarea id="c1Comment" />
        <p>กรรมการ2</p>
        <textarea id="c2Comment" /> */}
      </div>
      <button onClick={SendData}>Test </button>

      <button
        onClick={() => {
          console.log(statusValue);
        }}
        className={style.button}
      >
        ส่ง
      </button>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import styles from "../styles/newpropose.module.scss";

export const NewPropose = (props) => {
  useEffect(() => {
    fetchStudentList();
    fetchTeacherList();
  }, []);

  function fetchStudentList() {
    axios.get(`http://localhost:3001/allstudent/test`).then((response) => {
      console.log(response.data.studentList);
      setStudentList(response.data.studentList);
    });
  }
  function fetchTeacherList() {
    axios.get(`http://localhost:3001/allteacher`).then((response) => {
      console.log(response.data);
      setTeacherList(response.data);
    });
  }

  function handleSelectedStudent(e) {
    for (let i = 0; i < selectedStudent.length; i++) {
      if (JSON.stringify(selectedStudent[i]) == e.target.value) {
        console.log("รายชื่อสมาชิกซ้ำกรุณาเลือกใหม่");
      } else {
        setStudentValue(JSON.parse(e.target.value));
      }
    }
  }

  const [studentValue, setStudentValue] = useState("No Selected");
  const [teacherValue,setTeacherValue] = useState("No Select")
  const [role, setRole] = useState("");

  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState([
    {
      id: props.user.id,
      name: `${props.user.prefix_th} ${props.user.thname} ${props.user.thlastname}`,
    },
  ]);
  const [selectedTeacher, setSelectedTeacher] = useState([]);

  const [teachers, setTeachers] = React.useState([
    { teacherID: 1, name: "Hello" },
    { teacherID: 2, name: "World" },
  ]);

  const handleRemove = (selected) => {
    const newSelected = selectedStudent.filter((t) => t !== selected);
    setSelectedStudent(newSelected);
  };

  function setRoleTeacher(){
      if(teacherValue!="No Select"){
        const newObj = JSON.parse(teacherValue)
        if(role!=""){
          newObj["role"] = role
        }
        setSelectedTeacher([...selectedTeacher,newObj])
       
        console.log(newObj)
          
      }
      console.log(teacherValue)
      
  }

  return (
    <div>
      <div className="relative ">
        <div
          className="absolute bg-red-700 items-center flex rounded-md px-5 text-xl text-white font-bold "
          style={{ height: "50px", left: "-50px", top: "-20px" }}
        >
          แบบฟอร์มเสนอหัวข้อโครงงาน
        </div>
      </div>
      <br />
      <br />
      <div className="flex flex-col px-10  space-y-4">
          <button onClick={setRoleTeacher}>test</button>
        <div>
          <label htmlFor="project_th" className="text-xl ">
            ชื่อโครงงานภาษาไทย{" "}
          </label>
          <input
            className="  bg-gray-200 mt-4 rounded-md p-5"
            style={{ height: "30px", width: "100%" }}
            id="project_th"
            type="text"
            placeholder="ชื่อโครงงานภาษาไทย..."
          />
        </div>
        <div>
          <label htmlFor="project_en" className="text-xl ">
            ชื่อโครงงานภาษาอังกฤษ{" "}
          </label>
          <input
            className="  bg-gray-200 mt-4 rounded-md p-5"
            style={{ height: "30px", width: "100%" }}
            id="project_en"
            type="text"
            placeholder="ชื่อโครงงานภาษาอังกฤษ..."
          />
        </div>

        <div>
          <label htmlFor="detail" className="text-xl ">
            รายละเอียดโครงงานโดยย่อ{" "}
          </label>
          <textarea
            className="  bg-gray-100 mt-4 rounded-md p-1 "
            rows="5"
            id="detail"
            style={{ width: "100%" }}
            placeholder="รายละเอียดโครงงานโดยย่อ..."
          />
        </div>
        <div>
          <p className="text-xl">อาจารย์</p>
          {/* {teachers.map((teacher) => {
            return <div key={teacher.teacherID}>{teacher.name}</div>;
          })} */}

          <br />

          <div>
            <button
              className=" bg-yellow-500 text-white text-xl px-3 py-1 rounded-md"
              onClick={() => {
                alert("hello");
              }}
            >
              เลือกอาจารย์
            </button>
          </div>
          <br />
          <div>
              {selectedTeacher.map((teacher,index)=>{
                  return  <div className="text-xl flex flex-row " key={index}>
                  <div style={{ width: "50%" }}>
                    <span className="font-bold "> ชื่อ </span>
                    {teacher.name}
                  </div>
                  <div style={{ width: "25%" }}>
                    <span className="font-bold "> สถานะ </span>
                    {teacher.role}
                  </div>
                  <div>
                    <CloseIcon style={{ color: "red" }} /> <span>ลบ</span>
                  </div>
                </div>
              })}
          </div>

          <div>
            <select name="" id="" value={teacherValue} className="text-xl bg-gray-100" onChange={(e)=>setTeacherValue(e.target.value)}>
              <option hidden
              
              
              value="">กรุณาเลือกอาจารย์</option>
              {teacherList.map((teacher,index) => {
                return <option key={index} value={` {"name":"${teacher.name}","id":${teacher.id}}`}>{teacher.name}</option>;
              })}
            </select>
          </div>
          <br />
          <div className={styles.InputGroup}>
            <input
              id="advisor"
              type="radio"
              name="role"
              value="อาจารย์ที่ปรึกษา"
              checked={role === "อาจารย์ที่ปรึกษา"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="advisor">อาจารย์ที่ปรึกษา</label>

            <input
              id="co_advisor"
              type="radio"
              name="role"
              value="อาจารย์ที่ปรึกษาร่วม"
              checked={role === "อาจารย์ที่ปรึกษาร่วม"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="co_advisor">อาจารย์ที่ปรึกษาร่วม</label>

            <input
              id="committee"
              type="radio"
              name="role"
              value="กรรมการ"
              checked={role === "กรรมการ"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="committee">กรรมการ</label>
          </div>
          <button onClick={()=>{
          setTeacherValue("")
          setSelectedTeacher([...selectedTeacher,JSON.parse(teacherValue)])}
        
        }>Reset</button>

          <br />
          <div>teacher name = {teacherValue}  teacher Role = {role}</div>

          <p className="text-xl">สมาชิกในกลุ่ม</p>
          <br />
          {selectedStudent.map((student, index) => {
            if (index == 0) {
              return (
                <div key={index} className="text-xl flex flex-row ">
                  <div style={{ width: "20%" }}>
                    <span className="font-bold "> รหัสนิสิต </span>
                    {student.id}
                  </div>
                  <div style={{ width: "50%" }}>
                    <span className="font-bold "> ชื่อ </span>
                    {student.name}
                  </div>
                </div>
              );
            }
            return (
              <div className="text-xl flex flex-row " key={index}>
                <div style={{ width: "20%" }}>
                  <span className="font-bold "> รหัสนิสิต </span>
                  {student.id}
                </div>
                <div style={{ width: "50%" }}>
                  <span className="font-bold "> ชื่อ </span>
                  {student.name}
                </div>
                <div onClick={() => handleRemove(student)}>
                  <CloseIcon style={{ color: "red" }} /> <span>ลบ</span>
                </div>
              </div>
            );
          })}
          <div>
            <button
              className=" bg-yellow-500 text-white text-xl px-3 py-1 rounded-md"
              onClick={() => {
                alert("hello");
              }}
            >
              เลือกสมาชิก
            </button>
          </div>
          <div>
            {/* (e) => setStudentValue(JSON.parse(e.target.value)) */}
            <select
              defaultValue="No select"
              className="text-xl bg-gray-100"
              onChange={handleSelectedStudent}
            >
              <option hidden>กรุณาเลือกสมาชิกภายในกลุ่ม</option>
              {studentList.map((student, index) => {
                return (
                  <option
                    key={index}
                    value={`{"id":${student.id},"name":"${student.name}"}`}
                  >
                    {student.id} {student.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button
              className=" bg-green-500 text-white text-xl px-3 py-1 rounded-md"
              onClick={() => {
                console.log(studentValue);
                setStudentValue("No Selected");
                if (studentValue == "No Selected") {
                  console.log("hello");
                } else {
                  setSelectedStudent([...selectedStudent, studentValue]);
                }
              }}
            >
              เพิ่ม
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />

      <button onClick={() => console.log(selectedTeacher)}>Test</button>
    </div>
  );
};

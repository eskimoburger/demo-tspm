import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/admin.module.scss'


export default function homeadmin() {
  useEffect(() => {
    getDataStudent();
  }, []);
  const [students, setStudents] = useState([]);
  const getDataStudent = async () => {
    await axios
      .get("https://demo-tspm-server.herokuapp.com/students/get")
      .then((res) => {
        console.log(res.data);
        setStudents(res.data)
      })
      .catch((err) => {
        console.log(err.res);
      });
  };
  const sendMail = (email,password) =>{
      axios.post('https://demo-tspm-server.herokuapp.com/students/mail',{email:email,password:password}).then((res)=>{
          console.log(res.data)
          alert("Send Complete")
      })
  }
  return (
    <div>
      <p className="text-4xl">ยินดีต้อนรับเข้าสู่หน้า Admin</p>
      <br />
      <p className="text-xl">ตารางแสดงรายชื่อนิสิตประจำรายวิชา</p>
      <br />
      <div style={{ width: "1000px",height:"750px",overflowY:"scroll" }}>
        <div className={styles.table_student}>
          <table>
              <thead>
            <tr>
              <th>#</th>
              <th>รหัสนิสิต</th>
              <th>รายชื่อนิสิต</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
            </thead>
            <tbody>

            {students.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.student_id}</td>
                  <td>{student.prefix_th}{" "}{student.student_name_th}{" "}{student.student_lastname_th}</td>

                  <td style={{ textAlign: "center" }}>
                   <button className="bg-green-400 text-black p-2 mr-2" onClick={()=>{sendMail(student.student_email,student.student_name_eng+student.student_id)}}>
                      Send E-mail
                    </button>
                    <button className="bg-yellow-300 text-black p-2 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white p-2">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

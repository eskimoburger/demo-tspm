import React, { useState, useEffect } from "react";
import styles from "../../styles/admin.module.scss";
import axios from "axios";
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';




export default function adminindex() {
  useEffect(() => {
    getDataStudent();
  }, []);
  const [students, setStudents] = useState([]);
  const [loading,setLoading] = useState(false);
  const getDataStudent = async () => {
    await axios
      .get("https://demo-tspm-server.herokuapp.com/students/get")
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
        setLoading(true)
      })
      .catch((err) => {
        console.log(err.res);
        //setStudents([]);
        setLoading(false)
      });
  };
  const sendMail = (email, password) => {
    axios
      .post("https://demo-tspm-server.herokuapp.com/students/mail", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        alert("Send Complete");
      });
  };
  if(!loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      {/* <p className="text-4xl">ยินดีต้อนรับเข้าสู่หน้า Admin</p>
      <br />
      <p className="text-xl">ตารางแสดงรายชื่อนิสิตประจำรายวิชา</p>
      <br />
      <div style={{ width: "1000px", height: "750px", overflowY: "scroll" }}>
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
                    <td>
                      {student.prefix_th} {student.student_name_th}{" "}
                      {student.student_lastname_th}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <button
                        className="bg-green-400 text-black p-2 mr-2"
                        onClick={() => {
                          sendMail(
                            student.student_email,
                            student.student_name_eng + student.student_id
                          );
                        }}
                      >
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
      </div> */}

      <h1 className={styles.page_title}>ตารางแสดงรายชื่อนิสิตประจำรายวิชา</h1>
      <div class={styles.wrap}>
        <table class={styles.conversion_rate_table}>
          <thead>
            <tr class={styles.table__headers}>
              <th class={styles.header} scope="col">
                #
              </th>

              <th class={styles.header} scope="col">
                รหัสนิสิต
              </th>

              <th class={styles.header} scope="col">
                รายชื่อนิสิต
              </th>

              <th class={styles.header} scope="col">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
          {students.map((student, index) => {
                return (
                  <tr key={index} className={styles.table__row}>
                    <td className={styles.row__cell}>{index + 1}</td>
                    <td className={styles.row__cell}>{student.student_id}</td>
                    <td className={styles.row__cell} 
                    style={{ textAlign: "left",paddingLeft:"20px" }} 
                     >
                      {student.prefix_th} {student.student_name_th}{" "}
                      {student.student_lastname_th}
                    </td>

                    <td style={{ textAlign: "center" }} className={styles.row__cell}>
                      <div className=" flex flex-wrap justify-center gap-4">
                      <button
                        className="bg-green-400 text-black hover:text-white p-2 rounded-lg  "
                        onClick={() => {
                          sendMail(
                            student.student_email,
                            student.student_name_eng + student.student_id
                          );
                        }}
                      >
                        <SendIcon/> Send E-mail
                      </button>
                      <button className="bg-yellow-300 text-black p-2 rounded-lg">
                        <EditIcon/> Edit
                      </button>
                      <button className="bg-red-600 text-white p-2 rounded-lg">
                       <DeleteIcon/> Delete
                      </button>
                      </div>
                      
                    </td>
                  </tr>
                );
              })}
            {/* <tr class={styles.table__row}>
              <td className={styles.row__cell}>Facebook</td>

              <td className={styles.row__cell}>468</td>

              <td className={styles.row__cell}>142</td>

              <td className={styles.row__cell}>30.34%</td>
            </tr>

            <tr class={styles.table__row}>
              <td className={styles.row__cell}>Google</td>

              <td className={styles.row__cell}>327</td>

              <td className={styles.row__cell}>199</td>

              <td className={styles.row__cell}>60.85%</td>
            </tr>

            <tr class={styles.table__row}>
              <td className={styles.row__cell}>Instagram</td>

              <td className={styles.row__cell}>547</td>

              <td className={styles.row__cell}>89</td>

              <td className={styles.row__cell}>16.27%</td>
            </tr>

            <tr class={styles.table__row}>
              <td className={styles.row__cell}>Twitter</td>

              <td className={styles.row__cell}>149</td>

              <td className={styles.row__cell}>27</td>

              <td className={styles.row__cell}>18.12%</td>
            </tr>

            <tr class={styles.table__row}>
              <td className={styles.row__cell}>YouTube</td>

              <td className={styles.row__cell}>742</td>

              <td className={styles.row__cell}>278</td>

              <td className={styles.row__cell}>37.46%</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

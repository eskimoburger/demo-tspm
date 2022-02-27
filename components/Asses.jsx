import React, { useEffect, useState } from "react";
import styles from "../styles/waiting.module.scss";

import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Router from "next/router";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Asses(props) {
  useEffect(() => {
    getTeacher();
    setStudentForSend();
  }, []);
  const [open, setOpen] = useState(false);
  const [teacher, setTeacher] = useState({
    name: "",
    id_teacher: 0,
    role: "",
  });

  function setStudentForSend() {
    var student = [];
    for (let i = 0; i < props.project.members.length; i++) {
      student.push({
        id: props.project.members[i].id,
        name: props.project.members[i].name,
        student1: "",
        student2: "",
        student3: "",
        student4: "",
      });
    }
    console.log(student);
    setStudentSend(student);
  }

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
    //console.log(teacher)
    setTeacher(teacher[0]);
  }

  function send() {
    // axios
    //   .post("http://localhost:3001/notification/", {
    //     description: ` ${props.project.name_eng} ได้ส่งคำขอให้ ${teacher.name} อาจารย์ที่ปรึกษาประจำ${props.project.name} (${props.project.name_eng}) ประเมินความก้าวหน้าของโครงงาน`,
    //     state_name: "ขอประเมินความก้าวหน้าของโครงงาน",
    //     id_teacher: teacher.id_teacher,
    //     project_name_eng: props.project.name_eng,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     alert("ได้ป่าววะ notification");
    //   });

    //console.log(studentSend ,feedback)
    for(let i = 0; i < studentSend.length ;i++){
      axios.post("http://localhost:3001/project/asses_student",{
        id_student:studentSend[i].id,
        student1:studentSend[i].student1,
        student2:studentSend[i].student2,
        student3:studentSend[i].student3,
        student4:studentSend[i].student4,
        student_name:studentSend[i].name
      })
      //console.log(studentSend[i])
    }
    console.log(asses)
    // axios.post("http://localhost:3001/project/asses",{
    //   id : props.project.id,
    //   asses1 : asses.asses1,
    //   asses2 : asses.asses2,
    //   asses3 : asses.asses3,
    //   asses4 : asses.asses4,
    //   asses5 : asses.asses5,
    //   feedback:feedback
    // }).then(res=>{
    //   console.log(res.data) 
    // })

    //axios.post
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [asses, setAsses] = useState({
    asses1: "",
    asses2: "",
    asses3: "",
    asses4: "",
    asses5: "",
  });

  const [studentSend, setStudentSend] = useState([]);

  const updateFieldChanged = (e, index, student) => {
    const cloneData = [...studentSend];

    cloneData[index][student] = e.target.value;
    console.log(cloneData);
    console.log(student);
    setStudentSend(cloneData);
  };

  const [feedback, setFeedback] = useState("");

  var values = [
    "ทำได้ตามข้อกำหนด",
    "ทำได้บางส่วน",
    "ไม่เป็นไปตามข้อกำหนด",
    "ไม่สามารถประเมินได้",
  ];
  var values_student = ["A", "B", "C", "D", "F", "U"];

  return (
    <div className={styles.waiting}>
      <div id="head" className={styles.header}>
        ขอรับการประเมิน
      </div>
      <div className={styles.body}>
        <p className="text-red-500 text-2xl">
          ****กรุณารออาจารย์ประจำรายวิชาประกาศกำหนดการก่อนกดดำเนินการต่อ
        </p>

        <button
          onClick={() => {
            console.log(asses);
          }}
        >
          test
        </button>
        <button
          onClick={() => {
            console.log(studentSend);
          }}
        >
          test
        </button>
        <button
          onClick={() => {
            console.log(feedback);
          }}
        >
          test
        </button>

        <div className="text-2xl">
          <p className="ml-4">
            {" "}
            ส่งแบบฟอร์มประเมินโครงงานให้อาจารย์ที่ปรึกษา {teacher.name}
          </p>
        </div>
        <br />

        <p className="font-bold"> ผลการประเมินความก้าวหน้าของงาน</p>
        <br />

        <div className="flex flex-col space-y-4  ">
          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses1">1. การดำเนินงานตามวัตถุประสงค์</label>
            <select
              className="ml-5 bg-gray-100"
              id="asses1"
              value={asses.asses1}
              onChange={(e) => {
                setAsses({ ...asses, asses1: e.target.value });
              }}
            >
              <option hidden>ความคิดเห็นผู้ประเมิน</option>
              {values.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
          </div>

          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses2">2. การดำเนินงานตามแผนงาน/ปฏิทิน</label>
            <select
              className="ml-5 bg-gray-100"
              id="asses2"
              value={asses.asses2}
              onChange={(e) => {
                setAsses({ ...asses, asses2: e.target.value });
              }}
            >
              <option hidden>ความคิดเห็นผู้ประเมิน</option>
              {values.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
          </div>

          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses3">
              3. การแบ่งงานและการทำงานเป็นทีม (กรณีมีนิสิตมากกว่า 1 คน)
            </label>
            <select
              className="ml-5 bg-gray-100"
              id="asses3"
              value={asses.asses3}
              onChange={(e) => {
                setAsses({ ...asses, asses3: e.target.value });
              }}
            >
              <option hidden>ความคิดเห็นผู้ประเมิน</option>
              {values.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
          </div>

          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses4">4. ผลผลิต/ผลลัพธ์ของโครงงาน</label>
            <select
              className="ml-5 bg-gray-100"
              id="asses4"
              value={asses.asses4}
              onChange={(e) => {
                setAsses({ ...asses, asses4: e.target.value });
              }}
            >
              <option hidden>ความคิดเห็นผู้ประเมิน</option>
              {values.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
          </div>

          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses5">5. ความสมบูรณ์ของรายงาน</label>
            <select
              className="ml-5 bg-gray-100"
              id="asses5"
              value={asses.asses5}
              onChange={(e) => {
                setAsses({ ...asses, asses5: e.target.value });
              }}
            >
              <option hidden>ความคิดเห็นผู้ประเมิน</option>
              {values.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
          </div>
        </div>
        <br />
        <p className="font-bold">ผลการประเมินนิสิตที่ทำโครงงาน</p>

        <p className="text-red-600 my-5">
          ** ให้คะแนนเป็นเกรด A = ดีเยี่ยม, B = ดี, C = พอใช้ , D =
          ต้องปรับปรุง, F = ไม่ผ่าน, U = ไม่สามารถประเมินได้
        </p>
        <div className="flex justify-center">
          <div className={styles.table_notification} style={{ width: "95%" }}>
            <table>
              <thead>
                <tr>
                  <th>
                    <div>หัวข้อการประเมิน</div>
                    <div className="border-t-2 border-black">รายชื่อนิสิต</div>
                  </th>
                  <th>ความรู้ความเข้าใจเกี่ยวกับโครงงาน</th>
                  <th>ความรับผิดชอบและการมีส่วนร่วม</th>
                  <th>ความตรงต่อเวลา</th>
                  <th>การปฏิบัติตามจรรยาบรรณของนักวิจัย</th>
                </tr>
              </thead>
              <tbody>
                {props.project.members.map((member, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {member.id} {member.name}
                      </td>
                      <td>
                        {" "}
                        <select
                          className=" bg-gray-100 w-full "
                          id="student1"
                          value={member.student1}
                          onChange={(e) =>
                            updateFieldChanged(e, index, "student1")
                          }
                        >
                          <option hidden>คะแนน</option>
                          {values_student.map((value, index) => {
                            return <option key={index}>{value}</option>;
                          })}
                        </select>
                      </td>
                      <td>
                        {" "}
                        <select
                          className="bg-gray-100 w-full "
                          id="student2"
                          onChange={(e) =>
                            updateFieldChanged(e, index, "student2")
                          }
                        >
                          <option hidden>คะแนน</option>
                          {values_student.map((value, index) => {
                            return <option key={index}>{value}</option>;
                          })}
                        </select>
                      </td>
                      <td>
                        {" "}
                        <select
                          className=" bg-gray-100 w-full"
                          id="student3"
                          onChange={(e) =>
                            updateFieldChanged(e, index, "student3")
                          }
                        >
                          <option hidden>คะแนน</option>
                          {values_student.map((value, index) => {
                            return <option key={index}>{value}</option>;
                          })}
                        </select>
                      </td>
                      <td>
                        {" "}
                        <select
                          className=" bg-gray-100 w-full "
                          id="student4"
                          onChange={(e) =>
                            updateFieldChanged(e, index, "student4")
                          }
                        >
                          <option hidden>คะแนน</option>
                          {values_student.map((value, index) => {
                            return <option key={index}>{value}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <br />
        <p className="font-bold">ข้อเสนอแนะ</p>
        <div className="flex justify-center mt-2">
          <textarea
            //id="edit"
            className="bg-gray-100 p-2"
            placeholder="เพิ่มข้อเสนอแนะ"
            rows="4"
            cols="150"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.submit}>
          <button onClick={handleClickOpen}>ดำเนินการต่อ</button>
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          maxWidth={"xl"}
          fullWidth={true}
        >
          <DialogTitle style={{ backgroundColor: "gray" }}>
            {" "}
            <p className="text-2xl text-white">
              {" "}
              ยืนยันการส่งฟอร์มประเมินความก้าวหน้า
            </p>{" "}
          </DialogTitle>
          <DialogContent dividers>
            <div className="text-xl">
              <p className="font-bold">
                รหัสโครงงาน:{" "}
                <span>CPE{props.project.id.toString().padStart(2, 0)}</span>{" "}
              </p>
              <p className="font-bold">
                ชื่อโครงงาน :{" "}
                <span className="font-normal">{props.project.name}</span>
              </p>

              <p className="font-bold">สมาชิกในกลุ่ม</p>
              {props.project.members.map((member, index) => {
                return (
                  <div className="ml-4" key={index}>
                    {member.name}
                  </div>
                );
              })}
              <p className="font-bold">รายชื่ออาจารย์</p>
              {props.project.committees.map((committee, index) => {
                return (
                  <div key={index}>
                    <p className="ml-4">{committee.teacher_name}</p>
                    <p>สถานะ : {committee.role}</p>
                  </div>
                );
              })}
              <p className="font-bold">อาจารย์ที่ปรึกษา</p>
              {teacher.name}

              <p className="font-bold mt-5"> ผลการประเมินความก้าวหน้าของงาน</p>
              <br />
              <div className="flex flex-col space-y-4  ">
                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <p>1. การดำเนินงานตามวัตถุประสงค์</p>
                  <div>
                    {asses.asses1 == "" ? (
                      <div className="text-red-500">**ยังไม่ได้เลือก</div>
                    ) : (
                      asses.asses1
                    )}
                  </div>
                </div>

                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <p>2. การดำเนินงานตามแผนงาน/ปฏิทิน</p>
                  <div>
                    {asses.asses2 == "" ? (
                      <div className="text-red-500">**ยังไม่ได้เลือก</div>
                    ) : (
                      asses.asses2
                    )}
                  </div>
                </div>

                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <p>
                    3. การแบ่งงานและการทำงานเป็นทีม (กรณีมีนิสิตมากกว่า 1 คน)
                  </p>
                  <div>
                    {asses.asses3 == "" ? (
                      <div className="text-red-500">**ยังไม่ได้เลือก</div>
                    ) : (
                      asses.asses3
                    )}
                  </div>
                </div>

                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <p>4. ผลผลิต/ผลลัพธ์ของโครงงาน</p>
                  <div>
                    {asses.asses4 == "" ? (
                      <div className="text-red-500">**ยังไม่ได้เลือก</div>
                    ) : (
                      asses.asses4
                    )}
                  </div>
                </div>

                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <p>5. ความสมบูรณ์ของรายงาน</p>
                  <div>
                    {asses.asses5 == "" ? (
                      <div className="text-red-500">**ยังไม่ได้เลือก</div>
                    ) : (
                      asses.asses5
                    )}
                  </div>
                </div>
              </div>
              <br />
              <p className="font-bold">ผลการประเมินนิสิตที่ทำโครงงาน</p>
              <br />
              <div className="flex justify-center">
                <div
                  className={styles.table_notification}
                  style={{ width: "95%" }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <div>หัวข้อการประเมิน</div>
                          <div className="border-t-2 border-black">
                            รายชื่อนิสิต
                          </div>
                        </th>
                        <th>ความรู้ความเข้าใจเกี่ยวกับโครงงาน</th>
                        <th>ความรับผิดชอบและการมีส่วนร่วม</th>
                        <th>ความตรงต่อเวลา</th>
                        <th>การปฏิบัติตามจรรยาบรรณของนักวิจัย</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentSend.map((member, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {member.id} {member.name}
                            </td>
                            <td>
                              {member.student1 == "" ? (
                                <div className="text-red-500">
                                  **ยังไม่ได้ให้คะแนน
                                </div>
                              ) : (
                                member.student1
                              )}
                            </td>
                            <td>
                              {member.student2 == "" ? (
                                <div className="text-red-500">
                                  **ยังไม่ได้ให้คะแนน
                                </div>
                              ) : (
                                member.student2
                              )}
                            </td>
                            <td>
                              {member.student3 == "" ? (
                                <div className="text-red-500">
                                  **ยังไม่ได้ให้คะแนน
                                </div>
                              ) : (
                                member.student3
                              )}
                            </td>
                            <td>
                              {member.student4 == "" ? (
                                <div className="text-red-500">
                                  **ยังไม่ได้ให้คะแนน
                                </div>
                              ) : (
                                member.student4
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <br />

              {feedback == "" ? (
                ""
              ) : (
                <div>
                  <p className="font-bold"> ข้อเสนอแนะ</p>
                  <br />
                  <div className="flex justify-center">
                  <div className="bg-gray-100 p-2" style={{wordWrap:"break-word",width:"90%"}}> {feedback}</div>
                  </div>
                  
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              ยกเลิก
            </Button>
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => {
                // console.log(
                //   `${props.project.id}${props.project.name_eng},ขอประเมินความก้าวหน้าของโครงงาน,${props.project.name_eng} ได้ส่งคำขอให้ ${teacher.name} อาจารย์ที่ปรึกษาประจำโครงงาน ${props.project.name} (${props.project.name_eng}) ประเมินความก้าวหน้าของโครงงาน `
                // );
                send();
              }}
            >
              ตกลง
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

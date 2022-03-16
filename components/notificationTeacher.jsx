import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import styles from "../styles/notification.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function notificationTeacher(props) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = () => {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/notification/project/${props.teacher.id}`)
      .then((response) => {
        console.log(response.data.results);
        setNotifications(response.data.results);
      });
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getExamResults = (id) => {
    setOpen(true);
    axios
      .get("https://demo-tspm-server.herokuapp.com/project/examresult/" + id)
      .then((response) => {
        console.log(response.data);
        setExamResult(response.data);
      });
  };

  const [examResult, setExamResult] = useState([]);
  const [edit, setEdit] = useState("");

  const onChangeEdit = (e) => {
    setEdit(e.target.value);
  };

  const sendEdit = (teacherName, id) => {
    var text = "//แก้ไขโดย : " + teacherName + " //" + edit;
    axios
      .put(`https://demo-tspm-server.herokuapp.com/project/examresult/${id}`, { edit: text })
      .then((res) => {
        console.log(res.data);
      });

    //console.log("//แก้ไขโดย : " + teacherName + edit);
  };

  const acceptExam = () => {
    axios
      .put(`https://demo-tspm-server.herokuapp.com/project/updateresult/${props.teacher.id}`)
      .then((res) => {
        console.log(res.data);
      });

    //console.log("//แก้ไขโดย : " + teacherName + edit);
  };

  //getProjectMember
  const [members, setMembers] = useState([]);

  const getProjectMembers = (id) => {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/notification/getproject/` + id)
      .then((response) => {
        console.log(response.data);
        setMembers(response.data.members);
      });
  };

  const updateFieldChanged = (e, index, student) => {
    const cloneData = [...members];

    cloneData[index][student] = e.target.value;
    console.log(cloneData);
    console.log(student);
    //setStudentSend(cloneData);
  };

  //content Notification
  var notificationContent = null;

  if (notifications.length > 0) {
    notificationContent = (
      <div>
        {notifications.map((notification, index) => {
          var actionContent = null;
          if (notification.state_name == "บันทึกผลการสอบหัวข้อโครงงาน") {
            actionContent = (
              <div>
                <div
                  className="text-blue-600  cursor-pointer hover:text-indigo-500"
                  onClick={() => {
                    getExamResults(notification.id_project);
                    modalContent(
                      2,
                      "บันทึกผลการสอบโครงงาน",
                      notification.project_name_th,
                      notification.id_project
                    );
                  }}
                >
                  {" "}
                  ดูรายละเอียด
                </div>
                <div className="flex space-x-5 justify-center">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => {
                      acceptExam();
                    }}
                  >
                    ยอมรับ
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "yellow", color: "black" }}
                    onClick={() => {
                      getExamResults(notification.id_project);
                      modalContent(
                        1,
                        "แก้ไขบันทึกผลการสอบโครงงาน",
                        notification.project_name_th,
                        notification.id_project
                      );
                    }}
                  >
                    แก้ไข
                  </Button>
                </div>
              </div>
            );
          } else if (
            notification.state_name == "ขอประเมินความก้าวหน้าของโครงงาน"
          ) {
            actionContent = (
              <div className="flex space-x-5 justify-center">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "orange", color: "white" }}
                  onClick={() => {
                    modalContent(
                      3,
                      "ขอประเมินความก้าวหน้าของโครงงาน",
                      notification.project_name_th,
                      notification.id_project
                    ),
                      handleClickOpen();
                    getProjectMembers(2);
                  }}
                >
                  ยอมรับ
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "yellow", color: "black" }}
                >
                  แก้ไข
                </Button>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="border-black border-2 my-2 p-2 rounded-lg bg-white"
              style={{ width: "50%" }}
            >
              <div className="text-2xl">
                <div className="flex justify-between">
                  <p className="font-bold">{notification.state_name}</p>
                  <p>{notification.time}</p>
                </div>

                <p style={{ fontSize: "18px", marginLeft: "8px" }}>
                  {notification.description}
                </p>
                {actionContent}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    notificationContent = <div className=" text-2xl">No Notification</div>;
  }

  const [modal, setModal] = useState(null);
  const [headModal, setHeadModal] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectID, setProjectID] = useState(0);

  function modalContent(number, text, name, id) {
    setModal(number);
    setHeadModal(text);
    setProjectName(name);
    setProjectID(id);
  }

  //content Modal
  var contentModal = null;
  var actionModal = null;

  if (modal == 1) {
    contentModal = (
      <div className="text-xl">
        <p>
          <span className="font-bold">รหัสโครงงาน :</span> CPE
          {projectID.toString().padStart(2, 0)}
        </p>
        <p>
          <span className="font-bold">ชื่อโครงงาน : </span>
          {projectName}
        </p>
        {examResult.map((exam, index) => {
          if (exam.id_teacher == props.teacher.id) {
            return (
              <div key={index}>
                <div>
                  <span className="font-bold"> {exam.role}</span>:{" "}
                  {exam.committee_name}{" "}
                </div>
                <div>
                  <span className="font-bold">ความคิดเห็นผู้ประเมิน : </span>
                  {exam.exam_value}
                </div>
                <p>สรุปข้อเสนอแนะ</p>
                <div className="flex justify-center mt-2">
                  <div
                    style={{
                      width: "70%",
                      backgroundColor: "#d1d1d1",
                      wordWrap: "break-word",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    {exam.exam_details}
                  </div>
                </div>
                <div className=" flex justify-center  my-10">
                  <Image src="/down-arrow.png" width="50" height="50" />
                </div>
                <label htmlFor="edit">เพิ่มข้อเสนอแนะ : </label>
                <div className="flex justify-center mt-2">
                  <textarea
                    id="edit"
                    className="bg-gray-100 p-2"
                    placeholder="เพิ่มข้อเสนอแนะ"
                    rows="4"
                    cols="68"
                    value={edit}
                    onChange={onChangeEdit}
                  ></textarea>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
    actionModal = (
      <>
        <Button onClick={handleClose} variant="contained" color="secondary">
          ปิด
        </Button>
        <Button
          onClick={() => {
            sendEdit(props.teacher.name, props.teacher.id);
          }}
          variant="contained"
          color="primary"
        >
          ตกลง
        </Button>
      </>
    );
  } else if (modal == 2) {
    contentModal = (
      <div className="text-xl">
        <p>
          <span className="font-bold">รหัสโครงงาน :</span> CPE
          {projectID.toString().padStart(2, 0)}
        </p>
        <p>
          <span className="font-bold">ชื่อโครงงาน : </span>
          {projectName}
        </p>
        {examResult.map((exam, index) => {
          return (
            <div key={index} className="mb-3">
              <div>
                <span className="font-bold"> {exam.role}</span>:{" "}
                {exam.committee_name}{" "}
              </div>
              <div>
                <span className="font-bold">ความคิดเห็นผู้ประเมิน : </span>
                {exam.exam_value}
              </div>
              <p>สรุปข้อเสนอแนะ</p>
              <div className="flex justify-center mt-2">
                <div
                  style={{
                    width: "70%",
                    backgroundColor: "#d1d1d1",
                    wordWrap: "break-word",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {exam.exam_details}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );

    actionModal = (
      <>
        <Button onClick={handleClose} variant="contained" color="secondary">
          ปิด
        </Button>
        {/* <Button
          onClick={() => {
            sendEdit(props.teacher.name);
          }}
          variant="contained"
          color="primary"
        >
          ตกลง
        </Button> */}
      </>
    );
  }

  //prototype
  // else if (modal == 3) {
  //   contentModal = (
  //     <div>
  //       <p>Hello Modal3</p>
  //       <p>
  //         <span className="font-bold">รหัสโครงงาน :</span> CPE
  //         {projectID.toString().padStart(2, 0)}
  //       </p>
  //       <p>
  //         <span className="font-bold">ชื่อโครงงาน : </span>
  //         {projectName}
  //       </p>
  //     </div>
  //   );
  //   actionModal = <p>Action Modal3</p>;
  // }
  else if (modal == 3) {
    var values = [
      "ทำได้ตามข้อกำหนด",
      "ทำได้บางส่วน",
      "ไม่เป็นไปตามข้อกำหนด",
      "ไม่สามารถประเมินได้",
    ];
    var values_student = ["A", "B", "C", "D", "F", "U"];
    var summarize =["ไม่สมควรดำเนินโครงงานในหัวข้อนี้ต่อไป","สมควรให้ดำเนินโครงงานต่อไป แต่ควรมีการปรับแก้ตามข้อเสนอแนะ","สมควรให้ดำเนินโครงงานต่อไป"]

    contentModal = (
      <div>
        <p>
          <span className="font-bold">รหัสโครงงาน :</span> CPE
          {projectID.toString().padStart(2, 0)}
        </p>
        <p>
          <span className="font-bold">ชื่อโครงงาน : </span>
          {projectName}
        </p>

        <p className="font-bold"> ผลการประเมินความก้าวหน้าของงาน</p>

        <div className="flex flex-col space-y-4  ">
          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses1">1. การดำเนินงานตามวัตถุประสงค์</label>
            <select className="ml-5 bg-gray-100" id="asses1">
              <option hidden>ความคิดเห็นผู้ประเมิน</option>
              {values.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
          </div>

          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses2">2. การดำเนินงานตามแผนงาน/ปฏิทิน</label>
            <select className="ml-5 bg-gray-100" id="asses2">
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
            <select className="ml-5 bg-gray-100" id="asses3">
              <option hidden>ความคิดเห็นผู้ประเมิน</option>
              {values.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
          </div>

          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses4">4. ผลผลิต/ผลลัพธ์ของโครงงาน</label>
            <select className="ml-5 bg-gray-100" id="asses4">
              <option hidden>ความคิดเห็นผู้ประเมิน</option>
              {values.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
          </div>

          <div className=" flex justify-between " style={{ width: "85%" }}>
            <label htmlFor="asses5">5. ความสมบูรณ์ของรายงาน</label>
            <select className="ml-5 bg-gray-100" id="asses5">
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

        <div className={styles.table_notification}>
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
              {members.map((member, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {member.id} {member.name}
                    </td>
                    <td>
                      {" "}
                      <select className=" bg-gray-100 w-full " id="student1" onChange={(e)=>{updateFieldChanged(e,index,"student1")}}>
                        <option hidden>ความคิดเห็นผู้ประเมิน</option>
                        {values_student.map((value, index) => {
                          return <option key={index}>{value}</option>;
                        })}
                      </select>
                    </td>
                    <td>
                      {" "}
                      <select className="bg-gray-100 w-full " id="student1">
                        <option hidden>ความคิดเห็นผู้ประเมิน</option>
                        {values_student.map((value, index) => {
                          return <option key={index}>{value}</option>;
                        })}
                      </select>
                    </td>
                    <td>
                      {" "}
                      <select className=" bg-gray-100 w-full" id="student1" >
                        <option hidden>ความคิดเห็นผู้ประเมิน</option>
                        {values_student.map((value, index) => {
                          return <option key={index}>{value}</option>;
                        })}
                      </select>
                    </td>
                    <td>
                      {" "}
                      <select className=" bg-gray-100 w-full " id="student1">
                        <option hidden>ความคิดเห็นผู้ประเมิน</option>
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
        <br />
        <p className="font-bold">ข้อเสนอแนะ</p>
        <div className="flex justify-center mt-2">
          <textarea
            //id="edit"
            className="bg-gray-100 p-2"
            placeholder="เพิ่มข้อเสนอแนะ"
            rows="4"
            cols="200"
            //value={edit}
            //onChange={onChangeEdit}
          ></textarea>
        </div>
        <p className="font-bold">สรุป</p>
        <div className="ml-5">

        
        {summarize.map((sum,index)=>{
          return( 
            <div key={index} >
            <input
              id={index}
              type="radio"
              name="summarize"
              value={sum}
             
            />
            <label htmlFor={index}>{sum}</label>
            </div>


          )
        })}
        </div>
        

          
      </div>
    );
    actionModal = <p>Action Modal3</p>;
  }

  return (
    <>
      <div>
        <p className="text-4xl font-bold">การแจ้งเตือนทั้งหมด</p>
        <br />

        {notificationContent}
      </div>
      {/* modal */}

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"xl"}
        >
          <DialogTitle>
            {" "}
            <p className="text-2xl">{headModal}</p>{" "}
          </DialogTitle>
          <DialogContent dividers>{contentModal}</DialogContent>
          <DialogActions>{actionModal}</DialogActions>
        </Dialog>
      </div>
    </>
  );
}

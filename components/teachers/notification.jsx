import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherState1 from "./teacherstate1";
import TeacherState2 from "./teacherstate2";
import TeacherState3 from "./teacherstate3";
import TeacherState4 from "./teacherstate4";
import TeacherState5 from "./teacherstate5";
import TeacherState6 from "./teacherstate6";
import TeacherState7 from "./teacherstate7";

export default function notification(props) {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    if (props.teacher) {
      //getNotification();
      getNotificationNew();
      //console.log(props.teacher.id)
    }
  }, [props.teacher]);

  const getNotification = () => {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/notification/project/${props.teacher.id}`)
      .then((response) => {
        console.log(response.data.results);
        setNotifications(response.data.results);
      });
  };

  const getNotificationNew = () => {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/notification/projecttest/${props.teacher.id}`)
      .then((response) => {
        console.log(response.data);
        setNotifications(response.data);
      });
  };
  //
  var notificationContent = null;
  if (notifications) {
    if (notifications.length > 0) {
      notificationContent = (
        <div>
          {notifications.map((notification, index) => {
            var actionContent = null;
            if (notification.state_name == "เสนอหัวข้อโครงงาน") {
              actionContent = (
                <TeacherState1
                  projectName={notification.project_name_eng}
                  function={getNotificationNew}
                  id={notification.id_noti}
                  teacherID={props.teacher.id}
                  teacherName={props.teacher.name}
                  projectID={notification.id_project}
                />
              );
            } else if (
              notification.state_name == "บันทึกผลการสอบหัวข้อโครงงาน"
            ) {
              actionContent = (
                <TeacherState2
                  idNotification={notification.id_noti}
                  functionNew={getNotificationNew}
                  projectID={notification.id_project}
                  projectName={notifications.project_name_eng}
                  teacherID={props.teacher.id}
                  teacherName={props.teacher.name}
                />
              );
            } else if (
              notification.state_name == "ขอประเมินความก้าวหน้าของโครงงาน"
            ) {
              actionContent = (
                <TeacherState3
                  idNotification={notification.id_noti}
                  functionNew={getNotificationNew}
                  projectID={notification.id_project}
                  projectName={notification.project_name_th}
                  teacherID={props.teacher.id}
                  teacherName={props.teacher.name}
                />
              );
            } else if (notification.state_name == "ขอสอบหัวข้อโครงงาน") {
              actionContent = (
                <TeacherState4
                  id={notification.id_noti}
                  projectID={notification.id_project}
                  projectName={notification.project_name_th}
                  teacherID={props.teacher.id}
                  teacherName={props.teacher.name}
                  function={getNotificationNew}
                />
              );
            } else if (notification.state_name == "ขอสอบโครงงาน") {
              actionContent = (
                <TeacherState5
                  projectID={notification.id_project}
                  projectName={notification.project_name_eng}
                  id={notification.id_noti}
                  teacherID={props.teacher.id}
                  teacherName={props.teacher.name}
                  function={getNotificationNew}
                />
              );
            } else if (notification.state_name == "บันทึกผลการสอบโครงงาน") {
              actionContent = (
                <TeacherState6
                  idNotification={notification.id_noti}
                  functionNew={getNotificationNew}
                  projectID={notification.id_project}
                  projectName={notifications.project_name_eng}
                  teacherID={props.teacher.id}
                  teacherName={props.teacher.name}
                />
              );
            } else if (
              notification.state_name == "ยืนยันบันทึกผลการสอบโครงงาน"
            ) {
              actionContent = (
                <TeacherState7
                  idNotification={notification.id_noti}
                  functionNew={getNotificationNew}
                  projectID={notification.id_project}
                  projectName={notifications.project_name_eng}
                  teacherID={props.teacher.id}
                  teacherName={props.teacher.name}
                />
              );
            }

            return (
              <div
                key={index}
                className="border-gray-200 border-2 my-4 p-4 rounded-lg bg-white"
                style={{
                  width: "100%",
                  boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                <div className="flex justify-between">
                  <p className="font-bold mb-4" style={{ fontSize: "24px" }}>
                    {notification.state_name}
                  </p>
                  <p>{notification.time}</p>
                </div>

                <p
                  className="text-gray-700 my-1"
                  style={{ fontSize: "18px", textIndent: "20px" }}
                >
                  {notification.description}
                  {/* {notification.id_noti} */}
                </p>
                {actionContent}
              </div>
            );
          })}
        </div>
      );
    } else if (notifications.length == 0) {
      notificationContent = <div className=" text-2xl">No Notification</div>;
    }
  } else {
    notificationContent = <div className=" text-2xl">Loading ...</div>;
  }

  return (
    <div
      className="flex flex-col   px-4  pt-4 pb-6 text-xl  bg-white rounded-2xl  "
      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px" }}
    >
      <p className="text-4xl font-bold text-center my-4">การแจ้งเตือนทั้งหมด</p>
      <div className="m-auto ">{notificationContent}</div>
    </div>
  );
}

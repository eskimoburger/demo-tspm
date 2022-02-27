import React,{useState,useEffect} from "react";
import TestState from "./testState";
import axios from "axios"

export default function coursenotification() {

  useEffect(()=>{
    getNotificationCourseTeacher();
  },[])

  const [notifications, setNotifications] = useState([]);
  // var today = new Date();
  // var date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // var time =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // var dateTime = date + " " + time;
  var notificationContent = null;





  const getNotificationCourseTeacher = () =>{
    axios
      .get(`http://localhost:3001/notification/course-teacher`)
      .then((response) => {
        console.log(response.data);
        setNotifications(response.data);
      });
  }

  if (notifications.length > 0) {
    notificationContent = (
      <div>
        {notifications.map((notification, index) => {
          var actionContent = null;
          if (notification.state_name == "ประเมินรูปเล่มปริญญานิพนธ์") {
           actionContent = <TestState projectID={notification.id_project} projectName="Test01"  />
          }
          return (

            <div
            key={index}
            className="border-gray-200 border-2 my-4 p-4 rounded-lg bg-white"
            style={{ width: "100%",boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
              <div className="flex justify-between">
                <p className="font-bold mb-4" style={{fontSize:"24px"}}>{notification.state_name}</p>
                <p>{notification.time}</p>
              </div>

              <p className="text-gray-700 my-1"  style={{ fontSize: "18px",textIndent:"20px" }}>
                {notification.description}
                {/* {notification.id_noti} */}
                
               
              </p>
              {actionContent}
            </div>  
            // <div
            //   key={index}
            //   className="border-black border-2 my-2 p-2 rounded-lg bg-white"
            //   style={{ width: "50%" }}
            // >
            //   <div className="text-2xl">
            //     <div className="flex justify-between">
            //       <p className="font-bold">{notification.state_name}</p>
            //       <p>{notification.time}</p>
            //     </div>

            //     <p style={{ fontSize: "18px", marginLeft: "8px" }}>
            //       {notification.description}
            //     </p>
            //     {actionContent}
            //   </div>
            // </div>
          );
        })}
      </div>
    );
  } else {
    notificationContent = <div className=" text-2xl">No Notification</div>;
  }

  return (
    <div className="flex flex-col   px-4  pt-4 pb-6 text-xl  bg-white rounded-2xl  "
    style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px" }}>
      <p className="text-4xl font-bold text-center my-4">การแจ้งเตือนทั้งหมด</p>
      <div className="m-auto ">
      {notificationContent}

      </div>
      
    </div>
  );
}

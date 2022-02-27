import React, { useState, useEffect } from "react";
import TestState from "./testState";
import axios from "axios";
import FinalAsses from "./FinalAsses";
import FinalAssesEdit from "./FinalAssesEdit";

export default function FinalNotiComp({ Notifications, refreshData }) {
  let notificationContent = null;

  if (Notifications.length > 0) {
    notificationContent = (
      <div>
        {Notifications.map((notification, index) => {
          var actionContent = null;
          if (notification.state_name == "ประเมินรูปเล่มปริญญานิพนธ์") {
            actionContent = (
              <FinalAsses
                projectID={notification.id_project}
                refreshData={refreshData}
                notificationId={notification.id_noti}
              />
            );
          } else {
            actionContent = (
              <FinalAssesEdit
                projectID={notification.id_project}
                refreshData={refreshData}
                notificationId={notification.id_noti}
                notificationName={notification.state_name}
              />
            );
          }
          return (
            <div
              key={index}
              className="  my-4 p-4 rounded-lg bg-white"
              style={{
                width: "100%",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
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
              </p>
              {actionContent}
            </div>
          );
        })}
      </div>
    );
  } else {
    notificationContent = <div className=" text-2xl">No Notification</div>;
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

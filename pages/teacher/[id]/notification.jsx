import React from "react";
import TeacherLayout from "../../../components/teachers/FinalTeacherLayout";

const NotificationPage = () => {
  return <div>Notification</div>;
};
NotificationPage.getLayout = function getLayout(page) {
  return <TeacherLayout title={"Teacher | History"}>{page}</TeacherLayout>;
};

export default NotificationPage;

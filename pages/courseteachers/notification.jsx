import React from "react";
import CourseLayout from "../../components/courseteachers/courseLayout";
import CourseNotification from "../../components/courseteachers/coursenotification";

export default function notification() {


  return (
    <CourseLayout title="Notification">
        <CourseNotification/>
    </CourseLayout>
  );
}

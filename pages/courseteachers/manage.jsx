import React from "react";
import CourseLayout from "../../components/courseteachers/courseLayout";
import ManageProject from "../../components/courseteachers/manageproject";

export default function manage() {
  return (
    <CourseLayout title="Manage">
      <ManageProject/>
    </CourseLayout>
  );
}

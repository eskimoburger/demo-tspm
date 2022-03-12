import React from "react";
import AdminLayout from "../../components/admin/adminLayout";
import AddStudent from "../../components/admin/addstudent";
import FinalAdminLayout from "../../components/admin/FinalAdminLayout";

export default function AddStudentPage() {
  return <AddStudent />;
}

AddStudentPage.getLayout = function getLayout(page) {
  return (
    <FinalAdminLayout title={"Admin | Add Student"}>{page}</FinalAdminLayout>
    // <CourseLayout title={"Course | Home"}>{page}</CourseLayout>
  );
};

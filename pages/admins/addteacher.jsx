import React from "react";
import AdminLayout from "../../components/admin/adminLayout";
import AddTeacher from "../../components/admin/addteacher";
import FinalAdminLayout from "../../components/admin/FinalAdminLayout";

export default function AddTeacherPage() {
  return <AddTeacher />;
}

AddTeacherPage.getLayout = function getLayout(page) {
  return (
    <FinalAdminLayout title={"Admin | Add Teacher"}>{page}</FinalAdminLayout>
    // <CourseLayout title={"Course | Home"}>{page}</CourseLayout>
  );
};

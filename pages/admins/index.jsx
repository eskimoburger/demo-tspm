import React from "react";
//import AdminLayout from "../../components/admin/adminLayout";
import AdminIndex from "../../components/admin/adminindex";
import FinalAdminLayout from "../../components/admin/FinalAdminLayout";

export default function AdminIndexPage() {
  return (
    //    <AdminLayout title="Home" number={1}>
    <AdminIndex />

    //    </AdminLayout>
  );
}
AdminIndexPage.getLayout = function getLayout(page) {
  return (
    <FinalAdminLayout title={"Admin | Home"}>{page}</FinalAdminLayout>
    // <CourseLayout title={"Course | Home"}>{page}</CourseLayout>
  );
};

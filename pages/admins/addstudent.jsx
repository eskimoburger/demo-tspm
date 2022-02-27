import React from "react";
import AdminLayout from "../../components/admin/adminLayout";
import AddStudent from "../../components/admin/addstudent";

export default function addstudent() {
  return (
    <AdminLayout title="เพิ่มรายชื่อนักเรียน" number={3}>
      <AddStudent />
    </AdminLayout>
  );
}

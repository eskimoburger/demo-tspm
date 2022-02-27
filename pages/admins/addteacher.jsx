import React from 'react'
import AdminLayout from '../../components/admin/adminLayout'
import AddTeacher from '../../components/admin/addteacher'

export default function addteacher() {
    return (
       <AdminLayout title="เพิ่มหรือแก้ไขรายชื่ออาจารย์" number={2}>
           <AddTeacher/>
       </AdminLayout>
    )
}

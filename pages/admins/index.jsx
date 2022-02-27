import React from 'react'
import AdminLayout from '../../components/admin/adminLayout'
import AdminIndex from '../../components/admin/adminindex'

export default function index() {
    return (
       <AdminLayout title="Home" number={1}>
           <AdminIndex  />

       </AdminLayout>
    )
}

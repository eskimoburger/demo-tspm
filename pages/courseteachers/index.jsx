import React from 'react'
import CourseLayout from '../../components/courseteachers/courseLayout'
import CourseIndex from '../../components/courseteachers/courseindex'
export default function index() {
    return (
        <CourseLayout title="Home">
            <CourseIndex/>     
        </CourseLayout>
    )
}

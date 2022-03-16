import axios from "axios";
import React, { useState, useEffect } from "react";
import ManageProject from "../../components/teachers/manageproject";
import TeacherLayout from "../../components/teachers/teacherLayout";

export default function manage() {
  const getTeachers = () => {
    axios
      .get(
        `https://demo-tspm-server.herokuapp.com/allteacher/byuser/${sessionStorage.getItem(
          "useID"
        )}`
      )
      .then((response) => {
        console.log(response.data[0]);
        setTeacher(response.data[0]);

        //setName(`${response.data.studentList[0].prefix_th} ${response.data.studentList[0].thname} ${response.data.studentList[0].thlastname} `)
      })
      .catch((err) => {
        console.log(err.message);
        //setError(true)
      });
  };

  useEffect(() => {
    //setTeacherID(sessionStorage.getItem("useID"))
    getTeachers();
  }, []);
  const [teacher, setTeacher] = useState(null);
  return (
    <TeacherLayout title="Manage" number={3}>
      <ManageProject teacher={teacher} />
    </TeacherLayout>
  );
}

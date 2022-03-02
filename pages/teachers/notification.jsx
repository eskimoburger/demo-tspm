import React, { useEffect, useState, createContext } from "react";
import TeacherLayout from "../../components/teachers/teacherLayout";
import Notification from "../../components/teachers/notification";
import axios from "axios";

export default function notification() {
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
    <TeacherLayout title="Notification" number={2}>
      <Notification teacher={teacher} />
    </TeacherLayout>
  );
}

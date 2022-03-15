import React, { useState } from "react";
import ProfileComp from "../../../components/studentsfortest/ProfileComp";
import StudentLayoutForTest from "../../../components/students/studentLayoutForTest";

const ProfileTestPage = () => {
  const [studentDetail, setStudentDetail] = useState({
    student_id: 60369999,
    prefix_th: "นาย",
    student_name_th: "ทดสอบ",
    student_lastname_th: "ระบบ",
    prefix_eng: "MR.",
    student_name_eng: "Test",
    student_lastname_eng: "System",
    student_email: "tests60@nu.ac.th",
    phone: " - ",
    nickname:
      "pre",
    pic: "ยังไม่มีรายละเอียด",
  });
  const [imageProfile, setImageProfile] = useState("/noimage.jpg");
  return (
    <>
      {studentDetail && imageProfile && (
        <ProfileComp
          studentDetail={studentDetail}
          imgProfile={imageProfile}
          //functionGetUser={getUser}
        />
      )}
    </>
  );
};

export default ProfileTestPage;

ProfileTestPage.getLayout = function getLayout(page) {
  return (
    <StudentLayoutForTest title={"Student | Profile Test"}>
      {page}
    </StudentLayoutForTest>
  );
};

import React, { useEffect, useState } from "react";
import StudentLayout from "../../../components/students/studentLayout";
import ProfileComponent from "../../../components/profilecomponent";
import ProfileComp from "../../../components/students/ProfileComp";
import axios from "axios";
import { useRouter } from "next/router";
export default function Profile() {
  useEffect(() => {
    getUser();
  }, []);
  const router = useRouter();
  const [studentDetail, setStudentDetail] = useState(null);
  const [imageProfile, setImageProfile] = useState(null);
  const getUser = async () => {
    if (sessionStorage.length > 0) {
      await axios
        .get(
          `https://demo-tspm-server.herokuapp.com/allstudent/get/${sessionStorage.getItem(
            "useID"
          )}`
        )
        .then((res) => {
          console.log(res.data);
          const { dataStudent } = res.data;
          const { status, data } = res.data.picture;
          //console.log(data)
          setStudentDetail(dataStudent);
          //   setEditStudent(response.data.dataStudent);
          //   //setStudentDetail(null)
          //if (response.data.picture.status) {
          // setImageProfile(null);
          // setTimeout(() => setImageProfile(response.data.picture.data))
          if (status) {
            setImageProfile(data);
            //setTimeout(() => setImageProfile(data))
            //getUser();
          } else {
            setImageProfile("/noimage.jpg");
          }

          // setImageProfile(response.data)
        })
        .catch((err) => {
          //   console.log(err.message);
          //   setStudentDetail(null);
          //   setImageProfile("/noimage.jpg");
        });
    }else{
      router.push('/newlogin')
    }
  };
  return (
    <>
      {studentDetail && imageProfile && (
        <ProfileComp studentDetail={studentDetail} imgProfile={imageProfile} />
      )}
      <br />
        
      
      {/* <ProfileComponent /> */}
    </>
  );
}

Profile.getLayout = function getLayout(page){
  return (<StudentLayout title={"ข้อมูลส่วนตัว"}>{page}</StudentLayout>)
}


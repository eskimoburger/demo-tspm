import React, { useState, useEffect } from "react";
import FinalNotiComp from "../../components/courseteachers/FinalNotiComp";
import CourseLayout from "../../components/courseteachers/LayoutCourse";
import axios from "axios";

import { useRouter } from "next/router";
const NotificationPage = ({ Notifications }) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    setIsRefreshing(false);
  }, [Notifications]);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  return (
    <>
      {/* {JSON.stringify(Notifications)} */}
      <FinalNotiComp Notifications={Notifications} refreshData={refreshData} />
    </>
  );
};

NotificationPage.getLayout = function getLayout(page) {
  return <CourseLayout title={"Course | Notification"}>{page}</CourseLayout>;
};

export async function getServerSideProps() {
  try {
    const resData = await axios.get(
      "http://localhost:3001/notification/course-teacher"
    );
    const data = resData.data;
    //console.log(data);
    return {
      props: {
        Notifications: data,
      },
    };
  } catch (err) {
    return {
      props: {
        ErrorMessage: err.message,
        checkError: true,
      },
    };
  }

  //console.log(data);
}

export default NotificationPage;

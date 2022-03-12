import React from "react";
import TeacherLayout from "../../../components/teachers/FinalTeacherLayout";
import Notification from "../../../components/teachers/notification";

const NotificationPage = ({ teacher}) => {
  return (<Notification teacher={teacher} />);
};
NotificationPage.getLayout = function getLayout(page) {
  return <TeacherLayout title={"Teacher | History"}>{page}</TeacherLayout>;
};

export default NotificationPage;



export async function getServerSideProps({ query }) {
  const resData = await fetch(
    `http://localhost:3001/allteacher/byuser/${query.id}`
  );
  const data = await resData.json();
  // let queryStatus = false;
  // if (query.login === "true") {
  //   queryStatus = true;
  // }
  // console.log(query);
  return {
    props: {
      teacher: data[0],
      //loginStatus: queryStatus,
    },
  };
}

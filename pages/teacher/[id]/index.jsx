import React, { useState, useEffect } from "react";

import TeacherLayout from "../../../components/teachers/FinalTeacherLayout";
import { useRouter } from "next/router";

const TeacherPage = () => {
  const router = useRouter();
  const [notLogin, setNotLogin] = useState(false);
  useEffect(() => {
    const check = sessionStorage.getItem("login");
    console.log(check);
    if (check === null) {
      setNotLogin(true);
    } else {
      setNotLogin(false);
    }
  }, []);
  if (notLogin) {
    router.push("/newlogin");
    // return <div>Go to login page</div>
  }

  return <div>Hello</div>;
};

TeacherPage.getLayout = function getLayout(page) {
  return <TeacherLayout title={"Teacher | Home"}>{page}</TeacherLayout>;
};

export default TeacherPage;

export async function getServerSideProps({ query }) {
  const resData = await fetch(
    `https://demo-tspm-server.herokuapp.com/allteacher/byuser/${query.id}`
  );
  const data = await resData.json();
  // let queryStatus = false;
  // if (query.login === "true") {
  //   queryStatus = true;
  // }
 // console.log(query);
  return {
    props: {
      project: data,
      //loginStatus: queryStatus,
    },
  };
}

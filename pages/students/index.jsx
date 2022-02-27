import React, { useEffect, useState } from "react";
import StudentLayout from "../../components/students/studentLayout";
import StudentIndex from "../../components/students/studentIndex";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";

export default function StudentIndexPage() {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.replace("/newlogin");
    } else {
      setLogin(true);
    }
  }, []);
  const [login, setLogin] = useState();

  if (login) {
    return (
      <>
        <StudentIndex />
      </>
    );
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        {/* <p className="text-6xl font-bold ">Loading ...</p> */}
        <Loading />
      </div>
    );
  }
}


StudentIndexPage.getLayout = function getLayout(page){

  return (<StudentLayout title={"หน้าแรก"}>{page}</StudentLayout>)
}

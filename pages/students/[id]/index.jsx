import React,{useEffect,useState} from "react";
import StudentIndexId from "../../../components/students/StudentIndexId";
import StudentLayout from "../../../components/students/studentLayout";
import { useRouter } from "next/router";

const StudentPage = ({ project, loginStatus }) => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsRefreshing(false);
  }, [project]);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
    //alert(router.asPath);

  }

  // if (!loginStatus) {
  //   return (
  //     <>
  //       <h1 className="text-4xl text-center">กรุณาเข้าสู่ระบบ ...</h1>
  //       <br></br>
  //       <div className="flex justify-center">
  //         <button  type="button" onClick={()=>router.push("/newlogin")} className="px-6 py-2 text-xl rounded shadow bg-red-100 hover:bg-red-200 text-red-500">
  //           เข้าสู่ระบบ
  //         </button>
  //       </div>
        
  //     </>
  //   );
  // }
  return <>{<StudentIndexId project={project} refreshData={refreshData} />}
  {/* <p className="font-Nano text-4xl"> สวัสดี</p>
  <p className=" text-4xl"> สวัสดี</p> */}
  
  
  </>;
};
StudentPage.getLayout = function getLayout(page) {
 

  return <StudentLayout title={"หน้าแรก"}>{page}</StudentLayout>;
};
export async function getServerSideProps({ query }) {
  const resData = await fetch(
    `https://demo-tspm-server.herokuapp.com/final-project/project-detail/${query.id}`
  );
  const data = await resData.json();
  let queryStatus = false;
  if (query.login === "true") {
    queryStatus = true;
  }
  console.log(query);
  console.log(data)
  return {
    props: {
      project: data,
      loginStatus: queryStatus,
    },
  };
}

export default StudentPage;

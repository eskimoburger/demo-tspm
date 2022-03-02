import React,{useState,useEffect} from "react";
import { useRouter } from "next/router";
import CourseLayout from "../../components/courseteachers/LayoutCourse";
import ManageProjectTest from "../../components/courseteachers/ManageProjectTest";
import ManageProjectFinal from "../../components/courseteachers/ManageProjectFinal";
const ManagePage = ({ allProject }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    setIsRefreshing(false);
  }, [allProject]);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);

  }
  return (
    <>
      {allProject && (
        <>
          <ManageProjectFinal allP={allProject} refreshData={refreshData} />
          
        </>
      )}
    </>
  );
};

ManagePage.getLayout = function getLayout(page) {
  return <CourseLayout title={"Course | Manage"}>{page}</CourseLayout>;
};

export async function getServerSideProps() {
  try {
    const resData = await fetch(
      "https://demo-tspm-server.herokuapp.com/final-course/all-project"
    );
    const data = await resData.json();
    return {
      props: {
        allProject: data.results,
      },
    };
  } 
  catch (err) {
    console.log(err)
    // return {
    //   props: {
    //     ErrorMessage: err.message,
    //     checkError: true,
    //   },
    // };
  }

  //console.log(data);
}

export default ManagePage;

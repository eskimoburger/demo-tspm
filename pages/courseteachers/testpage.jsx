import React from "react";
import ManageProjectTest from "../../components/courseteachers/manageprojectTest";

const TestPage = ({ allProject, checkError, ErrorMessage }) => {
  if (checkError) {
    return <div>{ErrorMessage}</div>;
  }
  return <div>

      <ManageProjectTest allP={allProject} />


  </div>;
};

export async function getServerSideProps() {
  try {
    const resData = await fetch(
      "http://localhost:3001/final-course/all-project"
    );
    const data = await resData.json();
    return {
      props: {
        allProject: data.results,
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

export default TestPage;

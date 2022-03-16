import React from "react";
import ManageProjectTest from "../../components/courseteachers/ManageProjectTest";

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
      "https://demo-tspm-server.herokuapp.com/final-course/all-project"
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

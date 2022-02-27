import React from "react";
import CourseIndexComp from "../../components/courseteachers/courseindex";
import CourseLayout from "../../components/courseteachers/LayoutCourse";

const CourseIndexPage = () => {
  return (
    <>
      <CourseIndexComp />
    </>
  );
};
CourseIndexPage.getLayout = function getLayout(page) {
  return <CourseLayout title={"Course | Home"}>{page}</CourseLayout>;
};

export default CourseIndexPage;

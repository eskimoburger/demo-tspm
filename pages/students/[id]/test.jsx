import React, { useState, useEffect } from "react";
import StudentLayoutForTest from "../../../components/students/studentLayoutForTest";
import StudentIndexIdForTest from "../../../components/students/StudentIndexIdForTest";

const TestPage = () => {
  //useEffect(() => {}, []);

  return (
    <>
      <StudentIndexIdForTest/>
    </>
  );
};

export default TestPage;

TestPage.getLayout = function getLayout(page) {
  return (
    <StudentLayoutForTest title={"Student | Homepage Test"}>
      {page}
    </StudentLayoutForTest>
  );
};

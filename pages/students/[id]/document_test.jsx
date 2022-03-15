import React, { useEffect, useState } from "react";
import StudentLayout from "../../../components/students/studentLayout";
import StudentLayoutForTest from "../../../components/students/studentLayoutForTest";
import Document from "../../../components/Document";
export default function DocumentPage({ documents }) {
  return (
    <> 
      <Document documents={documents} />
    </>

    // <TestLayout title="ไฟล์เอกสาร">
    //   <Document documents={documents} />
    // </TestLayout>
  );
}

DocumentPage.getLayout = function getLayout(page){

  return (<StudentLayoutForTest title={"Student | Documents"}>{page}</StudentLayoutForTest>)
}



export async function getServerSideProps() {
  const resData = await fetch(`http://localhost:3001/files/document`);
  const data = await resData.json(); //console.log(data);
  return {
    props: {
      documents: data,
    },
  };
}

//old function

//const [documents, SetDocuments] = useState([]);

// const getDocument = () => {
//   axios.get("http://localhost:3001/files/document").then((response) => {
//     console.log(response.data);
//     SetDocuments(response.data);
//   });
// };
// useEffect(() => {
//   getDocument();
// }, []);

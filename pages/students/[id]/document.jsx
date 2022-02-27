import React, { useEffect, useState } from "react";
import StudentLayout from "../../../components/students/studentLayout";
import Document from "../../../components/Document";
import TestLayout from "../../../components/testLayout";
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

  return (<StudentLayout title={"ไฟล์เอกสาร"}>{page}</StudentLayout>)
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

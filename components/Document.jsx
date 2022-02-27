import React from "react";
//import Logo from '../public/doc.png'
import Image from 'next/image'

const Document = ({ documents }) => {
  const documentList = () => {
    return documents.map((doc, index) => {
      return (
        <div
          key={index}
          className="bg-gray-50 rounded-xl flex flex-col justify-center   items-center gap-2 flex-wrap   p-4 text-center"
          style={{
            width: "500px",

            boxShadow: "#00000038 1.95px 1.95px 1.95px",
          }}
        >
          <div
            className="bg-blue-100 rounded-full flex items-center justify-center "
            style={{ width: "90px", height: "90px" }}
          >
            <Image
              layout="fixed"
              src={"/docs.png"}
              alt=""
              width={80}
              height={80}
            />
          </div>

          <div>
            <p className="text-xl font-bold ">
              {" "}
              ชื่อไฟล์เอกสาร : <span className="font-light">{doc.name}</span>
            </p>
          </div>

          <a
            className=" block m-2  bg-blue-500 p-2 rounded-md text-white  hover:bg-blue-600"
            style={{ width: "120px" }}
            href={doc.show}
          >
            Download File
          </a>
        </div>
      );
    });
  };

  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5 mx-auto"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <p
        className="text-center"
        style={{ fontSize: "30px", marginBottom: "20px" }}
      >
        ไฟล์เอกสารที่เกี่ยวข้องทั้งหมด
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        {documentList()}
      </div>
    </div>
  );
};

export default Document;

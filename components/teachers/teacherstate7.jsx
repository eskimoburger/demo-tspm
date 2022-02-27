import React, { Fragment } from "react";

export default function teacherState7() {
  return (
    <Fragment>
      {" "}
      <div className="my-4">
        <button
          onClick={() => {
            handleClickOpen();
          }}
          className="focus:outline-none  bg-white hover:bg-blue-100 text-gray-800 font-semibold py-1 px-4 border  rounded shadow "
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            <i className="bx bxs-detail" style={{ fontSize: "24px" }}></i>
            แสดงรายละเอียด
          </span>
        </button>
      </div>
      <div className="flex space-x-5 justify-center">
        <button
          onClick={() => setAlert(true)}
          className="focus:outline-none  bg-green-100 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i
              className="bx bx-check-circle"
              style={{ fontSize: "24px" }}
            ></i>{" "}
            ตรวจสอบเรียบร้อย
          </span>
        </button>

        {/* <button
          onClick={validation}
          className="bg-green-300 px-8  py-2  text-lg shadow-sm font-medium tracking-wider   rounded-2xl hover:shadow-2xl hover:bg-green-400 focus:outline-none"
        >
          ตรวจสอบเรียบร้อย
        </button> */}
        {/* <button className="bg-red-500 px-8 py-2 text-lg shadow-sm font-medium tracking-wider   rounded-2xl hover:shadow-2xl hover:bg-red-600 focus:outline-none">
          ปฏิเสธ
        </button> */}
      </div>
    </Fragment>
  );
}

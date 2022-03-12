import React, { Fragment } from "react";
import axios from "axios";

export default function teacherState7({
  projectID,
  projectName,
  teacherID,
  teacherName,
  idNotification,
  functionNew,
}) {
  const validationState11 = async (idP) => {
    await axios
      .put("http://localhost:3001/final-teacher/validation-state11/" + idP, {
        idNotification: idNotification,
      })
      .then(async (res) => {
        await functionNew();

        console.log(res.data);
      })
      .catch((_) => {
        alert("Cannot validation ");
      });
  };

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
          onClick={() => {
            validationState11(projectID);
          }}
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
      </div>
    </Fragment>
  );
}

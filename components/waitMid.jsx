import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckIcon from '@material-ui/icons/Check';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function waitMid(props) {
  useEffect(() => {
    waitExam();
  }, []);

  function waitExam() {
    axios.get(`https://demo-tspm-server.herokuapp.com/project/examresult/1`).then((res) => {
      console.log(res.data);
      setWaits(res.data);
      var status = [];
      for (let i = 0; i < res.data.length; i++) {
        status.push(res.data[i].exam_status);
      }

      var checkStatus = status.every(function (status) {
        return status == 1;
      });
      setStatus(checkStatus);
    });
  }
  const [waits, setWaits] = useState([]);
  const [status, setStatus] = useState(false);

  var waitContent = null;

  if (status) {
    waitContent = (
      <div className="flex justify-center   ">
        <button className="bg-blue-500 px-3 py-2 text-white hover:bg-blue-300 hover:text-gray-900 rounded-md" style={{boxShadow:"rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"}}><NavigateNextIcon/>  ดำเนินการต่อ</button>
      </div>
    );
  } else {
    waitContent = (
      <div className="flex justify-center   ">
        <p>กรุณารอการตอบกลับจากอาจารย์</p>
      </div>
    );
  }

  return (
    <>
      <div className=" relative">
        <div
          className=" absolute bg-blue-800 text-xl  font-bold text-white py-4 px-5 rounded-lg shadow-lg"
          style={{ left: "-25px", top: "-20px",boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}
        >
          รอการตอบกลับของอาจารย์
        </div>
      </div>

      <div className="m-14 text-xl">
        <p>
          <span className="font-bold">รหัสโครงงาน :</span> CPE
          {props.project.id.toString().padStart(2, 0)}
        </p>
        <p>
          <span className="font-bold">ชื่อโครงงาน :</span> {props.project.name}
        </p>
        <div className="flex  flex-col  items-centers ">
          {waits.map((wait, index) => {
            return (
              <div key={index}>
                <p>
                  {" "}
                  <span className="font-bold">{wait.role}</span>{" "}
                  {wait.committee_name}
                  {" : "}
                  {wait.exam_status == 0 ? (
                    <span className="text-yellow-500"> รอการตอบกลับ</span>
                  ) : (
                    <span className="text-green-500"> <CheckIcon/> ยืนยันแล้ว</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        <br />
        {waitContent}
      </div>
    </>
  );
}

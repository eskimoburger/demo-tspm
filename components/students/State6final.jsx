import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

export default function state6({projectId,functionNext}) {
  const [request, setRequest] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = async () => {
    await axios
      .get(
        `https://demo-tspm-server.herokuapp.com/final-project/get-committees-state6/${projectId}`
      )
      .then((res) => {
        console.log(res.data);
        const { results, nextStage } = res.data;
        setRequest(results);
        setShow(nextStage);

        // console.log(checkNext)
      })
      .catch((_) => alert("Cannot load data state6!"));
  };
  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "300px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#1C3F60",
        }}
      >
        หน้ารออาจารย์ตอบกลับ
      </div>
      <div
        className="flex flex-col justify-center mx-auto p-4  text-xl mt-4 bg-white rounded-2xl "
        style={{
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          width: "90%",
        }}
      >

        <div className=" m-auto text-gray-700" style={{ width: "90%" }}>
          <h1 className="text-center font-bold  my-2 text-gray-800  text-2xl   stage2:text-3xl ">
            {" "}
            บันทึกผลการสอบ<br/>เสนอหัวข้อโครงงงาน
          </h1>
          <div className="flex flex-col p-2  items-center">
            {request.map((val, index) => {
              var content = null;
              if (val.status_state5 == 0) {
                content = (
                  <div className=" shadow-lg text-black  text-sm  stage2:text-lg font-bold bg-yellow-400 px-4 py-1 rounded-full">
                    ยังไม่ได้รับการตรวจสอบ
                  </div>
                );
              } else if (val.status_state5 == 1) {
                content = (
                  <div className="shadow-lg text-white  text-sm  stage2:text-lg font-bold bg-green-600 px-4 py-1 rounded-full">
                     ได้รับการตรวจสอบเรียบร้อย
                  </div>
                );
              } 
              

              return (
                <div
                  key={index}
                  className="stage2:text-left text-base  stage2:w-[500px] stage2:text-2xl   "
                >
                  <div>
                    <p className="font-semibold   ">
                      {val.role} :{" "}
                      <span
                        className="font-medium "
                        style={{ wordWrap: "break-word" }}
                      >
                        {val.committee_name}{" "}
                      </span>{" "}
                    </p>
                  </div>

                  <div className="flex item-center flex-wrap  my-2 ">
                    {" "}
                    <p>
                      สถานะการยืนยัน<span className="mx-2">&#8594;</span>
                    </p>{" "}
                    {content}
                  </div>
                </div>
              );
            })}
          </div>
          {/* {data.length === rejectTeacher.length ? <p>Pass</p>: <p>Error</p>} */}
        </div>
        <div className="flex justify-center mt-4">
          {show ? (
            <Button
              onClick={functionNext}
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<NavigateNextOutlinedIcon />}
              style={{ fontSize: 20 }}
            >
              ดำเนินการต่อ
            </Button>
          ) : (
            <p>กรุณารออาจารย์ตอบกลับ...</p>
          )}
        </div>
        
      </div>
    </div>
  );
}

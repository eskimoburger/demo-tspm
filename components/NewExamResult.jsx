import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/es.module.scss";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Router from "next/router";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NewExamResults(props) {
  useEffect(() => {
    getTeachers();
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [show, setShow] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const [teachers, setTeachers] = useState([]);
  const [statusValue, setStatusValue] = useState([]);
  const [detail, setDetail] = useState([]);

  function getTeachers() {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/getrequest/${props.project.name_eng}`)
      .then((response) => {
        console.log(response.data);

        setTeachers(response.data);
        //setStatusValue(response.data)
      });
  }
  function SendExamResult() {
    var data = [];
    for (let i = 0; i < statusValue.length; i++) {
      for (let j = 0; j < detail.length; j++) {
        if (statusValue[i].id_teacher == detail[j].id_teacher) {
          //console.log("hello")
          data.push({
            id: statusValue[i].id_teacher,
            role: statusValue[i].role,
            name: statusValue[i].name,
            value: statusValue[i].value,
            detail: detail[j].detail,
          });
        }
      }
    }

    console.log(data);

    for (let k = 0; k < data.length; k++) {
      axios
        .post("https://demo-tspm-server.herokuapp.com/project/examresult", {
          exam_value: data[k].value,
          exam_details: data[k].detail,
          id_project: props.project.id,
          id_teacher: data[k].id,
        })
        .then((res) => {
          console.log(res.data);
        });

      axios
        .post("https://demo-tspm-server.herokuapp.com/notification", {
          description: `${props.project.name_eng} ได้ส่งแบบบันทึกผลการสอบหัวข้อโครงงานให้ ${data[k].name} ตรวจสอบ !! `,
          state_name: "บันทึกผลการสอบหัวข้อโครงงาน",
          id_teacher: data[k].id,
          project_name_eng: props.project.name_eng ,
        })
        .then((res) => {
          console.log(res.data);
        });

      // console.log({
      //   id_teacher: data[k].id,
      //   exam_value: data[k].value,
      //   id_project: props.project.id,
      //   detail: data[k].detail,
      // });
    }
  }
  function showData() {
    var data = [];
    for (let i = 0; i < statusValue.length; i++) {
      for (let j = 0; j < detail.length; j++) {
        if (statusValue[i].id_teacher == detail[j].id_teacher) {
          //console.log("hello")
          data.push({
            id: statusValue[i].id_teacher,
            role: statusValue[i].role,
            name: statusValue[i].name,
            value: statusValue[i].value,
            detail: detail[j].detail,
          });
        }
      }
    }
    setShow(data);

    console.log(data);

    // for(let k = 0 ; k < data.length;k++){
    //   console.log(data[k])

    // }
  }

  return (
    <>
      <div className=" relative">
        <div
          className=" absolute bg-green-800 text-xl  font-bold text-white py-4 px-5 rounded-lg shadow-lg"
          style={{ left: "-25px", top: "-20px" }}
        >
          แบบบันทึกผลการสอบหัวข้อโครงงาน
        </div>
      </div>
      <div className=" pl-8">
        <div className=" mt-14 text-3xl mb-5 ">ความคิดเห็นผู้ประเมิน</div>
        {teachers.map((teacher, index) => {
          return (
            <div key={index} className="">
              <p className=" text-2xl">{teacher.role}</p>
              <div className="flex  ">
                <label
                  className="text-xl"
                  htmlFor={teacher.id_teacher}
                  style={{ width: "40%" }}
                >
                  {teacher.committee_name}{" "}
                </label>

                <select
                  id={teacher.id_teacher}
                  className=" p-2 rounded-lg bg-gray-100  "
                  style={{ height: "40px", width: "50%" }}
                  defaultValue=""
                  onChange={(event) => {
                    for (var i = 0; i < statusValue.length; i++) {
                      if (statusValue[i].id_teacher == teacher.id_teacher) {
                        statusValue.splice(i, 1);
                      }
                    }
                    setStatusValue([
                      ...statusValue,
                      {
                        id_teacher: teacher.id_teacher,
                        role: teacher.role,
                        name: teacher.committee_name,
                        value: event.target.value,
                      },
                    ]);
                  }}
                >
                  <option hidden>ความคิดเห็นผู้ประเมิน</option>

                  <optgroup label="ความคิดเห็นผู้ประเมิน">
                    <option>ผ่าน</option>
                    <option>ไม่ผ่าน</option>
                  </optgroup>

                  <optgroup label="ผ่านแบบมีเงื่อนไข">
                    <option>สอบใหม่</option>
                    <option>ไม่ต้องสอบใหม่</option>
                  </optgroup>
                </select>
              </div>
            </div>
          );
        })}

        <p className="text-3xl mb-5">สรุปข้อเสนอแนะ</p>

        {teachers.map((teacher, index) => {
          return (
            <div key={index}>
              <p className=" text-2xl">{teacher.role}</p>
              <div className="flex ">
                <label
                  className="text-xl"
                  htmlFor={teacher.id_teacher}
                  style={{ width: "40%" }}
                >
                  {teacher.committee_name}{" "}
                </label>

                <textarea
                  className=" p-2 bg-gray-100 mb-5"
                  style={{ width: "50%", height: "100px" }}
                  type="text"
                  id={teacher.id_teacher}
                  placeholder={"สรุปข้อเสนอแนะ ของ " + teacher.committee_name}
                  onChange={(event) => {
                    for (var i = 0; i < detail.length; i++) {
                      if (detail[i].id_teacher == teacher.id_teacher) {
                        detail.splice(i, 1);
                      }
                    }
                    setDetail([
                      ...detail,
                      {
                        id_teacher: teacher.id_teacher,
                        detail: event.target.value,
                      },
                    ]);
                  }}
                />
              </div>
            </div>
          );
        })}

        <button
          onClick={() => {
            //console.log(detail);
            SendExamResult();
          }}
        >
          5555
        </button>
        <div className=" flex justify-center   items-center mb-5">
          <button
            style={{ width: "50%" }}
            className={style.button}
            onClick={() => {
              handleClickOpen(), showData();
            }}
          >
            ส่ง
          </button>
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle>
            {" "}
            <p className="text-2xl"> ยืนยันบันทึกผลการสอบ</p>{" "}
          </DialogTitle>
          <DialogContent dividers>
            {show.map((showData, index) => {
              return (
                <div key={index}>
                  <p className="text-2xl ">
                    <span className="font-bold">{showData.role}</span>{" "}
                    {showData.name}
                  </p>
                  <p className="text-xl font-semibold">
                    ความคิดเห็นผู้ประเมิน : {showData.value}
                  </p>
                  <p>ข้อเสนอแนะ</p>

                  <div className="flex justify-center">
                    <div
                      style={{
                        width: "500px",
                        height: "200px",
                        border: "1px solid #d1d1d1",
                        wordWrap: "break-word",
                        overflowY: "auto",
                      }}
                    >
                      <p className="p-2">{showData.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              ยกเลิก
            </Button>
            <Button
              form="update-id"
              type="submit"
              style={{ backgroundColor: "green", color: "white" }}
            >
              ตกลง
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

//export default NewExamResults;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function state11(props) {
  useEffect(() => {
    getTeachers();
  }, []);


  

  const [teachers, setTeachers] = useState([]);
  const [validation ,setValidation] = useState([])
  const [check,setCheck] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  function getTeachers() {
    axios
      .get(`http://localhost:3001/project/getrequest/${props.project.name_eng}`)
      .then((response) => {
        console.log(response.data.length);
        console.log(response.data);
        setTeachers(response.data);
      });
  }

  const [statusValue, setStatusValue] = useState([]);
  const [detail, setDetail] = useState([]);

  function getTeachers() {
    axios
      .get(`http://localhost:3001/project/getrequest/${props.project.name_eng}`)
      .then((response) => {
        console.log(response.data);

        setTeachers(response.data);
        //setStatusValue(response.data)
      });
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
    setValidation(data);

    console.log(data);

  }
  function  NewSendFinalExamResults () {
    for (let k = 0; k < validation.length; k++) {
      axios
        .post("http://localhost:3001/project/finalexamresult", {
          exam_value: validation[k].value,
          exam_details: validation[k].detail,
          id_project: props.project.idP,
          id_teacher: validation[k].id,
        })
        .then((res) => {
          console.log(res.data);
        });
        axios
        .post("http://localhost:3001/notification/id", {
          description: `${props.project.name_eng} ได้ส่งแบบบันทึกผลการสอบโครงงานให้ ${validation[k].name} ตรวจสอบ !! `,
          state_name: "บันทึกผลการสอบโครงงาน",
          id_teacher: validation[k].id,
          idProject:props.project.idP
        })
        .then((res) => {
          console.log(res.data);
        });
      }

  }


  function nextStageProject() {
    axios
      .put(`http://192.168.1.7:3001/project/nextstage/${props.project.idP}`)
      .then((response) => {
        console.log(response.data);
      });

    
  }
  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "450px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#59981A",
        }}
      >
        แบบบันทึกผลการสอบโครงงาน
      </div>
      <br />
      <div className="px-10">
        {teachers.map((teacher, index) => {
          return (
            <div key={index} className="">
              <p className=" text-xl font-bold">{teacher.role}</p>
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
                  style={{ height: "40px", width: "60%" }}
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

        <p className="text-2xl mb-5">สรุปข้อเสนอแนะ</p>

        {teachers.map((teacher, index) => {
          return (
            <div key={index}>
              <p className=" text-xl font-bold">{teacher.role}</p>
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
                  style={{ width: "60%", height: "100px" }}
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

        {teachers.length === statusValue.length && teachers.length ===  detail.length   ?  <button
          className="w-full bg-blue-500 rounded-md py-1 text-white text-xl "
          style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
          onClick={async() => {await showData()
          
          await handleClickOpen()}}
        >
          {" "}
          ส่งแบบบันทึกผลการโครงงาน
        </button> : <div onClick={()=>console.log(validation)}> test</div>}
      </div>


      <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          //onClose={handleClose}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle>
            {" "}
            <p className="text-2xl"> ยืนยันบันทึกผลการสอบหัวข้อโครงงาน</p>{" "}
          </DialogTitle>
          <DialogContent dividers>
            {validation.map((showData, index) => {
              return (
                <div key={index}>
                  <p className="text-xl ">
                    <span className="font-bold">{showData.role}</span>{" "}
                    {showData.name}
                  </p>
                  <p className="text-xl font-semibold">
                    ความคิดเห็นผู้ประเมิน : {showData.value}
                  </p>
                  <p className="text-xl">ข้อเสนอแนะ</p>

                  <div className="flex justify-center">
                    <div
                      style={{
                        width: "600px",
                        height: "200px",
                        border: "1px solid #d1d1d1",
                        wordWrap: "break-word",
                        overflowY: "auto",
                      }}
                    >
                      <p className="text-xl px-2">{showData.detail}</p>
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
              onClick={async()=>  {await NewSendFinalExamResults()

              await nextStageProject()
              await props.function()
              }}
              style={{ backgroundColor: "green", color: "white" }}
            >
              ตกลง
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}

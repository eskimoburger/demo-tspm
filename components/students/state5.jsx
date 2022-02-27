import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function state4(props) {
  useEffect(() => {
    //getTeachers();
    getTeacherByIdProject(props.project.idP);
  }, []);

  const getTeacherByIdProject = async (id) => {
    await axios
      .get(`http://localhost:3001/final-project/get-teacher-state5/${id}`)
      .then((res) => {
        const { results } = res.data;
        // console.log(response.data.results.length);
        // console.log(response.data);
        setTeachers(results);
      })
      .catch((_) => {
        alert("Cannot load state5!");
      });
  };

  const [teachers, setTeachers] = useState([]);
  // const [validation, setValidation] = useState([]);
  // const [check, setCheck] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateFieldChanged = (index) => (e) => {
    //console.log("index: " + index);
    //console.log("property name: " + e.target.value);
    let newArr = [...teachers];
    // copying the old datas array
    newArr[index].exam_value = e.target.value;
    // replace e.target.value with whatever you want to change it to

    setTeachers(newArr); // ??
  };

  const updateFieldChangedDetail = (index) => (e) => {
    // console.log("index: " + index);
    // console.log("property name: " + e.target.value);
    let newArr = [...teachers];
    // copying the old datas array
    newArr[index].exam_detail = e.target.value;
    // replace e.target.value with whatever you want to change it to

    setTeachers(newArr); // ??
  };

  const sendMidExamResult = () => {
    axios.post(
      `http://localhost:3001/final-project/results-state5/${props.project.idP}`,
      {
        teachers: teachers,
        project_eng: props.project.name_eng,
      }
    );
  };

  function nextStageProject() {
    axios
      .put(`http://localhost:3001/project/nextstage/${props.project.idP}`)
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
        แบบบันทึกผลการสอบหัวข้อโครงงาน
      </div>
      <button
        onClick={() => {
          sendMidExamResult();
        }}
      >
        TEST DATA
      </button>

      <div
        className="my-4 mx-auto py-4 px-6 rounded-xl"
        style={{
          width: "90%",
          fontSize: "18px",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
        }}
      >
        <p style={{ fontSize: "22px" }}> ผลการสอบและสรุปข้อเสนอแนะ</p>

        {teachers.map((teacher, index) => {
          return (
            <div key={index} className="mx-auto" style={{ fontSize: "18px" }}>
              <p className=" font-bold">{teacher.role}</p>
              <div className="flex justify-between gap-2  flex-wrap ">
                <label
                  className=""
                  htmlFor={teacher.id_teacher}
                  style={{ fontSize: "16px" }}
                >
                  {teacher.committee_name}{" "}
                </label>

                <div style={{ width: "180px" }}>
                  <select
                    id={teacher.id_teacher}
                    className=" p-1 rounded-lg bg-gray-100 w-full  "
                    style={{ fontSize: "14px" }}
                    value={teacher.exam_value}
                    //defaultValue=""
                    onChange={updateFieldChanged(index)}
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

              <div
                className=" mx-auto my-4  "
                style={{ width: "60%", height: "120px", fontSize: "16px" }}
              >
                <textarea
                  className=" p-2 bg-gray-100 mb-5 w-full h-full rounded-xl"
                  //style={{ width: "40%", height: "100px" }}
                  type="text"
                  value={teachers.exam_detail}
                  //id={teacher.id_teacher}
                  placeholder={"สรุปข้อเสนอแนะ ของ " + teacher.committee_name}
                  onChange={updateFieldChangedDetail(index)}
                />
              </div>
            </div>
          );
        })}
        <button
          className="w-full bg-blue-500 rounded-md py-1 text-white text-xl "
          style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
          onClick={() => {
            handleClickOpen();
          }}
        >
          {" "}
          ส่งแบบบันทึกผลการสอบหัวข้อโครงงาน
        </button>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        //keepMounted
        //onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>
          <p className="text-2xl"> ยืนยันบันทึกผลการสอบหัวข้อโครงงาน</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          {teachers.map((teacher, index) => {
            return (
              <div key={index} className="mb-4">
                <p className=" ">
                  <span className="">{teacher.role}</span>{" "}
                  {teacher.committee_name}
                </p>
                {teacher.exam_value.length == 0 ? (
                  <p className=" font-semibold text-red-500">
                    ** ความคิดเห็นผู้ประเมิน : ยังไม่ได้เลือก
                  </p>
                ) : (
                  <p className=" font-semibold">
                    ความคิดเห็นผู้ประเมิน : {teacher.exam_value}
                  </p>
                )}

                {teacher.exam_detail.length > 0 ? (
                  <div>
                    <p className="">ข้อเสนอแนะ</p>
                    <p className=" px-2 bg-gray-200 p-1 rounded-xl">
                      {teacher.exam_detail}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            ยกเลิก
          </Button>
          <Button
            onClick={() => {
              sendMidExamResult();
              //NewSendExamResults();
              //final
              nextStageProject();
              props.function();
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

//old function

// function getTeachers() {
//   axios
//     .get(`http://localhost:3001/project/getrequest/${props.project.name_eng}`)
//     .then((response) => {

//       console.log(response.data.length);
//       console.log(response.data);
//       setTeachers(response.data);
//     });
// }

// function getTeachers() {
//   axios
//     .get(`http://localhost:3001/project/getrequest/${props.project.name_eng}`)
//     .then((response) => {
//       console.log(response.data);

//       setTeachers(response.data);
//       //setStatusValue(response.data)
//     });
// }

// const [statusValue, setStatusValue] = useState([]);
// const [detail, setDetail] = useState([]);

// function showData() {
//   var data = [];
//   for (let i = 0; i < statusValue.length; i++) {
//     for (let j = 0; j < detail.length; j++) {
//       if (statusValue[i].id_teacher == detail[j].id_teacher) {
//         //console.log("hello")
//         data.push({
//           id: statusValue[i].id_teacher,
//           role: statusValue[i].role,
//           name: statusValue[i].name,
//           value: statusValue[i].value,
//           detail: detail[j].detail,
//         });
//       }
//     }
//   }
//   setValidation(data);

//   console.log(data);
// }
// function NewSendExamResults() {
//   for (let k = 0; k < validation.length; k++) {
//     axios
//       .post("http://localhost:3001/project/examresult", {
//         exam_value: validation[k].value,
//         exam_details: validation[k].detail,
//         id_project: props.project.idP,
//         id_teacher: validation[k].id,
//       })
//       .then((res) => {
//         console.log(res.data);
//       });
//     axios
//       .post("http://localhost:3001/notification/id", {
//         description: `${props.project.name_eng} ได้ส่งแบบบันทึกผลการสอบหัวข้อโครงงานให้ ${validation[k].name} ตรวจสอบ !! `,
//         state_name: "บันทึกผลการสอบหัวข้อโครงงาน",
//         id_teacher: validation[k].id,
//         idProject: props.project.idP,
//       })
//       .then((res) => {
//         console.log(res.data);
//       });
//   }
// }

{
  /* <br />
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
          ส่งแบบบันทึกผลการสอบหัวข้อโครงงาน
        </button> : <div onClick={()=>console.log(validation)}> test</div>}
      </div> */
}

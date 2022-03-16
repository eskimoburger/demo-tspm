import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
//import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

export default function state7({
  advisor,
  committees,
  members,
  projectId,
  functionNext,
  projectNameTH,
  projectNameENG,
  projectCPE,
  refreshData,
}) {
  useEffect(() => {
    setTeacher(advisor);

    //getTeacher()
  }, []);

  const [teacher, setTeacher] = useState(null);
  const [alertBox, setAlertBox] = useState(false);

  const finalSendAsses = () => {
    refreshData();

    //console.log("Hello");
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

          backgroundColor: "#b91c1c",
          opacity: "90%",
        }}
      >
        ขอรับประเมินความคืบหน้า
      </div>
      <div
        className="flex flex-col justify-center mx-auto px-4  pt-4 pb-6 text-xl mt-4 bg-white rounded-2xl  "
        style={{
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          width: "90%",
        }}
      >
        <h1 className="text-center font-bold  my-2 text-gray-800  text-2xl   stage2:text-3xl">
          {" "}
          ประเมินความก้าวหน้าโครงงาน
        </h1>

        <div
          className=" m-auto text-gray-700 my-4 flex flex-col items-center"
          style={{ width: "90%" }}
        >
          <div className="stage2:text-left text-base  stage2:w-[500px] stage2:text-2xl space-y-2    ">
            <p>
              <span className="font-bold">รหัสโครงงาน : </span> CPE
              {projectCPE.toString().padStart(2, 0)}
            </p>
            <p>
              {" "}
              <span className="font-bold"> ชื่อโครงงาน :</span> {projectNameTH}
            </p>
            <p>
              {" "}
              <span className="font-bold">
                {" "}
                ชื่อโครงงาน (ภาษาอังกฤษ) :
              </span>{" "}
              {projectNameENG}
            </p>
            <p className="font-bold">สมาชิกในกลุ่ม</p>
            {members.map((val, index) => {
              return (
                <p key={index} className="ml-2        font-normal">
                  {" "}
                  {index + 1}. {val.name}
                </p>
              );
            })}
            <p className="font-bold">อาจารย์ประจำโครงงาน</p>
            {committees.map((val, index) => {
              return (
                <p key={index} className="ml-2  font-normal">
                  {" "}
                  {index + 1}. {val.teacher_name}
                </p>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => {
              setAlertBox(true);
            }}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowForwardIcon />}
            style={{ fontSize: 20 }}
          >
            ส่งคำขอรับการประเมิน
          </Button>
        </div>
      </div>

      <Dialog
        open={alertBox}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"ยืนยันการส่งคำขอรับการประเมิน ?"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-center ">
          <i
            className="bx bx-error-circle bx-tada  m-2  "
            style={{ fontSize: "180px" }}
          ></i>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setAlertBox(false);
            }}
            className=" h-10 rounded-lg bg-red-600   uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-4 "
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              finalSendAsses();
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ยืนยัน
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//old comment

// function SendAsses() {
//   //Project1 ได้ส่งคำขอให้ ดร.เศรษฐา ตั้งค้าวานิช  อาจารย์ที่ปรึกษาประจำโครงงงาน1 (Project1) ประเมินความก้าวหน้าของโครงงาน
//   axios
//     .post("https://demo-tspm-server.herokuapp.com/notification/id", {
//       description: `${props.project.name_eng}  ได้ส่งคำขอให้  ${teacher.name} ${teacher.role}ประจำ${props.project.name} (${props.project.name_eng}) ประเมินความก้าวหน้าของโครงงาน`,
//       state_name: "ขอประเมินความก้าวหน้าของโครงงาน",
//       id_teacher: teacher.id_teacher,
//       idProject: props.project.idP,
//     })
//     .then((res) => {
//       console.log(res.data);
//     });

//   for (let i = 0; i < props.project.members.length; i++) {
//     console.log(props.project.members[i]);

//     axios
//       .post(
//         `https://demo-tspm-server.herokuapp.com/project/studentasses/${props.project.idP}`,
//         {
//           idStudent: props.project.members[i].id,
//         }
//       )
//       .then((res) => {
//         console.log(res.data);
//       });
//   }

//   axios
//     .post(`https://demo-tspm-server.herokuapp.com/project/asses/${props.project.idP}`)
//     .then((res) => {
//       console.log(res.data);
//     });
// }

// function getTeacher() {
//   var teacher = [];
//   for (let i = 0; i < props.project.committees.length; i++) {
//     if (props.project.committees[i].role == "อาจารย์ที่ปรึกษา") {
//       //console.log(props.project.committees[i]);
//       teacher.push({
//         name: props.project.committees[i].teacher_name,
//         id_teacher: props.project.committees[i].id_teacher,
//         role: props.project.committees[i].role,
//       });
//     }
//   }
//   console.log(teacher);
//   setTeacher(teacher[0])
// }

// async function nextStageProject() {
//   await axios
//     .put(`https://demo-tspm-server.herokuapp.com/project/nextstage/${props.project.idP}`)
//     .then((response) => {
//       console.log(response.data);
//     });
// }

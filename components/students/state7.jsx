import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function state7(props) {
  useEffect(() => {
    setTeacher(props.project.advisor);

    //getTeacher()
  }, []);

  const [teacher, setTeacher] = useState(null);
  const [alertBox, setAlertBox] = useState(false);


  const finalSendAsses = async () => {
    await axios
      .post(
        "https://demo-tspm-server.herokuapp.com/final-project/state-6-asses/" +
          props.project.idP,
        {
          project_eng: props.project.name_eng,
          project_th: props.project.name,
          idTeacher: teacher.id_teacher,
          teacherName: teacher.teacher_name,
        }
      )
      .then((res) => {
        console.log(res.data);
        props.functionNext()
      
      }).catch(_=>alert("Cannot send assess!"))

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
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px",
          width: "50%",
        }}
      >
        <p className="text-center text-3xl my-2 text-gray-800">
          {" "}
          ประเมินความก้าวหน้าโครงงาน
        </p>

        <div className=" m-auto text-gray-700 my-4" style={{ width: "90%" }}>
          <p>
            <span className="font-bold">รหัสโครงงาน : </span> CPE
            {props.project.id.toString().padStart(2, 0)}
          </p>
          <p>
            {" "}
            <span className="font-bold"> ชื่อโครงงาน :</span>{" "}
            {props.project.name}
          </p>
          <p className="font-bold">สมาชิกในกลุ่ม</p>
          {props.project.members.map((val, index) => {
            return (
              <p key={index} className="ml-2 text-xl font-normal">
                {" "}
                {index + 1}. {val.name}
              </p>
            );
          })}
          <p className="font-bold">อาจารย์ประจำโครงงาน</p>
          {props.project.committees.map((val, index) => {
            return (
              <p key={index} className="ml-2 text-xl font-normal">
                {" "}
                {index + 1}. {val.teacher_name}
              </p>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              // console.log(teacher);
              // finalSendAsses();
              setAlertBox(true);
            }}
            className="bg-blue-600 p-2 text-white  rounded-lg hover:bg-blue-900 "
            style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
          >
            <ArrowForwardIcon /> ส่งคำขอรับการประเมิน
          </button>
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


import React, { useState, useEffect } from "react";
import style from "../styles/propose.module.scss";
import Axios from "axios";
import { Button, StepLabel } from "@material-ui/core";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";







const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Propose(props) {
  const [user, setUser] = useState();
  const [MemberList, setMemberList] = useState([]);
  const [selectdTeacher, setselectdTeacher] = useState([]);
  const [ShowTeacher, setShowTeacher] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [detail, SetDetail] = useState({
    pnameTH: "", //ชื่อโครงงานไทย
    pnameEN: "", //ชื่อโครงงานอังกฤษ
    p_des: "", //รายละเอียดโครงงานโดยย่อ
    teacher_List: [], //อาจารย์ [{id,name,role},{id,name,role}]
    userID: "", //รหัสนิสิต
    members: [],
  });

  //show detail project before send
  const handleClickOpen = () => {
    setOpen(true);

    var pnameTH = document.getElementById("p_name_th").value; //ชื่อโครงงานไทย
    var pnameEN = document.getElementById("p_name_en").value; //ชื่อโครงงานอังกฤษ
    var p_des = document.getElementById("p_des").value; //รายละเอียดโครงงานโดยย่อ
    var teacher_List = selectdTeacher; //อาจารย์ [{id,name,role},{id,name,role}]
    var userID = props.user.id; //รหัสนิสิต
    var userName =
      props.user.prefix_th +
      " " +
      props.user.thname +
      " " +
      props.user.thlastname;
    var member = MemberList; //สมาชิก []

    var memberID = [];
    memberID.push({ id: userID, name: userName });
    for (let i = 0; i < member.length; i++) {
      memberID.push({ id: member[i].id, name: member[i].name });
    }

    SetDetail({
      pnameTH: pnameTH,
      pnameEN: pnameEN,
      p_des: p_des,
      teacher_List: teacher_List,
      userID: userID,
      members: memberID,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchStudentList();
    fetchTeacherList();
  }, []);

  function fetchStudentList() {
    axios.get(`http://localhost:3001/allstudent/test`).then((response) => {
      console.log(response.data.studentList);
      setStudentList(response.data.studentList);
    });
  }
  function fetchTeacherList() {
    axios.get(`http://localhost:3001/allteacher`).then((response) => {
      console.log(response.data);
      setTeacherList(response.data);
    });
  }

  //sendrequest ขอรายชื่อนักเรียนเป็น id:xxxxxxxx name:"{thname} {thlastname}" response =[id:"xxxxxxxx" name:"{thname} {thlastname}"]
  //setStudentList(response)
  const [studentList, setStudentList] = useState([
    { id: "00", name: "zero number" },
    { id: "01", name: "one number" },
    { id: "02", name: "two number" },
    { id: "03", name: "three number" },
    { id: "04", name: "four number" },
    { id: "05", name: "five number" },
    { id: "06", name: "six number" },
    { id: "07", name: "seven number" },
    { id: "08", name: "eight number" },
    { id: "09", name: "nine number" },
    { id: "10", name: "ten number" },
  ]);

  //sendrequest ขอรายชื่ออาจารย์เป็น id:xxxxxxxx name:"{thname} {thlastname}" response =[id:"xxxxxxxx" name:"{thname} {thlastname}"]
  //setTeacherList(response)
  const [teacherList, setTeacherList] = useState([
    { id: "0001", name: "อาจารย์คนที่ 1" },
    { id: "0002", name: "อาจารย์คนที่ 2" },
    { id: "0003", name: "อาจารย์คนที่ 3" },
    { id: "0004", name: "อาจารย์คนที่ 4" },
    { id: "000n", name: "อาจารย์คนที่ n" },
  ]);

  const [ShowSTD, setShowSTD] = useState([]);

  function addMember() {
    var modal = document.getElementById("myModal");
    var newMember = document.getElementById("searchID").value;
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].id == newMember) {
        setMemberList([...MemberList, studentList[i]]);
        modal.style.display = "none";
        document.getElementById("searchID").value = "";
        setShowSTD([]);
        //studentList.splice(i, 1);
      }
    }
  }
  function test(params) {
    window.alert(params);
  }
  const [tRole, settRole] = useState("");
  function updateTrole(id, role) {
    settRole("");
    document.getElementById("btn_t_role1").style = style.select;
    document.getElementById("btn_t_role2").style = style.select;
    document.getElementById("btn_t_role3").style = style.select;
    document.getElementById(id).style.color = "#00b74a";
    document.getElementById(id).style.border = "solid 2px #00b74a";
    settRole(role);
  }

  function addTeacher() {
    var modal = document.getElementById("tModal");
    var newMember = document.getElementById("searchTID").value;
    for (let i = 0; i < teacherList.length; i++) {
      if (teacherList[i].id == newMember) {
        var ateacher = {
          id: teacherList[i].id,
          name: teacherList[i].name,
          role: tRole,
        };
        setselectdTeacher([...selectdTeacher, ateacher]);
        modal.style.display = "none";
        document.getElementById("searchTID").value = "";
        document.getElementById("btn_t_role1").style = style.select;
        document.getElementById("btn_t_role2").style = style.select;
        document.getElementById("btn_t_role3").style = style.select;
        setShowTeacher([]);
        settRole("");
        //teacherList.splice(i, 1);
      }
    }
  }
  function getTeacherID(name) {
    for (let i = 0; i < teacherList.length; i++) {
      if (name == teacherList[i].name) {
        return teacherList[i].id;
      }
    }
  }
  // Get the modal

  /*---------------------ระบบsearch----------------------*/
  function searchSTD() {
    var searchID = document.getElementById("searchID").value;
    setShowSTD([]);
    for (let i = 0; i < studentList.length; i++) {
      if (searchID == studentList[i].id) {
        setShowSTD([...ShowSTD, studentList[i]]);
      }
    }
  }
  function searchTeacher() {
    var searchID = document.getElementById("searchTID").value;
    setShowTeacher([]);
    for (let i = 0; i < teacherList.length; i++) {
      if (searchID == teacherList[i].id) {
        setShowTeacher([...ShowTeacher, teacherList[i]]);
      }
    }
  }

  //---------------------modal-----------------------------
  function addMemberOn() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  function addTeacherOn() {
    var modal = document.getElementById("tModal");
    modal.style.display = "block";
  }
  function addMemberOff() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  React.useEffect(() => {
    window.onclick = function (event) {
      var modal = document.getElementById("myModal");
      var tmodal = document.getElementById("tModal");
      if (event.target == modal) {
        modal.style.display = "none";
        setShowSTD([]);
        document.getElementById("searchID").value = "";
      }
      if (event.target == tmodal) {
        tmodal.style.display = "none";
        settRole("");
        setShowTeacher([]);
        document.getElementById("searchTID").value = "";
        document.getElementById("btn_t_role1").style = style.select;
        document.getElementById("btn_t_role2").style = style.select;
        document.getElementById("btn_t_role3").style = style.select;
      }
    };
  });
  //-------------------------------------------------

  function sendPopose() {
    var pnameTH = document.getElementById("p_name_th").value; //ชื่อโครงงานไทย
    var pnameEN = document.getElementById("p_name_en").value; //ชื่อโครงงานอังกฤษ
    var p_des = document.getElementById("p_des").value; //รายละเอียดโครงงานโดยย่อ
    var teacher_List = selectdTeacher; //อาจารย์ [{id,name,role},{id,name,role}]
    var userID = props.user.id; //รหัสนิสิต
    var member = MemberList; //สมาชิก []
    var memberID = []; //รหัสนิสิต สมาชิก []
    memberID.push(userID);
    for (let i = 0; i < member.length; i++) {
      memberID.push(member[i].id);
    }
    console.log({
      pnameTH: pnameTH, //ชื่อโปรเจ็คภาษาไทย
      pnameEN: pnameEN, //projectname
      p_des: p_des,
      tList: teacher_List, ////อาจารย์ [{id,name,role},{id,name,role}]
      memberID: memberID,
    });
    /*** */
    Axios.get("", {
      //update ใส่database
      // update state +1 ในDB
      pnameTH: pnameTH, //ชื่อโปรเจ็คภาษาไทย
      pnameEN: pnameEN, //projectname
      p_des: p_des,
      tList: teacher_List, ////อาจารย์ [{id,name,role},{id,name,role}]
      memberID: memberID, //array
      /*ส่งเข้าไปเก็บในตาราง propose น่าจะต้องมี 
      (id,
        projectname_th,
        projectname_en,
        teacher,sub_teacher,
        committee["xxxx","xxxx"],
        member["xxxx","xxxx"],
        ถ้ามีที่ปรึกษาร่วม
          comfirem[0,0,0,0,0]) ไว้เช็คการตอบรับจากอาจารย์ (ที่ปรึกษา,ที่ปรึกษาร่วม,กรรมการ1,กรรมการ2,อาจารย์ประจำรายวิชากรอกรหัสโปรเจ็ค)
        ถ้าไม่มีที่ปรึกษาร่วม ปรึกษาร่วม = ""
          comfirem[0,0,0,0]) ไว้เช็คการตอบรับจากอาจารย์ (ที่ปรึกษา,กรรมการ1,กรรมการ2,อาจารย์ประจำรายวิชากรอกรหัสโปรเจ็ค)
          project_id:""ว่างไว้รอแอดมินใส่ให้

    ****เพิ่มตารางจีบคู่ propose id กับ userID ให้ง่ายต่อการค้นหา 
    ตัวอย่าง
    ตารราง user_propose
    [id,userid,proposeid]
    [001,"60360197","ps001"]
    [002,"60360563","ps001"]
    [003,"60360492","ps002"]
    [004,"60360987","ps003"]          
          */
    }).then((response) => {
      //response
    });
    /// test_data_project
    axios
      .post("http://localhost:3001/project/addprojectdatatest", {
        project_th: pnameTH,
        project_eng: pnameEN,
        project_des: p_des,
      })
      .then((response) => {
        console.log(response.data);
        alert("Complete");
      });
    /// addMemberList to database
    for (let i = 0; i < memberID.length; i++) {
      axios
        .post("http://localhost:3001/project/addproject", {
          project_th: pnameTH,
          project_eng: pnameEN,
          members: memberID[i],
        })
        .then((response) => {
          console.log(response);
          //alert('ได้ป่าววะ02')
        });
      //console.log({project_th : pnameTH,project_eng:pnameEN ,members : memberID[i] })
    }
    /// adCommittee to database
    for (let i = 0; i < teacher_List.length; i++) {
      var id = teacher_List[i].id;
      var name = teacher_List[i].name;
      var role = teacher_List[i].role;
      var pnameEN = pnameEN;

      Axios.post("http://localhost:3001/project/addcommitproject", {
        committee_name: name,
        role: role,
        id_teacher: id,
        project_eng: pnameEN,
      }).then((response) => {
        //alert('ได้ป่าววะ03')
      });
    }

    ///add Notification to database

    for (let i = 0; i < teacher_List.length; i++) {
      var id = teacher_List[i].id;
      var name = teacher_List[i].name;
      var role = teacher_List[i].role;
      var pnameEN = pnameEN;
      var description = `${pnameEN} ได้ส่งคำขอให้ ${name} เป็น ${role} ประจำโครงงาน`
      var state_name = "เสนอหัวข้อโครงงาน" 

      Axios.post("http://localhost:3001/notification/", {
        description: description,
        state_name: state_name,
        id_teacher: id,
        project_name_eng: pnameEN,
      }).then((response) => {
        console.log(response.data);
        alert('ได้ป่าววะ notification')
      });
    }

    console.log("hello");
  }

  function handleRemove(id) {
    const newList = selectdTeacher.filter((item) => item.id !== id);
    setselectdTeacher(newList);
  }

  function handleRemoveStudent(id) {
    const newList = MemberList.filter((item) => item.id !== id);
    setMemberList(newList);
  }
  var pnameTHContent = null;
  var pnameENContent = null;
  var detailContent = null;
  var teacherContent = null;

  if (detail.pnameTH == "") {
    pnameTHContent = (
      <>
        <p className=" text-2xl">ชื่อโครงงานภาษาไทย : กรุณากรอกข้อมูล</p>
      </>
    );
  } else {
    pnameTHContent = (
      <>
        <p className=" text-2xl">ชื่อโครงงานภาษาไทย : {detail.pnameTH}</p>
      </>
    );
  }
  if (detail.pnameEN == "") {
    pnameENContent = (
      <>
        <p className=" text-2xl">ชื่อโครงงานภาษาอังกฤษ : กรุณากรอกข้อมูล</p>
      </>
    );
  } else {
    pnameENContent = (
      <>
        <p className=" text-2xl">ชื่อโครงงานภาษาอังกฤษ : {detail.pnameEN}</p>
      </>
    );
  }

  if (detail.p_des == "") {
    detailContent = (
      <>
        <p className="ml-3">ยังไม่มีข้อมูลกรุณากรอกรายละเอียด</p>
      </>
    );
  } else {
    detailContent = (
      <>
        <p
          className=" border-2 border-gray-100 rounded-md mt-3 bg-gray-100 p-2 "
          style={{
            minHeight: "450px",
            maxHeight: "450px",
            overflowY: "scroll",
          }}
        >
          {" "}
          {detail.p_des}{" "}
        </p>
      </>
    );
  }
  if (detail.teacher_List.length == 0) {
    teacherContent = (
      <>
        <p className="ml-3">กรุณาเลือกอาจารย์ประจำโครงงาน</p>
      </>
    );
  } else {
    teacherContent = (
      <>
        {detail.teacher_List.map((val) => {
          return (
            <>
              <div className="flex">
                <div className="text-xl ml-4  " style={{ minWidth: "40%" }}>
                  {" "}
                  <p> ชื่อ {val.name}</p>
                </div>
                <div className=" text-xl  " style={{ minWidth: "60%" }}>
                  {" "}
                  <p>{val.role}</p>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  }

  return (
    <div className={style.popose}>
      <div className={style.p_title}>แบบฟอร์มเสนอหัวข้อโครงงาน</div>
      <div className={style.p_body}>
        <div className={style.p_content}>
          <p>ชื่อโครงงานภาษาไทย</p>
          <input id="p_name_th" placeholder="ชื่อโครงงานภาษาไทย..."></input>
          <p>ชื่อโครงงานภาษาอังกฤษ</p>
          <input id="p_name_en" placeholder="ชื่อโครงงานภาษาอังกฤษ..."></input>
          <p>รายละเอียดโครงงานโดยย่อ</p>
          <textarea id="p_des" placeholder="รายละเอียดโครงงาน..."></textarea>

          {/*Teacher*/}
          <div id="tModal" className={style.modal}>
            <div className={style.modal_content}>
              <div className={style.modal_header}>
                <h2>เลือกอาจารย์</h2>
              </div>
              {/*-----------------------ระบบsearch(เปลี่ยนเอาแบบเทพๆ)--------------------------*/}
              <div className={style.modal_body}>
                <p>รหัสอาจารย์:</p>
                <input
                  id="searchTID"
                  onChange={searchTeacher}
                  placeholder="รหัสอาจารย์..."
                ></input>
                <p>ผลการค้นหา:</p>{" "}
                {ShowTeacher.map((val) => {
                  return (
                    <p className={style.result} id={val.id}>
                      {val.name}
                    </p>
                  );
                })}
                <p />
                <p>เลือกสถานะอาจารย์</p>
                <button
                  onClick={() => updateTrole("btn_t_role1", "อาจารย์ที่ปรึกษา")}
                  id="btn_t_role1"
                  className={style.select}
                >
                  ที่ปรึกษา
                </button>
                <button
                  onClick={() =>
                    updateTrole("btn_t_role2", "อาจารย์ที่ปรึกษาร่วม")
                  }
                  id="btn_t_role2"
                  className={style.select}
                >
                  ที่ปรึกษาร่วม
                </button>
                <button
                  onClick={() => updateTrole("btn_t_role3", "กรรมการ")}
                  id="btn_t_role3"
                  className={style.select}
                >
                  กรรมการ
                </button>
                {/*----------------------------------------------------------------------------*/}
                <div className={style.small_btn}>
                  <button onClick={addTeacher}>เลือกอาจารย์</button>
                </div>
              </div>
            </div>
          </div>
          <p>อาจารย์</p>

          {selectdTeacher.map((val, index) => {
            return (
              <>
                <p className={style.member} key={val.id}>
                  รหัส: <label className={style.info}>{val.id} </label>ชื่อ:
                  <label className={style.info}> {val.name}</label>สถานะ:
                  <label className={style.info}> {val.role}</label>
                  <button
                    style={{
                      width: "50px",
                      backgroundColor: "red",
                      borderRadius: "50px",
                      fontSize: "12px",
                      color: "white",
                      marginLeft: "20px",
                    }}
                    onClick={() => handleRemove(val.id)}
                  >
                    X
                  </button>
                </p>

                <div
                  style={{ display: "flex", justifyContent: "center" }}
                ></div>
              </>
            );
          })}
          <div>
            <button className={style.s_btn} onClick={addTeacherOn}>
              เลือกอาจารย์
            </button>
          </div>
          {/*member*/}
          <div id="myModal" className={style.modal}>
            <div className={style.modal_content}>
              <div className={style.modal_header}>
                <h2>การเพิ่มสมาชิก</h2>
              </div>
              {/*-----------------------ระบบsearch(เปลี่ยนเอาแบบเทพๆ)--------------------------*/}
              <div className={style.modal_body}>
                <p>รหัสนิสิต:</p>
                <input
                  id="searchID"
                  onChange={searchSTD}
                  placeholder="รหัสนิสิต..."
                ></input>
                <p>ผลการค้นหา:</p>{" "}
                {ShowSTD.map((val) => {
                  return (
                    <p className={style.result} id={val.id}>
                      {val.name}
                    </p>
                  );
                })}
                <p />
                {/*----------------------------------------------------------------------------*/}
                <div className={style.small_btn}>
                  <button onClick={addMember}>เพิ่มสมาชิก</button>
                </div>
              </div>
            </div>
          </div>
          <p>สมาชิก</p>
          <p className={style.member}>
            รหัสนิสิต: <label className={style.info}>{props.user.id} </label>
            ชื่อ:{" "}
            <label className={style.info}>
              {props.user.prefix_th} {props.user.thname} {props.user.thlastname}
            </label>
          </p>
          {MemberList.map((val) => {
            return (
              <>
                <p className={style.member}>
                  รหัสนิสิต: <label className={style.info}>{val.id} </label>
                  ชื่อ:
                  <label className={style.info}> {val.name}</label>
                  <button
                    style={{
                      width: "50px",
                      backgroundColor: "red",
                      borderRadius: "50px",
                      fontSize: "12px",
                      color: "white",
                      marginLeft: "20px",
                    }}
                    onClick={() => handleRemoveStudent(val.id)}
                  >
                    X
                  </button>
                </p>
              </>
            );
          })}
          <div>
            <button className={style.s_btn} onClick={addMemberOn}>
              เพิ่มสมาชิก
            </button>
          </div>
          <button className={style.button} onClick={handleClickOpen}>
            ส่ง
          </button>
        </div>
      </div>

      <div>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div
              className="bg-white  rounded-md "
              style={{ minWidth: "1000px", maxWidth: "1000px" }}
            >
              <div className="bg-blue-500 rounded-t-md">
                <p className="p-3 text-white text-3xl">
                  ยืนยันการส่งหัวข้อโครงงาน
                </p>
              </div>
              <div className="p-3">
                {pnameTHContent}
                {pnameENContent}
                <p className=" text-2xl my-3"> รายละเอียดโครงงาน</p>
                {detailContent}
                <p className=" text-2xl my-3"> รายชื่อสมาชิกในกลุ่ม</p>
                {detail.members.map((val) => {
                  return (
                    <>
                      <div className="text-xl ml-3">
                        <p>
                          รหัสนิสิต : {val.id}{" "}
                          <span className="font-normal"> ชื่อ {val.name} </span>
                        </p>
                      </div>
                    </>
                  );
                })}
                <p className=" text-2xl my-3"> รายชื่ออาจารย์</p>
                {teacherContent}
              </div>

              <div className=" rounded-b-md ">
                <div className="flex justify-end p-3 space-x-5">
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                  >
                    ยกเลิก
                  </Button>
                  <Button
                  onClick={sendPopose}
                    variant="contained"
                    style={{ backgroundColor: "green", color: "white" }}
                  >
                    ตกลง
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

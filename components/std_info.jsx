import React, { useState,useEffect } from "react";
import styles from "../styles/user.module.scss";
import Image from "next/image";
import Camera from "../public/camera.svg";
import Edit from "../public/logbook.svg";
import Pws from "../public/key.svg";
import Close from "../public/close.svg";
import Layout from "./Layout";
import axios from 'axios'


export default function std_info() {

  useEffect(()=>{
    getUser();

  },[])
  

  const getUser = () =>{
    axios.get('http://localhost:3001/allstudent/get/62360959').then((response)=>{
      console.log(response.data[0])
      setStudentDetail(response.data[0])
    })
  }


  const [studentDetail,setStudentDetail]=useState(
    {
      student_id: 0,
      prefix_th: "",
      student_name_th: "",
      student_lastname_th: "",
      prefix_eng: "",
      student_name_eng: "",
      student_lastname_eng: "",
      student_email: "",
      nickname: "",
      phone: "",
      pic: "",
  }
  )

  const setUserProfile = () =>{
    //setuser(s)

  }
  const [user, setuser] = useState({
    id: "60360197",
    p_id: "CPE08",
    name: "กฤติน เพิ่มพูล",
    name_en: "Kridtin Permpoon",
    nickname: "เคน",
    email: "Kridtinp60@nu.ac.th",
    phone: "0xx xxx xxxx",
    pic: "/user.png",
  });

  function editOn() {
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
  }
  function editOff() {
    var modal = document.getElementById("editModal");
    modal.style.display = "none";
  }
  function changePicOn() {
    var modal = document.getElementById("picModal");
    modal.style.display = "block";
  }
  function changePicOff() {
    var modal = document.getElementById("picModal");
    modal.style.display = "none";
  }
  function changePic() {
    window.alert("Hay!");
  }

  function saveInfo() {
    var nameEn = document.getElementById("n-name-en").value;
    var name = document.getElementById("name").value;
    var nickname = document.getElementById("nickname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var modal = document.getElementById("editModal");
    setuser({
      id: user.id,
      p_id: user.p_id,
      name: name,
      name_en: nameEn,
      nickname: nickname,
      email: email,
      phone: phone,
      pic: user.pic,
    });
    modal.style.display = "none";
  }

  return (
    <div>
      <Layout user={{ username: studentDetail.student_name_th, role: "" }}>
        <div className={styles.content}>
          <div className={styles.titlebar}>
            <p>User Infomation ( ข้อมูลผู้ใช้ )</p>
            <p className={styles.desc}>ข้อมูลส่วนตัวผู้ใช้</p>
            <p className={styles.desc}>ชื่อ-นามสกุล: {" "}{studentDetail.student_name_th}{" "}{studentDetail.student_lastname_th}</p>
            <p className={styles.desc}>รหัสโครงงาน: {user.p_id}</p>
          </div>
          <div className={styles.picture}>
            <img src={"https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697"} style={{width:"100%",height:"100%"}} ></img>
            


   


          </div>
          <div className={styles.pic_svg} onClick={changePicOn} >
            <Camera width="30" height="30" />
          </div>

         
          <div className={styles.main}>
            <div className={styles.info}>
              <p className="py-2" style={{fontSize:"36px"}}>รายละเอียด</p>
              <div className="ml-3 font-normal">
              <p >ชื่อ(อังกฤษ) : {studentDetail.prefix_eng}{" "}{studentDetail.student_name_eng}{" "}{studentDetail.student_lastname_eng}</p>
              <p >ชื่อ(ภาษาไทย) : {studentDetail.prefix_th}{" "}{studentDetail.student_name_th}{" "}{studentDetail.student_lastname_th}</p>
              <p >
                รหัสนิสิต: {studentDetail.student_id}
              </p>
              <p>ชื่อเล่น: {studentDetail.nickname}</p>
              <p>อีเมลล์: {studentDetail.student_email}</p>
              <p>เบอร์โทร: {studentDetail.phone}</p>
              </div>
            </div>
            <div className={styles.menu}>
              <div className={styles.edit} onClick={editOn}>
                <div className={styles.Svg}>
                  <Edit width="30" height="30" />
                </div>
                <p>แก้ไขข้อมูลส่วนตัว</p>
              </div>
              <div className={styles.pws}>
                <div className={styles.Svg}>
                  <Pws width="30" height="30" />
                </div>
                <p>เปลี่ยนรหัสผ่าน</p>
              </div>
            </div>
          </div>
          <div id="picModal" className={styles.modal}>
            <div className={styles.modal_content}>
              <div className={styles.modal_header}>
                <p style={{fontSize:"24px"}}>รูปโปร์ไฟล์</p>
                <div className={styles.close} onClick={changePicOff}>
                  <Close width="30" height="30" />
                </div>
              </div>
              <div className={styles.modal_body_c}>
                <div style={{width:"300px",height:"250px",borderStyle:"solid",borderWidth:"2px"}}>
                <img src={"https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697"}  style={{height:'100%',width:"100%"}}></img>
                </div>
                
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpg,.png"
                  className={styles.file}
                />
                <label htmlFor="file" style={{marginTop:"10px"}}>เลือกรูปภาพ</label>
                <div className={styles.small_btn} onClick={changePic}>
                  เปลี่ยน
                </div>
              </div>
            </div>
          </div>
          <div id="editModal" className={styles.modal}>
            <div className={styles.modal_content}>
              <div className={styles.modal_header}>
                <p className="text-2xl font-bold">แก้ไขข้อมูลส่วนตัว</p>
                <div className={styles.close} onClick={editOff}>
                  <Close width="30" height="30" />
                </div>
              </div>
              <div className={styles.modal_body}>
              <p>
                  <label>คำนำหน้า (อังกฤษ):</label>
                  <input id="prefix-en" defaultValue={studentDetail.prefix_th} />
                </p>
                <p>
                  <label>ชื่อ (อังกฤษ):</label>
                  <input id="n-name-en" defaultValue={studentDetail.student_name_eng} />
                </p>
                <p>
                  <label>นามสกุล (อังกฤษ):</label>
                  <input id="n-lastname-en" defaultValue={studentDetail.student_lastname_eng} />
                </p>
                <p>
                  <label>คำนำหน้า (ไทย):</label>
                  <input id="prefix" defaultValue={studentDetail.prefix_eng} />
                </p>
                <p>
                  <label>ชื่อ (ไทย):</label>
                  <input id="name" defaultValue={studentDetail.student_name_th} />
                </p>
                <p>
                  <label>นามสกุล (ไทย):</label>
                  <input id="lastname" defaultValue={studentDetail.student_lastname_th} />
                </p>
                <p>
                  <label>ชื่อเล่น :</label>
                  <input id="nickname" defaultValue={studentDetail.nickname} />
                </p>
                <p>
                  <label>อีเมลล์:</label>
                  <input id="email" defaultValue={studentDetail.student_email} />
                </p>
                <p>
                  <label>เบอร์โทร:</label>
                  <input id="phone" defaultValue={studentDetail.phone} />
                </p>
                <button onClick={saveInfo}>บันทึก</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

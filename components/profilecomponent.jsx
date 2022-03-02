import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import styles from "../styles/profile.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

export default function profileComponent() {
  let forceUpdate = useForceUpdate();

  const [open, setOpen] = React.useState(false);
  // const [profileImg, setProfileImg] = useState("/noimage.jpg");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const [imageProfile,setImageProfile] = useState("")
  const [hook,setHook] = useState(false)
  //const [timestamp, setTimestamp] = useState(Date.now());

  const [dialogState, setDialogState] = useState(0);
  const fileInputRef = useRef();

  const [check1,setCheck1] = useState(false)

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [studentDetail, setStudentDetail] = useState(null);
  const [editStudent, setEditStudent] = useState({});
  useEffect(() => {
    getUser();
    //setImageProfile("")
  }, [check1]);
  const getUser = async() => {
    if(sessionStorage.length > 0 ){
    await axios
      .get(
        `https://demo-tspm-server.herokuapp.com/allstudent/get/${sessionStorage.getItem(
          "useID"
        )}`
      )
      .then((response) => {
        console.log(response.data);
        setStudentDetail(response.data.dataStudent);
        setEditStudent(response.data.dataStudent);
        //setStudentDetail(null)
        if(response.data.picture.status){
          // setImageProfile(null);
          // setTimeout(() => setImageProfile(response.data.picture.data))
          
          setImageProfile(response.data.picture.data)
          //getUser();
        }
        else{
         setImageProfile("/noimage.jpg")
        }
        
        // setImageProfile(response.data)
      })
      .catch((err) => {
        console.log(err.message);
        setStudentDetail(null);
        setImageProfile("/noimage.jpg")

      });

    }
  };

  const handleChangeStudent = (event) => {
    const { name, value } = event.target;
    setEditStudent((prevStudent) => {
      return {
        ...prevStudent,
        [name]: value,
      };
    });
  };


  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", image);
    // appending file
    await axios
      .post(
        `https://demo-tspm-server.herokuapp.com/profile/${sessionStorage.getItem(
          "useID"
        )}`,
        formData,
        {
          onUploadProgress: (ProgressEvent) => {
            let progress =
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%";
            console.log(typeof progress);
            //setProgess(progress);
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOpen(false)
        setImage(null)


        
        //setStudentDetail(null)
        //setImageProfile("/noimage.jpg")
        //setHook(!hook)
         //getUser()
        // setImageProfile(`https://demo-tspm-server.herokuapp.com/imagesProfiles/${sessionStorage.getItem(
        //   "useID"
        // )}.jpg`)

        // setUploadStatus(res.data.status);
        // setOpenUpload(true);

        // getFile({ name: res.data.name,
        //          path: 'http://localhost:4500' + res.data.path
        //        })
      })
      .catch((err) => {
        console.log(err.response.data);

        // setOpenUpload(true);
        // setErrorMessage(err.response.data.message);
      });
  };
  
 
  const [oldPassword,setOldPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [check,setCheck] = useState(null)

  useEffect(()=>{
    setCheck(null)
    
  },[oldPassword])

  const checkPassword = async () =>{
   await axios.post("https://demo-tspm-server.herokuapp.com/allstudent/check/"+ sessionStorage.getItem(
      "useID"
    ),{oldPassword:oldPassword,newPassword:newPassword}).then( async (res)=>{
      console.log(res.data)
      if(res.data.status){
        handleClose();
        setConfirmPassword("")
        setNewPassword("")
        setOldPassword("")
        //console.log("Hello")
      }
      else{
        setCheck(true)
      }
      




      //console.log(res.data)
      
      //console.log(hash)
    })

  }

  var dialogHeader = null;
  var dialogContent = null;
  var dialogAction = null;

  if (dialogState === 1) {
    dialogHeader = "แก้ไขข้อมูลส่วนตัว ";
    dialogContent = (
     <div style={{width:"400px"}}>
       <div className=" flex justify-between flex-wrap gap-3  ">
       <div className="flex-1" style={{width:"50%"}}>
        <label htmlFor="student_name_th" className=" block  font-bold mb-2 ">ชื่อ (ภาษาไทย) </label>
          <input
            type="text"
            value={editStudent.student_name_th}
            onChange={handleChangeStudent}
            name="student_name_th"
            id="student_name_th"
            className="w-full h-10 rounded-lg px-4 text-lg ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />

        </div>

        <div className="flex-1" style={{width:"50%"}}>
        <label htmlFor="student_lastname_th" className="block font-bold mb-2">นามสกุล (ภาษาไทย) </label>
          <input
            type="text"
            value={editStudent.student_lastname_th}
            onChange={handleChangeStudent}
            name="student_lastname_th"
            id="student_lastname_th"
            className="w-full h-10 rounded-lg px-4 text-lg ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />
        </div>

        
       </div>
       <div className=" flex justify-between flex-wrap gap-3  ">
       <div className="flex-1" style={{width:"50%"}}>
          <label htmlFor="student_name_eng" className="block font-bold mb-2">ชื่อ (ภาษาอังกฤษ)  </label>
          <input
            type="text"
            value={editStudent.student_name_eng}
            onChange={handleChangeStudent}
            name="student_name_eng"
            id="student_name_eng"
            className="w-full h-10 rounded-lg px-4 text-lg ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />
          </div>
          <div className="flex-1" style={{width:"50%"}}>
          <label htmlFor="student_lastname_eng" className="block font-bold mb-2">นามสกุล (ภาษาอังกฤษ)  </label>
          <input
            type="text"
            value={editStudent.student_lastname_eng}
            onChange={handleChangeStudent}
            name="student_lastname_eng"
            id="student_lastname_eng"
            className="w-full h-10 rounded-lg px-4 text-lg ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />
          </div>
         
          


       </div>

        <label htmlFor="student_email" className="block font-bold mb-2">E-mail  </label>
          <input
            type="text"
            value={editStudent.student_email}
            onChange={handleChangeStudent}
            name="student_email"
            id="student_email"
            className="w-full h-10 rounded-lg px-4 text-lg ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />
          <label htmlFor="nickname" className="block font-bold mb-2">ชื่อเล่น  </label>
          <input
            type="text"
            value={editStudent.nickname}
            onChange={handleChangeStudent}
            name="nickname"
            id="nickname"
            className="w-full h-10 rounded-lg px-4 text-lg ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          /> 

            <label htmlFor="phone" className="block font-bold mb-2">เบอร์โทรศัพท์  </label>
          <input
            type="text"
            value={editStudent.phone}
            onChange={handleChangeStudent}
            name="phone"
            id="phone"
            className="w-full h-10 rounded-lg px-4 text-lg ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />


         
       

     </div>




  
        
     
    );


    dialogAction=(<>

<button onClick={()=>{handleClose()}}  className = " h-10 rounded-lg bg-red-600  uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-2 ">ยกเลิก</button>
<button onClick={()=>{handleClose()}}  className = " h-10 rounded-lg bg-gray-200  uppercase font-semibold hover:bg-gray-300    text-black transition px-2 ">ตกลง</button>
    
    
    
    </>
   
    
    
    )
  }
  if (dialogState === 2) {
    dialogHeader = "เปลี่ยนรหัสผ่าน";
    dialogContent = (
      <>
        <label htmlFor="old" className="text-xl font-bold"> รหัสผ่านปัจจุบัน</label>
        <input id="old" className={check ? "w-full h-10 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4 border-2 border-red-600"  : "w-full h-10 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4"} value={oldPassword} type="password" placeholder="รหัสผ่านปัจจุบัน" onChange={(e)=>setOldPassword(e.target.value) } />
        {check ? <p  className="text-red-600 font-bold text-xl mb-1 ">รหัสผ่านไม่ถูกต้อง</p> : null }
        <label htmlFor="new" className="text-xl font-bold"> รหัสผ่านใหม่</label>
        <input id = "new" className="w-full h-10 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4" value={newPassword} type="password" placeholder="รหัสผ่านใหม่" onChange={(e)=>setNewPassword(e.target.value) } />
        <label htmlFor="confirm" className="text-xl font-bold">พิมพ์อีกครั้ง</label>
        <input id = "confirm" className="w-full h-10 rounded-lg px-4 text-lg focus:ring-red-600 mb-4" value={confirmPassword} type="password" placeholder="พิมพ์อีกครั้ง" onChange={(e)=>setConfirmPassword(e.target.value) } />
        {confirmPassword ===  "" ? null : confirmPassword === newPassword ? <p  className="text-green-600 font-bold text-xl">รหัสผ่านถูกต้อง</p> : (confirmPassword.length === newPassword.length) || (confirmPassword.length > newPassword.length)  ?  <p  className="text-yellow-500 font-bold text-xl">รหัสผ่านไม่ถูกต้อง</p> :  null}
     </>
    );

    dialogAction = (<>

<button onClick={()=>{handleClose(),setConfirmPassword(""),setNewPassword(""),setOldPassword("")}}  className = " h-10 rounded-lg bg-red-600  uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-2 ">ยกเลิก</button>

      
       {
          (confirmPassword === newPassword) && (confirmPassword != "" && newPassword != "" && oldPassword!="")  ? 
       
        <button onClick={checkPassword}  className = " h-10 rounded-lg bg-blue-600  uppercase font-semibold hover:bg-blue-700 text-gray-100 transition px-2 ">บันทึกและเปลี่ยนแปลง</button>:
       null
       
       }
    
    
    </>)
  }
  if (dialogState === 3) {
    dialogHeader = "เปลี่ยนรูปโปรไฟล์";
    dialogContent = (
      <div className={styles.container}>
        <form>
          {preview ? (
            <img
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
              src={preview}
              alt={"preview"}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <button
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              <i className="bx bx-cloud-upload text-8xl bx-burst"></i>
              <br />
              {/* Add Image */}
            </button>
          )}

          <input
            id="uploadImage"
            accept=".jpg, .jpeg"
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substr(0, 5) === "image") {
                
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
        </form>
      </div>
    );
    dialogAction = (
      <>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            setOpen(false);
            document.getElementById("uploadImage").value = null           
            setPreview(null)
            setImage(null)

            //console.log(image)
          }}
        >
          ยกเลิก
        </button>
        {preview ? (
          <button 
          onClick={()=>{uploadFile(),forceUpdate}}
          
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            ตกลง
          </button>
        ) : null}
      </>
    );
  }

  return (
    <div>
      {studentDetail ? (
        <div>
          <div
            className="w-full px-10 rounded-t-2xl  flex   items-center"
            style={{
              height: "200px",
              backgroundImage: `url(${"/titlebar.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="bg-white block rounded-full overflow-hidden  outline-none"
              style={{ width: "150px", height: "150px" }}
            >
              <img
                
                src={`${imageProfile}?${new Date().getTime()}`}
                style={{ width: "100%", height: "80%", flex: "0 100%",objectFit:"cover" }}
              ></img>
              <div
                className="bg-yellow-400 text-center font-bold hover:bg-yellow-200 cursor-pointer"
                style={{ height: "20%" }}
                onClick={() => {
                  handleClickOpen(), setDialogState(3);
                }}
              >
                Change
              </div>
            </div>

            <div
              className="text-2xl font-bold text-white ml-10"
              style={{ flex: "1" }}
            >
              <p className="text-3xl">
                {" "}
                User Information (ข้อมูลส่วนตัวของผู้ใช้){" "}
              </p>
              <p>
                {" "}
                ชื่อ - นามสกุล : {studentDetail.student_name_th}{" "}
                {studentDetail.student_lastname_th}
              </p>
              <p> รหัสนิสิต : {studentDetail.student_id} </p>
            </div>
          </div>
          <div
            className="bg-white flex justify-between p-10 rounded-b-2xl gap-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}
          >
            <div
              className=" p-5 border-gray-200 border rounded-xl  "
              style={{ width: "65%" }}
            >
              <p className="text-2xl font-bold">รายละเอียดข้อมูลผู้ใช้</p>
              <div className="text-xl ml-4 mt-2">
                <p>ชื่อ-นามสกุล (ภาษาไทย) : {studentDetail.student_name_th} </p>
                <p>
                  ชื่อ-นามสกุล (ภาษาอังกฤษ) : {studentDetail.student_name_eng}{" "}
                </p>
                <p>ชื่อเล่น : {studentDetail.nickname} </p>
                <p>รหัสนิสิต : {studentDetail.student_id} </p>
                <p>อีเมลล์ : {studentDetail.student_email} </p>
                <p>เบอร์โทร : {studentDetail.phone} </p>
              </div>
            </div>
            <div
              className=" p-10 border-gray-200 border rounded-xl  "
              style={{ width: "35%" }}
            >
              <div className="flex flex-col  items-center space-y-10">
                <div
                  className="bg-red-600 text-xl flex-col flex justify-center items-center text-white rounded-2xl px-3 hover:bg-yellow-400 cursor-pointer"
                  style={{ width: "180px", height: "90px" }}
                  onClick={() => {
                    handleClickOpen(), setDialogState(2);
                  }}
                >
                  <i className="bx bx-key text-3xl"></i>
                  <p>เปลี่ยนรหัสผ่าน</p>
                </div>
                <div
                  className="bg-blue-600 text-xl flex flex-col justify-center items-center text-white rounded-2xl px-3 hover:bg-blue-400 cursor-pointer"
                  style={{ width: "180px", height: "90px" }}
                  onClick={() => {
                    handleClickOpen(), setDialogState(1);
                  }}
                >
                  <i className="bx bx-edit text-3xl"></i>
                  <p>แก้ไขข้อมูลส่วนตัว</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          <button onClick={()=>setCheck1(!check1)}>check1</button>

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            //onClose={handleClose}
          >
            <DialogTitle>{dialogHeader}</DialogTitle>
            <DialogContent dividers style={{backgroundColor:"#EEEDE7"}}>{dialogContent}</DialogContent>
            <DialogActions>{dialogAction}</DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>Loading ... </div>
      )}
    </div>
  );
}


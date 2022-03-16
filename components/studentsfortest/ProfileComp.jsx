import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: 200,
//     },
//   },
// }));

const ProfileComp = ({ studentDetail, imgProfile, functionGetUser }) => {
  const [editStudent, setEditStudent] = useState(studentDetail);
  const [openPass,setOpenPass] = useState(false)
  const handleClickOpen = () => {
    setOpenPass(true);
  };

  const handleClose = () => {
    setOpenPass(false);
  };
  //const [img,setImg] = useState(imageProfile);

  // console.log(imageProfile)//   React.useEffect(() => {
  //     setEditStudent(studentDetail);
  //   }, []);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(null);

  useEffect(() => {
    setCheck(null);
  }, [oldPassword]);

  const checkPassword = async () => {
    handleClose()
    // await axios
    //   .post(
    //     "https://demo-tspm-server.herokuapp.com/allstudent/check/" +
    //       sessionStorage.getItem("useID"),
    //     { oldPassword: oldPassword, newPassword: newPassword }
    //   )
    //   .then(async (res) => {
    //     console.log(res.data);
    //     if (res.data.status) {
    //       handleClose();
    //       setConfirmPassword("");
    //       setNewPassword("");
    //       setOldPassword("");
    //       //console.log("Hello")
    //     } else {
    //       setCheck(true);
    //     }

    //     //console.log(res.data)

    //     //console.log(hash)
    //   });
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

  const UpdateProfileDetails = async () => {
    await axios
      .put("https://demo-tspm-server.herokuapp.com/allstudent/edit", {
        editStudent: editStudent,
      })
      .then((res) => {
        alert("Edit user complete!!");
        functionGetUser();
      })
      .catch((_) => {
        alert("Can not edit student");
      });
    //alert(JSON.stringify(editStudent));
  };
  //const classes = useStyles();
  return (
    <div>
      <h1 className="text-3xl font-bold">ข้อมูลผู้ใช้งาน (User Information)</h1>
      {/* {imgProfile} */}
      <br />
      <div className="flex  justify-center  gap-4 flex-wrap">
        <div
          className="bg-white flex flex-col justify-between rounded-md"
          style={{
            width: "370px",
            height: "300px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <div className="p-2 ">
            <div className="flex justify-center my-2">
              {/* <div className="bg-red-300 rounded-full w-16 h-16"></div> */}
              <div className="bg-white block rounded-full overflow-hidden  outline-none w-20 h-20">
                <img
                  src={`${imgProfile}?${new Date().getTime()}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                ></img>
              </div>
            </div>

            <h2 className=" text-center font-bold text-xl   ">
              {studentDetail.prefix_th} {studentDetail.student_name_th}{" "}
              {studentDetail.student_lastname_th}
            </h2>
            <h2 className=" text-center  text-xl   ">
              {" "}
              {studentDetail.prefix_eng} {studentDetail.student_name_eng}{" "}
              {studentDetail.student_lastname_eng}
            </h2>
            <h3 className=" text-center  text-lg  text-gray-500  ">
              {" "}
              รหัสนิสิต : {studentDetail.student_id}{" "}
            </h3>
          </div>

          <div className="w-full px-1 py-2  border-t-2 border-gray-50">
            <button className=" hover:bg-red-200 rounded-sm text-red-600 text-lg   w-full py-2" onClick={handleClickOpen}>
              Change Password
            </button>{" "}
            {/* <button className="  hover:bg-red-200 rounded-sm text-red-600 text-lg   w-full py-2">
              Upload picture
            </button> */}
          </div>
        </div>

        <div
          className="bg-white rounded-md p-4"
          style={{
            width: "650px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <div className="border-b-2  border-gray-100 pb-4 mb-4">
            <h1 className="text-2xl font-bold">ข้อมูลผู้ใช้งาน </h1>

            <h2 className="text-lg text-gray-400">
              ข้อมูลผู้ใช้งานสามารถแก้ไขและเปลี่ยนแปลงได้
            </h2>
          </div>

          <div className="flex justify-center flex-wrap gap-4 ">
            <TextField
              id="outlined-basic"
              label="ชื่อ (ภาษาไทย)"
              variant="outlined"
              style={{ width: "300px" }}
              // defaultValue={studentDetail.student_name_th}
              name="student_name_th"
              onChange={handleChangeStudent}
              value={editStudent.student_name_th}
            />
            <TextField
              id="outlined-basic"
              label="นามสกุล (ภาษาไทย)"
              variant="outlined"
              style={{ width: "300px" }}
              name="student_lastname_th"
              onChange={handleChangeStudent}
              value={editStudent.student_lastname_th}
            />
            <TextField
              id="outlined-basic"
              label="ชื่อ (ภาษาอังกฤษ)"
              variant="outlined"
              style={{ width: "300px" }}
              name="student_name_eng"
              onChange={handleChangeStudent}
              value={editStudent.student_name_eng}
            />
            <TextField
              id="outlined-basic"
              label="นามสกุล (ภาษาอังกฤษ)"
              variant="outlined"
              style={{ width: "300px" }}
              name="student_lastname_eng"
              onChange={handleChangeStudent}
              value={editStudent.student_lastname_eng}
            />

            <TextField
              id="outlined-basic"
              label="ชื่อเล่น"
              variant="outlined"
              style={{ width: "300px" }}
              name="nickname"
              onChange={handleChangeStudent}
              value={editStudent.nickname}
            />
            <TextField
              id="outlined-basic"
              label="เบอร์โทรศัพท์"
              variant="outlined"
              style={{ width: "300px" }}
              name="phone"
              onChange={handleChangeStudent}
              value={editStudent.phone}
            />
            <TextField
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              style={{ width: "300px" }}
              name="student_email"
              onChange={handleChangeStudent}
              value={editStudent.student_email}
            />
          </div>
          <div className="mt-4 border-t-2 border-gray-100 pt-4 ">
            <div className="flex justify-end gap-2  ">
              <button
                className="bg-gray-500 text-white p-2 rounded-xl"
                onClick={() => setEditStudent(studentDetail)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-xl"
                onClick={UpdateProfileDetails}
              >
                บันทึกข้อมูลส่วนตัว
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog
        open={openPass}
        //TransitionComponent={Transition}
        keepMounted
        //onClose={handleClose}
      >
        <DialogTitle>เปลี่ยนรหัสผ่าน</DialogTitle>
        <DialogContent dividers style={{ backgroundColor: "#EEEDE7" }}>
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
        </DialogContent>
        <DialogActions>
          <>
            <button
              onClick={() => {
                handleClose(),
                  setConfirmPassword(""),
                  setNewPassword(""),
                  setOldPassword("");
              }}
              className=" h-10 rounded-lg bg-red-600  uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-2 "
            >
              ยกเลิก
            </button>

            {confirmPassword === newPassword &&
            confirmPassword != "" &&
            newPassword != "" &&
            oldPassword != "" ? (
              <button
                onClick={checkPassword}
                className=" h-10 rounded-lg bg-blue-600  uppercase font-semibold hover:bg-blue-700 text-gray-100 transition px-2 "
              >
                บันทึกและเปลี่ยนแปลง
              </button>
            ) : null}
          </>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileComp;

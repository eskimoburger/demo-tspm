import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: 200,
//     },
//   },
// }));

const ProfileComp = ({ studentDetail, imgProfile }) => {
  const [editStudent, setEditStudent] = useState(studentDetail);
  //const [img,setImg] = useState(imageProfile);

  // console.log(imageProfile)//   React.useEffect(() => {
  //     setEditStudent(studentDetail);
  //   }, []);

  const handleChangeStudent = (event) => {
    const { name, value } = event.target;
    setEditStudent((prevStudent) => {
      return {
        ...prevStudent,
        [name]: value,
      };
    });
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
            height: "280px",
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
            {" "}
            <button className="  hover:bg-red-200 rounded-sm text-red-600 text-lg   w-full py-2">
              Upload picture
            </button>
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
            <div className="flex justify-end  ">
              <button
                className="bg-red-500 text-white p-2 rounded-xl"
                onClick={() => alert(JSON.stringify(editStudent))}
              >
                บันทึกข้อมูลส่วนตัว
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;

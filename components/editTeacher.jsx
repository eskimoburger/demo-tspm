import React, { useEffect, useState } from "react";
import styles from "../styles/edit_techer.module.scss";
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

export default function editTeacher() {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    getAllteachher();
  }, []);


  const [open, setOpen] = useState(false);
  const [teacherValue,setTeacherValue]=useState("");
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllteachher = async () => {
    await axios
      .get("https://demo-tspm-server.herokuapp.com/allteacher")
      .then((res) => {
        console.log(res.data);

        setTeachers(res.data);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };
  function handleChange(event) {
    setTeacherValue(event.target.value)   ;
  }
  function handleSubmit(event) {
    
    event.preventDefault();
    

    axios.post("https://demo-tspm-server.herokuapp.com/allteacher/teachers",{teacher_name:teacherValue}).then((res)=>{
      console.log(res.data)
      
      getAllteachher();
      setTeacherValue("")
    setOpen(false)
    
      
    })
   

  }

  return (
    <>
      <h1 style={{ fontSize: "28px" }}>รายชื่ออาจารย์ทั้งหมดที่มีอยู่ในระบบ</h1>
      <br />
      <div>
        <button className="bg-green-500 text-white p-2 mr-2" onClick={handleClickOpen}>
          เพิ่มรายชื่ออาจารย์
        </button>
      </div>

      <br />
      <div style={{ width: "800px" }}>
        <div className={styles.table_teacher}>
          <table>
              <thead>
            <tr>

              <th>#</th>
              <th>รายชื่ออาจารย์</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
            </thead>
            <tbody>

            {teachers.map((teacher, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{teacher.name}</td>
                  <td style={{ textAlign: "center" }}>
                    <button className="bg-yellow-300 text-black p-2 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white p-2">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <br />

      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">เพิ่มรายชื่ออาจารย์</p>{" "}
        </DialogTitle>
        <DialogContent dividers>

            <form id="input_teacher" onSubmit={handleSubmit} >
                <label htmlFor="teacher_name" className="" ><span className="text-red-600  ">*</span> กรุณากรอกชื่ออาจารย์ : </label>
                <input required id = "teacher_name" type="text" onChange={handleChange} value={teacherValue}   placeholder="ชื่ออาจารย์" style={{width:"400px" ,border:"1px solid #ddd",padding:"10px"}} />
            </form>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            ยกเลิก
          </Button>
          <Button type="submit" form="input_teacher" variant="contained" style={{backgroundColor:"green", color:"white"}} >
            ตกลง
          </Button>
         
        </DialogActions>
      </Dialog>

    </>
  );
}

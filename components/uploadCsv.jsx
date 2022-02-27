import React, { useEffect, useState } from "react";
import axios from "axios";
import CSVReader from "react-csv-reader";
import styles from "../styles/upload.module.scss";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function uploadCsv() {


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const handleForce = (data, fileInfo) => {
    setStudents(data);
    console.log(data, fileInfo, data.length);
  };

 

  return (
    <div>
      <p className="text-4xl mb-2">เพิ่มรายชื่อนักเรียน</p>
      <div className="p-5">
        <CSVReader
          cssLabelClass={styles.csv}
          label="โปรดเลือกไฟล์รายชื่อของนักเรียนที่ต้องการบันทึกลงบนฐานข้อมูล"
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
          inputStyle={{ display: "block", fontSize: "16px" }}
        />
        <br />
        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          onClick={handleClickOpen}
        >
          {" "}
          แสดงตัวอย่าง
        </button>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">ตัวอย่างตารางแสดงรายชื่อนักเรียน</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          <div className={styles.table_csv}>
            <table>
            <thead>
              <tr>
                <th>#</th>
                <th>รหัสนิสิต</th>
                <th>คำนำหน้า(ภาษาไทย)</th>
                <th>ชื่อ(ภาษาไทย)</th>
                <th>นามสกุล(ภาษาไทย)</th>
                <th>คำนำหน้า(ภาษาอังกฤษ)</th>
                <th>ชื่อ(ภาษาอังกฤษ)</th>
                <th>นามสกุล(ภาษาอังกฤษ)</th>
                <th>อีเมลล์</th>
              </tr>
              </thead>
              <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.studentcode}</td>
                  <td>{student.prefixname}</td>
                  <td>{student.studentname}</td>
                  <td>{student.studentsurname}</td>
                  <td>{student.prefixnameeng}</td>
                  <td>{student.studentnameeng}</td>
                  <td>{student.studentsurnameeng}</td>
                  <td>{student.studentemail}</td>
                </tr>
              ))}
              </tbody>
            </table>

          </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} variant="contained"  style={{backgroundColor:"green",color:"white"}}>
            อัพโหลดรายชื่อนักเรียน
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>

      {/* {students.map((student) => {
        return (
          <div key={student.studentcode}>
            <p>{student.studentcode}</p>
          </div>
        );
      })} */}
    </div>
  );
}

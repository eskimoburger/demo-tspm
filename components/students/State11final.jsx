import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { MenuItem, Select, TextField } from "@material-ui/core";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function state11({ projectId, projectNameENG, functionNext }) {
  useEffect(() => {
    getTeacherByIdProjectStage10(projectId);
  }, []);

  const getTeacherByIdProjectStage10 = async (id) => {
    await axios
      .get(`https://demo-tspm-server.herokuapp.com/final-project/get-teacher-state10/${id}`)
      .then((response) => {
        console.log(response.data.results.length);
        console.log(response.data);
        setTeachers(response.data.results);
      });
  };
  const [checkButton, setCheckButton] = useState(false);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    checkExamResults();
  }, [teachers]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateFieldChanged = (index) => (e) => {
    // console.log("index: " + index);
    // console.log("property name: " + e.target.value);
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

  const checkExamResults = () => {
    let newArr = [...teachers];

    let checkArray = [];

    newArr.map((e) => {
      checkArray.push(e.exam_value);
    });
    //console.log(checkArray);
    let check = checkArray.every((value) => value.length > 0);

    //console.log(check)
    setCheckButton(check);
    //return
  };

  const sendFinalExamResult = async () => {
    await axios
      .post(
        `https://demo-tspm-server.herokuapp.com/final-project/results-state10/${projectId}`,
        {
          teachers: teachers,
          project_eng: projectNameENG,
        }
      )
      .then((_) => {
        functionNext();
      })
      .catch((_) => {
        alert("Cannot send final results!!");
      });
  };
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
        แบบบันทึกผลการสอบโครงงาน
      </div>
      {/* <button
        onClick={() => {
          sendFinalExamResult();
        }}
      >
        TEST DATA
      </button> */}

      <div
        className="my-4 mx-auto py-4 px-6 rounded-xl"
        style={{
          width: "90%",
          fontSize: "18px",
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <h1 className="text-3xl font-bold mb-2"> ผลการสอบและสรุปข้อเสนอแนะ</h1>

        {teachers.map((teacher, index) => {
          return (
            <div key={index} className="mx-auto text-2xl" style={{}}>
              <h2 className=" font-bold">{teacher.role}</h2>
              <div className="flex justify-between gap-2  flex-wrap ">
                <label className="" htmlFor={teacher.id_teacher} style={{}}>
                  {teacher.committee_name}{" "}
                </label>
                <div className="bg-gray-200" style={{ width: "200px" }}>
                  <Select
                    id={teacher.id_teacher}
                    value={teacher.exam_value}
                    onChange={updateFieldChanged(index)}
                    displayEmpty
                    fullWidth
                    style={{ fontSize: 18 }}
                    //className={classes.selectEmpty}
                    //inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      ความคิดเห็นผู้ประเมิน
                    </MenuItem>
                    <MenuItem value="ผ่าน">ผ่าน</MenuItem>
                    <MenuItem value="ไม่ผ่าน">ไม่ผ่าน</MenuItem>
                    <MenuItem value="1" disabled>
                      ผ่านแบบมีเงื่อนไข
                    </MenuItem>
                    <MenuItem value="สอบใหม่">สอบใหม่</MenuItem>
                    <MenuItem value="ไม่สอบใหม่">ไม่ต้องสอบใหม่</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="my-2">
                <TextField
                  fullWidth
                  onChange={updateFieldChangedDetail(index)}
                  placeholder={"สรุปข้อเสนอแนะ ของ " + teacher.committee_name}
                  variant="outlined"
                  inputProps={{ style: { fontSize: 18 } }}
                  multiline
                  rows={6}
                  value={teachers.exam_detail}
                />
              </div>
            </div>
          );
        })}
        <br />
        {/* <button
          className="w-full bg-blue-500 rounded-md py-1 text-white text-xl "
          style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
          onClick={() => {
            handleClickOpen();
          }}
        >
          {" "}
          ส่งแบบบันทึกผลการสอบหัวข้อโครงงาน
        </button> */}
        {checkButton && (
          <Button
            onClick={() => {
              handleClickOpen();
            }}
            variant="contained"
            fullWidth
            color="primary"
            size="large"
            startIcon={<NavigateNextOutlinedIcon />}
            style={{ fontSize: 20 }}
          >
            ดำเนินการต่อ
          </Button>
        )}
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
          {" "}
          <p className="text-3xl"> ยืนยันบันทึกผลการสอบหัวข้อโครงงาน</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          {teachers.map((teacher, index) => {
            return (
              <div key={index} className="mb-4 text-xl">
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
            onClick={sendFinalExamResult}
            style={{ backgroundColor: "green", color: "white" }}
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

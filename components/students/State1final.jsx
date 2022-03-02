import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from '@material-ui/icons/Assignment';
const CssTextField = withStyles({
  root: {
    backgroundColor: "#f5f5f5",
    color: "black",
    borderRadius: 10,
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#eeeeee",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#eeeeee",
      },
      "&:hover fieldset": {
        borderColor: "#eeeeee",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#eeeeee",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
    fontSize: 16,
    fontWeight: 500,
    backgroundColor: "#1b5e20",
    "&:hover": {
      backgroundColor: "#2e7d32",
    },
  },
  buttonSend: {
    margin: theme.spacing(1),
    color: "white",
    fontSize: 20,
    fontWeight: 500,
    backgroundColor: "#0288d1",
    "&:hover": {
      backgroundColor: "#039be5",
    },
  },
}));
const DEFAULT_PROJECT = {
  project_name_th: "",
  project_name_eng: "",
  project_description: "",
};
const DEFAULT_TEACHER_VALUE = {
  teacher: "",
  role: "",
};

const State1final = ({ user ,refreshData}) => {
  useEffect(() => {
    const fetchAllList = async () => {
      const resData = await axios.get(`https://demo-tspm-server.herokuapp.com/final-fetch`);
      const { studentList, teacherList } = resData.data;
      setTeacherList(teacherList);
      setStudentList(studentList);
    };
    fetchAllList();
  }, []);
  const classes = useStyles();
  const router = useRouter();


  const { id, prefix_th, thname, thlastname } = user;
  const [project, setProject] = useState(DEFAULT_PROJECT);
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [studentValue, setStudentValue] = useState("");
  const [teacherValue, setTeacherValue] = useState(DEFAULT_TEACHER_VALUE);
  const [selectedTeacher, setSelectedTeacher] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([
    {
      id: id,
      name: `${prefix_th} ${thname} ${thlastname}`,
    },
  ]);
  const [openEditTeacher, setOpenEditTeacher] = useState(false);
  const [openEditStudent, setOpenEditStudent] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleChangeProject = (event) => {
    const { name, value } = event.target;
    setProject((prevProject) => {
      return {
        ...prevProject,
        [name]: value,
      };
    });
  };
  const handleRemoveTeacher = (selected) => {
    const newSelected = selectedTeacher.filter((t) => t !== selected);
    setSelectedTeacher(newSelected);
  };
  const handleRemoveStudent = (selected) => {
    const newSelected = selectedStudent.filter((t) => t !== selected);
    setSelectedStudent(newSelected);
  };

  const finalApiState1 = () => {
    setOpenConfirm(false);

    axios
      .post("/api/state1", {
        project_th: project.project_name_th,
        project_eng: project.project_name_eng,
        project_des: project.project_description,
        selectedStudent: selectedStudent,
        selectedTeacher: selectedTeacher,
      })
      .then((_) => refreshData(),alert("Success"))
      .catch((_) => {
        alert("Cannot send data!");
      });
  };

  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  flex justify-center items-center text-2xl text-white gap-4 py-2 rounded-md font-bold "
        style={{
          width: "400px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#59981A",
        }}
      >
        <AssignmentIcon/> แบบฟอร์มเสนอหัวข้อโครงงาน
      </div>
      <div className="mt-4 mx-auto space-y-4 text-xl" style={{ width: "95%" }}>
        <h2 className="font-bold">ชื่อโครงงานภาษาไทย </h2>
        <CssTextField
          fullWidth
          name="project_name_th"
          placeholder="ชื่อโครงงานภาษาไทย..."
          className=" "
          variant="outlined"
          inputProps={{ style: { fontSize: 18 } }}
          onChange={handleChangeProject}
          value={project.project_name_th}
        />
        <h2 className="font-bold">ชื่อโครงงานภาษาอังกฤษ </h2>
        <CssTextField
          fullWidth
          name="project_name_eng"
          placeholder="ชื่อโครงงานภาษาอังกฤษ..."
          className=" "
          variant="outlined"
          inputProps={{ style: { fontSize: 18 } }}
          onChange={handleChangeProject}
          value={project.project_name_eng}
        />
        <h2 className="font-bold"> รายละเอียดโครงงานโดยย่อ </h2>
        <CssTextField
          fullWidth
          onChange={handleChangeProject}
          name="project_description"
          //   id="project_name_eng"
          placeholder="รายละเอียดโครงงานโดยย่อ..."
          className=" "
          variant="outlined"
          inputProps={{ style: { fontSize: 18 } }}
          multiline
          rows={5}
          value={project.project_description}
        />
        <h2 className="font-bold"> อาจารย์ประจำโครงงาน </h2>
        {selectedTeacher.length === 0 ? (
          <p className=" text-red-500">* ยังไม่ได้เลือกอาจารย์ประจำรายวิชา </p>
        ) : (
          <div>
            {selectedTeacher.map((teacher, index) => {
              return (
                <div
                  className=" gap-2 my-2 flex justify-between flex-wrap"
                  key={index}
                >
                  <p>
                    {index + 1}. ชื่ออาจารย์ {JSON.parse(teacher.teacher).name}{" "}
                    สถานะ {teacher.role}
                  </p>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleRemoveTeacher(teacher);
                    }}
                    startIcon={<DeleteIcon />}
                  >
                    นำออก
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => setOpenEditTeacher(true)}
        >
          เพิ่มอาจารย์ประจำโครงงาน
        </Button>
        <h2 className="font-bold"> สมาชิกในกลุ่ม</h2>
        <div>
          {selectedStudent.map((student, index) => {
            if (index == 0) {
              return (
                <div className="" style={{ marginBottom: 16 }} key={index}>
                  <p>
                    {index + 1}. รหัสนิสิต {student.id} ชื่อ-นามสกุล{" "}
                    {student.name}
                  </p>
                </div>
              );
            }
            return (
              <div
                className="flex justify-between flex-wrap"
                style={{ marginBottom: 12 }}
                key={index}
              >
                <p>
                  {index + 1}. รหัสนิสิต {student.id} ชื่อ-นามสกุล{" "}
                  {student.name}
                </p>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleRemoveStudent(student);
                  }}
                  startIcon={<DeleteIcon />}
                >
                  นำออก
                </Button>
              </div>
            );
          })}
        </div>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => setOpenEditStudent(true)}
        >
          เพิ่มสมาชิกในกลุ่ม
        </Button>
      </div>
      <br />
      {project.project_name_th.length > 0 &&
        project.project_name_eng.length > 0 &&
        project.project_description.length > 0 &&
        selectedTeacher.length >= 3 && (
          <Button
            variant="contained"
            fullWidth
            type="button"
            className={classes.buttonSend}
            startIcon={<SendIcon />}
            onClick={() => setOpenConfirm(true)}
          >
            ส่งแบบฟอร์มเสนอหัวข้อโครงงาน
          </Button>
        )}
      <Dialog fullWidth maxWidth={"md"} open={openEditTeacher}>
        <DialogTitle>{"เพิ่มอาจารย์ประจำโครงงาน"}</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <Select
              value={teacherValue.teacher}
              onChange={(e) =>
                setTeacherValue((prev) => {
                  return { ...prev, ["teacher"]: e.target.value };
                })
              }
              displayEmpty
              //inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>
                กรุณาเลือกอาจารย์ประจำโครงงาน
              </MenuItem>
              {teacherList.map((teacher, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={`{"name":"${teacher.name}","id":${teacher.id}}`}
                  >
                    {teacher.name}
                  </MenuItem>
                );
              })}
            </Select>

            <div className="flex justify-center  gap-2 text-base mt-4    ">
              <button
                className={`border  px-2 py-1 rounded-md hover:bg-blue-500  hover:text-white transition duration-200  ${
                  teacherValue.role === "อาจารย์ที่ปรึกษา"
                    ? "bg-blue-500 text-white"
                    : ""
                } `}
                onClick={() =>
                  setTeacherValue((prev) => {
                    return { ...prev, ["role"]: "อาจารย์ที่ปรึกษา" };
                  })
                }
              >
                อาจารย์ที่ปรึกษา
              </button>
              <button
                className={`border   px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white transition duration-200  ${
                  teacherValue.role === "อาจารย์ที่ปรึกษาร่วม"
                    ? "bg-blue-500 text-white"
                    : ""
                } `}
                onClick={() =>
                  setTeacherValue((prev) => {
                    return { ...prev, ["role"]: "อาจารย์ที่ปรึกษาร่วม" };
                  })
                }
              >
                อาจารย์ที่ปรึกษาร่วม
              </button>
              <button
                className={`border  px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white  transition duration-200 ${
                  teacherValue.role === "กรรมการ"
                    ? "bg-blue-500 text-white"
                    : ""
                } `}
                onClick={() =>
                  setTeacherValue((prev) => {
                    return { ...prev, ["role"]: "กรรมการ" };
                  })
                }
              >
                กรรมการ
              </button>
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={() => {
              setOpenEditTeacher(false), setTeacherValue(DEFAULT_TEACHER_VALUE);
            }}
            color="secondary"
          >
            ยกเลิก
          </Button>
          {teacherValue.teacher.length > 0 && teacherValue.role.length > 0 && (
            <Button
              type="button"
              onClick={() => {
                setOpenEditTeacher(false),
                  setSelectedTeacher((prev) => {
                    return [...prev, teacherValue];
                  });
                setTeacherValue(DEFAULT_TEACHER_VALUE);
              }}
              color="primary"
            >
              ตกลง
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth={"md"} open={openEditStudent}>
        <DialogTitle>{"เพิ่มสมาชิกในกลุ่ม"}</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <Select
              value={studentValue}
              onChange={(e) => {
                setStudentValue(e.target.value);
              }}
              displayEmpty
              //inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>
                กรุณาเลือกสมาชิกภายในกลุ่ม
              </MenuItem>
              {studentList.map((student, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={`{"id":${student.id},"name":"${student.name}"}`}
                  >
                    {student.id} {student.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditStudent(false)} color="secondary">
            ยกเลิก
          </Button>
          {studentValue.length > 0 && (
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setSelectedStudent((prev) => {
                  return [...prev, JSON.parse(studentValue)];
                });
                setStudentValue("");
                setOpenEditStudent(false);
              }}
            >
              เพิ่ม
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth={"md"} open={openConfirm}>
        <DialogTitle>{"ยืนยันการส่งแบบฟอร์มเสนอหัวข้อโครงงาน"}</DialogTitle>
        <DialogContent dividers>
          <div className="text-xl  ">
            <p>
              <span className="font-bold">ชื่อโครงงาน (ภาษาไทย) : </span>
              {project.project_name_th}
            </p>
            <p>
              <span className="font-bold">ชื่อโครงงาน (ภาษาอังกฤษ) : </span>{" "}
              {project.project_name_eng}
            </p>
            <div className="">
              <h4 className="font-bold">รายละเอียดโครงงาน </h4>
              <p className="my-2" style={{ wordWrap: "break-word",textIndent:20 }}>
                {" "}
                {project.project_description}
              </p>
            </div>
            <h4 className="font-bold">สมาชิกในกลุ่ม </h4>
            {selectedStudent.map((student, index) => {
              return (
                <div className="ml-3 my-3" key={index}>
                  <p>
                    {index + 1}. รหัสนิสิต {student.id} ชื่อ-นามสกุล{" "}
                    {student.name}
                  </p>
                </div>
              );
            })}
            <h4 className="font-bold">อาจารย์ประจำโครงงาน </h4>
            {selectedTeacher.map((teacher, index) => {
              return (
                <div className="ml-4 my-3" key={index}>
                  <p>
                    {index + 1}. ชื่ออาจารย์ {JSON.parse(teacher.teacher).name}{" "}
                    สถานะ {teacher.role}
                  </p>
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>setOpenConfirm(false)} variant="contained" color="secondary">
          ยกเลิก
        </Button>
        <Button
            color="primary"
            variant="contained"
          onClick={finalApiState1}
        >
          ยืนยัน
        </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default State1final;

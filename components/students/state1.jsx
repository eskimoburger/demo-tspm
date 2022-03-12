import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/newpropose.module.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function State1(props) {
  useEffect(() => {
    const fetchAllList = async () => {
      const resData = await axios.get(`http://localhost:3001/final-fetch`);
      const { studentList, teacherList } = resData.data;
      setTeacherList(teacherList);
      setStudentList(studentList);
    };
    fetchAllList();
  }, []);

  const router = useRouter();

  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherValue, setTeacherValue] = useState({
    teacher: "",
    role: "",
  });
  const [studentValue, setStudentValue] = useState("");
  const [number, setNumber] = useState(0);

  const [selectedTeacher, setSelectedTeacher] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([
    {
      id: props.user.id,
      name: `${props.user.prefix_th} ${props.user.thname} ${props.user.thlastname}`,
    },
  ]);

  const [project, setProject] = useState({
    projectName_TH: "",
    projectName_ENG: "",
    detail: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (number) => {
    setOpen(true);
    setNumber(number);
    console.log(number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const finalApiState1 = () => {
    setOpen(false);

    axios
      .post("/api/state1", {
        project_th: project.projectName_TH,
        project_eng: project.projectName_ENG,
        project_des: project.detail,
        selectedStudent: selectedStudent,
        selectedTeacher: selectedTeacher,
      })
      .then((_) => router.push("/students"))
      .catch((_) => {
        alert("Cannot send data!");
      });
  };

  const handleChangeProject = (event) => {
    const { name, value } = event.target;
    setProject((prevProject) => {
      return {
        ...prevProject,
        [name]: value,
      };
    });
  };

  const handleRemoveStudent = (selected) => {
    const newSelected = selectedStudent.filter((t) => t !== selected);
    setSelectedStudent(newSelected);
  };

  const handleRemoveTeacher = (selected) => {
    const newSelected = selectedTeacher.filter((t) => t !== selected);
    setSelectedTeacher(newSelected);
  };

  // const sendPurpose = () =>{
  //   console.log(JSON.parse(selectedTeacher[0].teacher));

  //   axios
  //   .post("http://localhost:3001/project/addprojectdatatest", {
  //     project_th: project.projectName_TH,
  //     project_eng: project.projectName_ENG,
  //     project_des: project.detail,
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //     alert("Complete");
  //   });

  //   for (let i = 0; i < selectedStudent.length; i++) {
  //     axios
  //       .post("http://localhost:3001/project/addproject", {
  //         project_th: project.projectName_TH,
  //         project_eng: project.projectName_ENG,
  //         members: selectedStudent[i].id,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         alert("Complete2");

  //       });

  //   }

  //   for (let i = 0; i < selectedTeacher.length; i++) {
  //     var id = JSON.parse(selectedTeacher[i].teacher).id
  //     var name = JSON.parse(selectedTeacher[i].teacher).name
  //     var role = selectedTeacher[i].role;
  //     var pnameEN = project.projectName_ENG;
  //     axios.post("http://localhost:3001/project/addcommitproject", {
  //       committee_name: name,
  //       role: role,
  //       id_teacher: id,
  //       project_eng: pnameEN,
  //     }).then((response) => {

  //     });
  //   }

  //   for (let i = 0; i < selectedTeacher.length; i++) {
  //     var id = JSON.parse(selectedTeacher[i].teacher).id
  //     var name = JSON.parse(selectedTeacher[i].teacher).name
  //     var role = selectedTeacher[i].role;
  //     var pnameEN = project.projectName_ENG;
  //     var description = `${pnameEN} ได้ส่งคำขอให้ ${name} เป็น ${role} ประจำโครงงาน`
  //     var state_name = "เสนอหัวข้อโครงงาน"

  //     axios.post("http://localhost:3001/notification/", {
  //       description: description,
  //       state_name: state_name,
  //       id_teacher: id,
  //       project_name_eng: pnameEN,
  //     }).then((response) => {
  //       console.log(response.data);
  //       //alert('ได้ป่าววะ notification')
  //     });
  //   }

  //   props.function();
  // }

  var titleContent = null;
  var modalContent = null;
  var actionModal = null;

  if (number == 1) {
    titleContent = <p className="text-2xl">เพิ่มอาจารย์ประจำโครงงาน</p>;
    modalContent = (
      <div>
        <select
          value={teacherValue.teacher}
          className="text-xl bg-gray-100"
          onChange={(e) =>
            setTeacherValue((prev) => {
              return { ...prev, ["teacher"]: e.target.value };
            })
          }
        >
          <option hidden>กรุณาเลือกอาจารย์</option>
          {teacherList.map((teacher, index) => {
            return (
              <option
                key={index}
                value={`{"name":"${teacher.name}","id":${teacher.id}}`}
              >
                {teacher.name}
              </option>
            );
          })}
        </select>
        <div className={styles.InputGroup} style={{ marginTop: "10px" }}>
          <input
            id="advisor"
            type="radio"
            name="role"
            value="อาจารย์ที่ปรึกษา"
            checked={teacherValue.role === "อาจารย์ที่ปรึกษา"}
            onChange={(e) =>
              setTeacherValue((prev) => {
                return { ...prev, ["role"]: e.target.value };
              })
            }
          />
          <label htmlFor="advisor">อาจารย์ที่ปรึกษา</label>

          <input
            id="co_advisor"
            type="radio"
            name="role"
            value="อาจารย์ที่ปรึกษาร่วม"
            checked={teacherValue.role === "อาจารย์ที่ปรึกษาร่วม"}
            onChange={(e) =>
              setTeacherValue((prev) => {
                return { ...prev, ["role"]: e.target.value };
              })
            }
          />
          <label htmlFor="co_advisor">อาจารย์ที่ปรึกษาร่วม</label>

          <input
            id="committee"
            type="radio"
            name="role"
            value="กรรมการ"
            checked={teacherValue.role === "กรรมการ"}
            onChange={(e) =>
              setTeacherValue((prev) => {
                return { ...prev, ["role"]: e.target.value };
              })
            }
          />
          <label htmlFor="committee">กรรมการ</label>
        </div>
      </div>
    );
    actionModal = (
      <>
        <Button onClick={handleClose} variant="contained" color="secondary">
          ยกเลิก
        </Button>
        {teacherValue.teacher == "" || teacherValue.role == "" ? (
          <div></div>
        ) : (
          <Button
            form="update-id"
            type="submit"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={() => {
              setSelectedTeacher((prev) => {
                return [...prev, teacherValue];
              });
              setTeacherValue({
                teacher: "",
                role: "",
              });
            }}
          >
            เพิ่ม
          </Button>
        )}
      </>
    );
  }

  //////
  if (number == 2) {
    titleContent = <p className="text-2xl">เพิ่มสมาชิกในกลุ่ม</p>;
    modalContent = (
      <select
        value={studentValue}
        className="text-xl bg-gray-100"
        onChange={(e) => {
          setStudentValue(e.target.value);
        }}
      >
        <option hidden>กรุณาเลือกสมาชิกภายในกลุ่ม</option>
        {studentList.map((student, index) => {
          return (
            <option
              key={index}
              value={`{"id":${student.id},"name":"${student.name}"}`}
            >
              {student.id} {student.name}
            </option>
          );
        })}
      </select>
    );

    actionModal = (
      <>
        <Button onClick={handleClose} variant="contained" color="secondary">
          ยกเลิก
        </Button>
        {studentValue != "" ? (
          <Button
            form="update-id"
            type="submit"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={() => {
              setSelectedStudent((prev) => {
                return [...prev, JSON.parse(studentValue)];
              });
              setStudentValue("");
              console.log(selectedStudent);
            }}
          >
            เพิ่ม
          </Button>
        ) : (
          <div></div>
        )}
      </>
    );
  }

  if (number == 3) {
    titleContent = (
      <p className="text-2xl">ยืนยันการส่งแบบฟอร์มเสนอหัวข้อโครงงาน</p>
    );
    modalContent = (
      <div className="text-xl">
        <p>ชื่อโครงงาน (ภาษาไทย) : {project.projectName_TH}</p>
        <p>ชื่อโครงงาน (ภาษาอังกฤษ) : {project.projectName_ENG}</p>
        <div>
          รายละเอียดโครงงาน :{" "}
          <span style={{ wordWrap: "break-word" }}> {project.detail}</span>
        </div>
        สมาชิกในกลุ่ม
        {selectedStudent.map((student, index) => {
          return (
            <div className="ml-3 my-3" key={index}>
              <p>
                {index + 1}. รหัสนิสิต {student.id} ชื่อ-นามสกุล {student.name}
              </p>
            </div>
          );
        })}
        อาจารย์ประจำโครงงาน
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
    );

    actionModal = (
      <>
        <Button onClick={handleClose} variant="contained" color="secondary">
          ยกเลิก
        </Button>

        <Button
          // form="update-id"
          // type="submit"
          style={{ backgroundColor: "green", color: "white" }}
          onClick={finalApiState1}
        >
          ยืนยัน
        </Button>
      </>
    );
  }

  const teacherContent = (
    <div>
      {selectedTeacher.length == 0 ? (
        <p className=" text-red-500">
          ***** ยังไม่ได้เลือกอาจารย์ประจำรายวิชา *****
        </p>
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
                <button
                  className="mr-10 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
                  style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
                  onClick={() => {
                    handleRemoveTeacher(teacher),
                      console.log(JSON.parse(teacher.teacher).id);
                  }}
                >
                  <i className="bx bx-minus mr-2"></i>ลบ
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const studentContent = (
    <div>
      {selectedStudent.map((student, index) => {
        if (index == 0) {
          return (
            <div className="ml-4" key={index}>
              <p>
                {index + 1}. รหัสนิสิต {student.id} ชื่อ-นามสกุล {student.name}
              </p>
            </div>
          );
        }
        return (
          <div className="ml-4 my-3 flex justify-between" key={index}>
            <p>
              {index + 1}. รหัสนิสิต {student.id} ชื่อ-นามสกุล {student.name}
            </p>
            <button
              className="mr-10 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
              style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
              onClick={() => {
                handleRemoveStudent(student);
              }}
            >
              <i className="bx bx-minus mr-2"></i>ลบ
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className=" bg-white  rounded-md p-5 mt-5"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div
        className="  text-center text-2xl text-white py-2 rounded-md font-bold "
        style={{
          width: "400px",
          height: "50px",
          marginTop: "-25px",
          marginLeft: "-25px",
          boxShadow: "#00000038 1.95px 1.95px 1.95px",

          backgroundColor: "#59981A",
        }}
      >
        แบบฟอร์มเสนอหัวข้อโครงงาน
      </div>
      {/* <button onClick={() => finalApi()}>TestAPI</button> */}
      <div className="flex flex-col px-2  space-y-4">
        <div className="mt-5">
          <label htmlFor="project_th" className="text-xl ">
            ชื่อโครงงานภาษาไทย{" "}
          </label>
          <input
            className="  bg-gray-200 mt-4 rounded-md p-5"
            style={{ height: "30px", width: "100%" }}
            id="project_th"
            type="text"
            placeholder="ชื่อโครงงานภาษาไทย..."
            name="projectName_TH"
            onChange={handleChangeProject}
            value={project.projectName_TH}
          />
        </div>
        <div>
          <label htmlFor="project_en" className="text-xl ">
            ชื่อโครงงานภาษาอังกฤษ{" "}
          </label>
          <input
            className="  bg-gray-200 mt-4 rounded-md p-5"
            style={{ height: "30px", width: "100%" }}
            id="project_en"
            type="text"
            placeholder="ชื่อโครงงานภาษาอังกฤษ..."
            name="projectName_ENG"
            onChange={handleChangeProject}
            value={project.projectName_ENG}
          />
        </div>
        <div>
          <label htmlFor="detail" className="text-xl ">
            รายละเอียดโครงงานโดยย่อ{" "}
          </label>
          <textarea
            className="  bg-gray-100 mt-4 rounded-md p-1 "
            rows="5"
            id="detail"
            style={{ width: "100%" }}
            placeholder="รายละเอียดโครงงานโดยย่อ..."
            name="detail"
            onChange={handleChangeProject}
            value={project.detail}
          />
        </div>
        <div className="text-xl">อาจารย์ประจำโครงงาน</div>

        {teacherContent}

        <button
          type="button"
          className="text-xl px-4 py-1  rounded-lg font-bold text-white"
          style={{
            backgroundColor: "#32CD30",
            boxShadow: "#00000038 1.95px 1.95px 1.95px",
            width: "100px",
          }}
          onClick={() => {
            handleClickOpen(1);
          }}
        >
          <i className="bx bx-plus mr-2"></i>เพิ่ม
        </button>
        <div className="text-xl">สมาชิกในกลุ่ม</div>
        {studentContent}

        <button
          type="button"
          className="text-xl px-4 py-1  rounded-lg font-bold text-white"
          style={{
            backgroundColor: "#32CD30",
            boxShadow: "#00000038 1.95px 1.95px 1.95px",
            width: "100px",
          }}
          onClick={() => {
            handleClickOpen(2);
          }}
        >
          <i className="bx bx-plus mr-2"></i>เพิ่ม
        </button>
        {project.projectName_TH == "" ||
        project.projectName_ENG == "" ||
        project.detail == "" ||
        selectedTeacher.length == 0 ? (
          <div></div>
        ) : (
          <button
            type="button"
            className="text-xl px-4 py-2 bg-blue-500 hover:bg-blue-400  rounded-lg font-bold text-white"
            style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
            onClick={() => {
              console.log(project);
              handleClickOpen(3);
            }}
          >
            <i className="bx bx-send mr-2"></i>ส่งแบบฟอร์มเสนอหัวข้อโครงงาน
          </button>
        )}

        <div>
          <div>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              fullWidth={number == 3 ? true : false}
              maxWidth={number == 3 ? "lg" : false}
              onClose={handleClose}
              style={number == 2 ? { marginTop: "-500px" } : {}}
            >
              <DialogTitle>{titleContent} </DialogTitle>
              <DialogContent dividers>{modalContent}</DialogContent>
              <DialogActions>{actionModal}</DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

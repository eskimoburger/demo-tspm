import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
//import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalEdit = ({
  editDetail,
  idProject,
  onClose,
  editSListP,
  editTListP,
  projectEditP,
}) => {

  //console.log("55555")
  useEffect(() => {
    setEditSList(editSListP);
  }, [editSListP]);
  useEffect(() => {
    setEditTList(editTListP);
  }, [editTListP]);
  useEffect(() => {
    setProjectEdit(projectEditP);
  }, [projectEditP]);
  const [editContent, setEditContent] = useState(0);

  const [studentValue, setStudentValue] = useState("");
  const [teacherValue, setTeacherValue] = useState({
    teacher: "",
    role: "",
  });

  const [editSList, setEditSList] = useState([]);
  const [editTList, setEditTList] = useState([]);

  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  //const [editTeacher, setEditTeacher] = useState([]);
  const [addTeacher, setAddTeacher] = useState([]);
  const [delTeacher, setDelTeacher] = useState([]);

  const [addStudent, setAddStudent] = useState([]);
  const [delStudent, setDelStudent] = useState([]);

  const [addSModal, setAddSModal] = useState(false);
  const [addTModal, setAddTModal] = useState(false);

  const [projectEdit, setProjectEdit] = useState(null);


  const handleRemoveStudent = (selected) => {
    const newSelected = editSList.filter((t) => t !== selected);
    setEditSList(newSelected);
    setDelStudent([...delStudent, selected]);
    // setEditSList((prev) => {
    //   return { ...prev, ["name"]: newSelected };
    // });
    // setDelStudent([...delStudent, selected]);
  };
  const handleRemoveTeacher = (selected) => {
    const newSelected = editTList.filter((t) => t !== selected);
    setEditTList(newSelected);
    setDelTeacher([...delTeacher, selected]);
    // setEditSList((prev) => {
    //   return { ...prev, ["name"]: newSelected };
    // });
    // setDelStudent([...delStudent, selected]);
  };
  const cancelDelete = (selected) => {
    const newSelected = delStudent.filter((t) => t !== selected);

    setDelStudent(newSelected);
    setEditSList((prev) => {
      return [...prev, selected];
    });
  };
  const cancelDeleteTeacher = (selected) => {
    const newSelected = delTeacher.filter((t) => t !== selected);

    setDelTeacher(newSelected);
    setEditTList((prev) => {
      return [...prev, selected];
    });
  };

  const handleRemoveStudentInAdd = (selected) => {
    const newSelected = addStudent.filter((t) => t !== selected);
    setAddStudent(newSelected);
  };

  const handleRemoveTeacherInAdd = (selected) => {
    const newSelected = addTeacher.filter((t) => t !== selected);
    setAddTeacher(newSelected);
  };

  function fetchStudentList() {
    axios.get(`https://demo-tspm-server.herokuapp.com/allstudent/test`).then((response) => {
      console.log(response.data.studentList);
      setStudentList(response.data.studentList);
    });
  }
  function fetchTeacherList() {
    axios.get(`https://demo-tspm-server.herokuapp.com/allteacher`).then((response) => {
      console.log(response.data);
      setTeacherList(response.data);
    });
  }

  return (
    <>
      <Dialog
        open={editDetail}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={"md"}
        onClose={onClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl"> แก้ไขข้อมูลโครงงาน </p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          <div className="flex justify-center gap-2 flex-wrap text-sm">
            <button
              onClick={() => setEditContent(1)}
              className="bg-green-800   py-1 px-4 rounded-lg text-white  focus:outline-none "
            >
              แก้ไขรายละเอียดโครงงาน
            </button>
            <button
              onClick={() => {
                setEditContent(2), fetchStudentList();
              }}
              className="bg-green-800   py-1 px-4 rounded-lg text-white  focus:outline-none "
            >
              แก้ไขรายชื่อสมาชิกในกลุ่ม
            </button>
            <button
              onClick={() => {
                setEditContent(3), fetchTeacherList();
              }}
              className="bg-green-800   py-1 px-4 rounded-lg text-white  focus:outline-none "
            >
              แก้ไขรายชื่ออาจารย์ประจำโครงงาน
            </button>
          </div>
          <br />

          {editContent == 1 ? (
            <div>
              <p className="text-2xl text-center"> แก้ไขรายละเอียดโครงงาน</p>

              <br />

              {projectEdit ? (
                <div>
                  <h1 className="text-lg font-bold text-gray-700">
                    ชื่อโครงงานภาษาไทย
                  </h1>
                  <div className="mt-2 mb-2 border-2 py-1 px-3 flex justify-between  rounded-md">
                    <input
                      className="flex-grow outline-none text-gray-800 focus:text-blue-600"
                      type="text"
                      placeholder={projectEdit.project_name_th}
                      value={projectEdit.project_name_th}
                      onChange={(e) =>
                        setProjectEdit((prev) => {
                          return {
                            ...prev,
                            ["project_name_th"]: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <h1 className="text-lg font-bold text-gray-700">
                    ชื่อโครงงานภาษาอังกฤษ
                  </h1>
                  <div className="mt-2 mb-2 border-2 py-1 px-3 flex justify-between  rounded-md">
                    <input
                      className="flex-grow outline-none text-gray-800 focus:text-blue-600"
                      type="text"
                      placeholder={projectEdit.project_name_eng}
                      value={projectEdit.project_name_eng}
                      onChange={(e) =>
                        setProjectEdit((prev) => {
                          return {
                            ...prev,
                            ["project_name_eng"]: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <br />

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        setEditContent(0);
                        setAddStudent([]);
                        setDelStudent([]);
                      }}
                      className="bg-red-500 p-2 text-white rounded-lg focus:outline-none"
                    >
                      ยกเลิก
                    </button>
                    <button className="bg-green-700 p-2 text-white rounded-lg focus:outline-none">
                      ตกลง
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : editContent == 2 ? (
            <div>
              <p className="text-2xl text-center"> แก้ไขรายชื่อสมาชิก</p>
              <br />

              <button
                type="button"
                className=" block text-xl px-4 py-1  rounded-lg font-bold text-white w-full"
                style={{
                  backgroundColor: "#32CD30",
                  boxShadow: "#00000038 1.95px 1.95px 1.95px",
                }}
                onClick={() => {
                  setAddSModal(true);
                  //console.log("hello");
                }}
              >
                <i className="bx bx-plus mr-2"></i>เพิ่มสมาชิกในกลุ่ม
              </button>
              {editSList.map((mem, index) => {
                return (
                  <div
                    key={index}
                    className="ml-4 my-4 text-xl flex justify-between"
                  >
                    <p>
                      {mem.id} {mem.name}
                    </p>
                    <button
                      className="ml-5 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
                      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
                      onClick={() => {
                        handleRemoveStudent(mem);
                      }}
                    >
                      <i className="bx bx-minus mr-2"></i>ลบสมาชิก
                    </button>
                  </div>
                );
              })}
              {addStudent.length != 0 && (
                <div>
                  <p className="my-4 text-2xl font-bold">
                    สมาชิกในกลุ่มที่เพิ่ม
                  </p>
                  {addStudent.map((mem, index) => {
                    return (
                      <div
                        key={index}
                        className="ml-4 my-4 text-xl flex justify-between"
                      >
                        <p>
                          {mem.id} {mem.name}
                        </p>
                        <button
                          className="ml-5 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
                          style={{
                            boxShadow: "#00000038 1.95px 1.95px 1.95px",
                          }}
                          onClick={() => {
                            handleRemoveStudentInAdd(mem);
                          }}
                        >
                          <i className="bx bx-minus mr-2"></i>ยกเลิก
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              {delStudent.length != 0 && (
                <div>
                  <p className="my-4 text-2xl font-bold">สมาชิกในกลุ่มที่ลบ</p>
                  {delStudent.map((mem, index) => {
                    return (
                      <div
                        key={index}
                        className="ml-4 my-4 text-xl flex justify-between"
                      >
                        <p>
                          {mem.id} {mem.name}
                        </p>
                        <button
                          className="ml-5 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
                          style={{
                            boxShadow: "#00000038 1.95px 1.95px 1.95px",
                          }}
                          onClick={() => {
                            cancelDelete(mem);
                          }}
                        >
                          ยกเลิก
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <br />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    onClose();
                    setEditContent(0);
                  }}
                  className="bg-red-500 p-2 text-white rounded-lg focus:outline-none"
                >
                  ยกเลิก
                </button>
                <button className="bg-green-700 p-2 text-white rounded-lg focus:outline-none">
                  ตกลง
                </button>
              </div>
            </div>
          ) : editContent == 3 ? (
            <div>
              <p className="text-2xl text-center">
                {" "}
                แก้ไขรายชื่ออาจารย์โครงงาน
              </p>
              <br />
              <button
                type="button"
                className=" block text-xl px-4 py-1  rounded-lg font-bold text-white w-full"
                style={{
                  backgroundColor: "#32CD30",
                  boxShadow: "#00000038 1.95px 1.95px 1.95px",
                }}
                onClick={() => {
                  setAddTModal(true);
                  //console.log("hello");
                }}
              >
                <i className="bx bx-plus mr-2"></i>เพิ่มอาจารย์ประจำโครงงงาน
              </button>

              {editTList.map((teacher, index) => {
                return (
                  <div
                    key={index}
                    className="ml-4 my-4 text-xl flex justify-between"
                  >
                    <p>
                      ชื่อ {teacher.committee_name}{" "}
                      <span className="font-bold">{teacher.role}</span>
                    </p>

                    <div>
                      <button
                        className="ml-5 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
                        style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
                        onClick={() => {
                          handleRemoveTeacher(teacher);
                        }}
                      >
                        <i className="bx bx-minus mr-2"></i>ลบ
                      </button>
                    </div>
                  </div>
                );
              })}
              {addTeacher.length != 0 && (
                <div>
                  <p className="my-4 text-2xl font-bold">
                    รายชื่ออาจารย์ที่เพิ่ม
                  </p>
                  {addTeacher.map((t, index) => {
                    return (
                      <div
                        key={index}
                        className="ml-4 my-4 text-xl flex justify-between"
                      >
                        <p>
                          {JSON.parse(t.teacher).name}{" "}
                          <span className="font-bold">{t.role}</span>
                        </p>
                        <button
                          className="ml-5 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
                          style={{
                            boxShadow: "#00000038 1.95px 1.95px 1.95px",
                          }}
                          onClick={() => {
                            handleRemoveTeacherInAdd(t);
                          }}
                        >
                          <i className="bx bx-minus mr-2"></i>ยกเลิก
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              {delTeacher.length != 0 && (
                <div>
                  <p className="my-4 text-2xl font-bold">รายชื่ออาจารย์ที่ลบ</p>
                  {delTeacher.map((t, index) => {
                    return (
                      <div
                        key={index}
                        className="ml-4 my-4 text-xl flex justify-between"
                      >
                        <p>
                          {t.committee_name}{" "}
                          <span className="font-bold">{t.role}</span>
                        </p>
                        <button
                          className="ml-5 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
                          style={{
                            boxShadow: "#00000038 1.95px 1.95px 1.95px",
                          }}
                          onClick={() => {
                            cancelDeleteTeacher(t);
                          }}
                        >
                          ยกเลิก
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <br />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    onClose();
                    setEditContent(0);
                    //setEditTList(editTListP)
                    setDelTeacher([]);
                    setAddTeacher([]);
                  }}
                  className="bg-red-500 p-2 text-white rounded-lg focus:outline-none"
                >
                  ยกเลิก
                </button>
                <button className="bg-green-700 p-2 text-white rounded-lg focus:outline-none">
                  ตกลง
                </button>
              </div>
            </div>
          ) : (
            <div className="text-2xl text-center font-bold">
              กรุณาเลือกส่วนที่ต้องการจะแก้ไข...
            </div>
          )}
        </DialogContent>
        {/* <DialogActions>
            <Button
              onClick={() => {
                setEditDetail(false);
                setPEdit(p);
                setAddStudent([]);
                setAddTeacher([]);
                setDelStudent([]);
                setDelTeacher([]);
                setEditTeacher([]);
              }}
              variant="contained"
              color="secondary"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={() => {
                console.log(pEdit);
                console.log(delStudent);
              }}
              // form="update-id"
              // type="submit"
              style={{ backgroundColor: "green", color: "white" }}
            >
              ตกลง
            </Button>
          </DialogActions> */}
      </Dialog>

      <Dialog
        open={addSModal}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={"xs"}
        style={{ marginTop: "-300px" }}
      >
        <DialogTitle>เพิ่มสมาชิกในกลุ่ม </DialogTitle>
        <DialogContent dividers className="text-center">
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setStudentValue("");

              setAddSModal(false);
            }}
            variant="contained"
            color="secondary"
          >
            ยกเลิก
          </Button>
          {studentValue != "" ? (
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => {
                // setMems((prev) => {
                //   return [...prev, JSON.parse(studentValue)];
                // });
                setAddStudent((prev) => {
                  return [...prev, JSON.parse(studentValue)];
                });
                setStudentValue("");
                //console.log(selectedStudent);
              }}
            >
              เพิ่ม
            </Button>
          ) : (
            <div></div>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={addTModal}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={"xs"}
        style={{ marginTop: "-300px" }}
      >
        <DialogTitle>เพิ่มอาจารย์ประจำโครงงาน </DialogTitle>
        <DialogContent dividers>
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
          <div style={{ marginTop: "10px" }}>
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddTModal(false),
                setTeacherValue({
                  teacher: "",
                  role: "",
                });
            }}
            variant="contained"
            color="secondary"
          >
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
                setAddTeacher((prev) => {
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalEdit;

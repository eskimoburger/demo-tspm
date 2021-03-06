import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/manageteacher.module.scss";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Router from "next/router";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Loading from "../Loading";
import Tooltip from "@material-ui/core/Tooltip";
import { VpnKey } from "@material-ui/icons";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ManageProject() {
  const STATE_MAP = {
    1: "เสนอหัวข้อโครงงาน",
    2: "ขอสอบหัวข้อโครงงาน",
    3: "ขอสอบหัวข้อโครงงาน",
    4: "บันทึกผลการสอบหัวข้อโครงงาน",
    5: "บันทึกผลการสอบหัวข้อโครงงาน",
    6: "ประเมินความคืบหน้าโครงงาน",
    7: "ประเมินความคืบหน้าโครงงาน",
    8: "ขอสอบโครงงาน",
    9: "ขอสอบโครงงาน",
    10: "บันทึกผลการสอบโครงงาน",
    11: "บันทึกผลการสอบโครงงาน",
    12: "ประเมินรูปเล่มปริญญานิพนธ์",
    13: "ประเมินรูปเล่มปริญญานิพนธ์",
    14: "ผ่านการประเมินรูปเล่มปริญญานิพนธ์",
  };

  useEffect(() => {
    //fetchTeacherList();
  }, []);

  const [allProject, SetAllProject] = useState([]);

  //---------------test------------------

  const [allP, setAllP] = useState(null);
  const [p, setP] = useState(null);
  const [pEdit, setPEdit] = useState(null);
  const [test, setTest] = useState(false);
  const [id, setId] = useState(0);
  const [idProject, setIdProject] = useState(0);
  const [check, setCheck] = useState(false);
  const [stateNumber, setStateNumber] = useState(0);

  const [projectEdit, setProjectEdit] = useState(null);

  //-------------------------------------

  //Edit teachers & members

  const activeContent = (number) => {
    setEditContent(number);
  };

  const [editContent, setEditContent] = useState(0);

  const [editSList, setEditSList] = useState([]);
  const [studentValue, setStudentValue] = useState("");
  const [teacherValue, setTeacherValue] = useState({
    teacher: "",
    role: "",
  });

  const [editTList, setEditTList] = useState([]);

  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  const [editTeacher, setEditTeacher] = useState([]);
  const [addTeacher, setAddTeacher] = useState([]);
  const [delTeacher, setDelTeacher] = useState([]);

  const [addStudent, setAddStudent] = useState([]);
  const [delStudent, setDelStudent] = useState([]);

  const [addSModal, setAddSModal] = useState(false);
  const [addTModal, setAddTModal] = useState(false);

  //modal
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [showProject, setShowProject] = useState({
    id: 0,
    name: "",
    members: [],
    teachers: [],
    logbook: "",
    state: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  useEffect(() => {
    //getProjectFromTeacher();
    getAll();
  }, []);

  const projectOn = (val) => {
    setOpen(true);
    setShowProject({
      id: val.id_project,
      name_th: val.project_th,
      name_eng: val.project_eng,
      members: val.name,
      teachers: val.teachers,
      //state: state,

      // member: ["std1", "std2"],
      // logbook: 5,
      // state: val.stat,
    });
  };

  function getProjectFromTeacher() {
    axios
      .get("https://demo-tspm-server.herokuapp.com/project/getallproject")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // console.log("กรรมการ" + i);
          //console.log(response.data[i]);
          axios
            .get(
              `https://demo-tspm-server.herokuapp.com/project/getprojectbyname/${response.data[i].project_name_eng}`
            )
            .then((res) => {
              console.log(res.data);
              SetAllProject((oldArray) => [...oldArray, res.data]);
              //SetAllProject(res.data)
            });
        }
      });
  }

  const handleSubmit = async (e, id, newProjectId) => {
    e.preventDefault();
    // await console.log(idProject);
    // await console.log(id)
    // await console.log(p)

    await axios
      .put(`https://demo-tspm-server.herokuapp.com/final-course/update-project/${id}`, {
        projectId: newProjectId,
      })
      .then(async (response) => {
        console.log(response.data);

        getAll();
        await finalGetProjectByID(id);
        setOpenEdit(false);
      });

    //setOpenEdit(false);

    // axios
    //   .put(
    //     `http:
    //localhost:3001/project/updateidbyname/${showProject.name_eng}`,
    //     { id_project: idProject }
    //   )
    //   .then(async (response) => {
    //     console.log(response.data.message);
    //     Router.reload();
    //     //await getProjectFromTeacher()
    //   });
  };

  const getAll = () => {
    axios.get("https://demo-tspm-server.herokuapp.com/final-course/all-project").then((res) => {
      console.log(res.data.results);
      setAllP(res.data.results);
    });
  };

  const getOne = (projectName) => {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/getprojectbyname/${projectName}`)
      .then((res) => {
        console.log(res.data);
        setP(res.data);
        setPEdit(res.data);

        var teacherStatus = [];
        for (let i = 0; i < res.data.teachers.length; i++) {
          teacherStatus.push(res.data.teachers[i].status);
        }

        console.log(teacherStatus);
        var check = teacherStatus.every(function (status) {
          return status == 1;
        });
        if (check) {
          setCheck(true);
        } else {
          setCheck(false);
        }
      });
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

  const handleRemoveStudent = (selected) => {
    const newSelected = editSList.filter((t) => t !== selected);
    setEditSList(newSelected);
    setDelStudent([...delStudent, selected]);
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

  const handleRemoveStudentInAdd = (selected) => {
    const newSelected = addStudent.filter((t) => t !== selected);
    setAddStudent(newSelected);
  };

  const handleRemoveTeacher = (selected) => {
    const newSelected = pEdit.teachers.filter((t) => t !== selected);
    setPEdit((prev) => {
      return { ...prev, ["teachers"]: newSelected };
    });
    setDelTeacher([...delTeacher, selected]);
  };

  const finalGetProjectByID = async (id) => {
    setTest(true);
    await axios
      .get("https://demo-tspm-server.herokuapp.com/final-course/get-project/" + id)
      .then((res) => {
        setP(res.data.results);
        setCheck(res.data.results.status);

        console.log(res.data);
      });
  };

  const finalGetEditProjectByID = async (id) => {
    setEditDetail(true);
    setIdProject(id);
    await axios
      .get("https://demo-tspm-server.herokuapp.com/final-course/get-project/" + id)
      .then((res) => {
        console.log(res.data);

        setProjectEdit(res.data.results.project);
        setEditSList(res.data.results.members);
        setEditTList(res.data.results.committees);
      });
  };

  //const

  return (
    <div>
      {/* <div>
        <div className={styles.table_manage}>
          <table style={{ width: "100%" }}>
            <caption className="bg-red-800 rounded-t-lg text-2xl text-white py-3">
              รายชื่อโครงงานทั้งหมด
            </caption>
            <thead>
              <tr>
                <th
                  className="bg-yellow-400 text-white"
                  style={{ width: "15%" }}
                >
                  ID
                </th>
                <th className="bg-blue-600 text-white" style={{ width: "40%" }}>
                  ชื่อโครงงาน
                </th>
                <th
                  className="bg-green-600 text-white"
                  style={{ width: "30%" }}
                >
                  สถานะ
                </th>
                <th className="bg-yellow-500 text-white" style={{}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allProject.map((project, index) => {
                return (
                  <tr key={index}>
                    <th>CPE{project.id_project.toString().padStart(2, 0)}</th>
                    <th> {project.project_th}</th>
                    <th> {project.state}</th>
                    <th>
                      <div
                        onClick={() => {
                          projectOn(project);
                        }}
                        className="text-blue-500 cursor-pointer hover:text-blue-800 text-lg "
                      >
                        ดูรายละเอียด
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <br />
      </div> */}

      {/*Modal*/}
      {/* <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>
          <p className="text-2xl">รายละเอียดโครงงาน</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          <div className="flex flex-col px-8 mb-5 space-y-2">
            <p className="text-2xl font-bold">
              รหัสโครงงาน : CPE{showProject.id.toString().padStart(2, 0)}
            </p>
            <p className="text-2xl font-semibold">
              ชื่อโครงงานภาษาไทย : {showProject.name_th}
            </p>
            <p className="text-2xl font-semibold">
              ชื่อโครงงานภาษาอังกฤษ : {showProject.name_eng}
            </p>
            <p className="text-2xl font-semibold">สมาชิกในกลุ่ม</p>

            {showProject.members.map((mem, index) => {
              return (
                <div key={index}>
                  <p className="ml-5 text-2xl">
                    รหัสนิสิต {mem.id} <span>ชื่อ {mem.name}</span>
                  </p>
                </div>
              );
            })}
            <p className="text-2xl font-semibold">รายชื่ออาจารย์</p>
            {showProject.teachers.map((teacher, index) => {
              return (
                <div key={index}>
                  <p className="ml-5 text-2xl ">
                    ชื่อ {teacher.teacher_name}{" "}
                    <span className="font-bold">{teacher.role}</span>
                  </p>
                </div>
              );
            })}
            <p className="text-2xl font-semibold">
              สถานะ : <span className="text-green-500"></span>
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            ปิด
          </Button>
          <Button
            onClick={handleClickOpenEdit}
            variant="contained"
            color="primary"
          >
            แก้ไขรหัสโครงงาน
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* ----test---- */}
      {/* <div>
        <div className={styles.table_manage}>
          <table style={{ width: "100%" }}>
            <caption className="bg-red-800 rounded-t-lg text-2xl text-white py-3">
              รายชื่อโครงงานทั้งหมด
            </caption>
            <thead>
              <tr>
                <th
                  className="bg-yellow-400 text-white"
                  style={{ width: "15%" }}
                >
                  ID
                </th>
                <th className="bg-blue-600 text-white" style={{ width: "40%" }}>
                  ชื่อโครงงาน
                </th>
                <th
                  className="bg-green-600 text-white"
                  style={{ width: "30%" }}
                >
                  สถานะ
                </th>
                <th className="bg-yellow-500 text-white" style={{}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allP.map((project, index) => {
                return (
                  <tr key={index}>
                    <th>
                      {project.project_id === 0 ? (
                        <p className="text-red-500">*ยังไม่มีรหัส </p>
                      ) : (
                        <p>
                          {" "}
                          CPE{project.project_id.toString().padStart(2, 0)}
                        </p>
                      )}
                    </th>
                    <th> {project.project_name_th}</th>
                    <th>
                      {" "}
                      {project.state === 1
                        ? "เสนอหัวข้อโครงงาน"
                        : project.state === 2 || project.state === 3
                        ? "ขอสอบหัวข้อโครงงาน"
                        : project.state === 4 || project.state === 5
                        ? "บันทึกผลการสอบหัวข้อโครงงาน"
                        : project.state === 6 || project.state === 7
                        ? "ประเมินความคืบหน้าโครงงาน"
                        : project.state === 8 || project.state === 9
                        ? "ขอสอบโครงงาน"
                        : project.state === 10 || project.state === 11
                        ? "บันทึกผลการสอบโครงงาน "
                        : project.state === 12 || project.state === 13
                        ? " ประเมินรูปเล่มปริญญานิพนธ์ "
                        : project.state === 14
                        ? "ผ่านการประเมินรูปเล่มปริญญานิพนธ์ "
                        : null}
                    </th>
                    <th>
                      <div
                        onClick={() => {
                          getOne(project.project_name_eng);
                          setTest(true);
                          setId(project.id);
                          setStateNumber(project.state);
                        }}
                        className="text-blue-500 cursor-pointer hover:text-blue-800 text-lg "
                      >
                        ดูรายละเอียด
                        
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <br />
      </div> */}
      <div>
        <p className="text-center text-2xl font-bold">รายชื่อโครงงานทั้งหมด</p>
        {allP ? (
          <div>
            {" "}
            {allP.length == 0 ? (
              <p className="text-center">ยังไม่มีข้อมูล...</p>
            ) : (
              <table className={styles.table_for_manage}>
                <thead>
                  <tr className={styles.table__headers}>
                    <th style={{ width: "10%" }} className={styles.header}>
                      ID
                    </th>
                    <th style={{ width: "40%" }} className={styles.header}>
                      ชื่อโครงงาน
                    </th>
                    <th style={{ width: "30%" }} className={styles.header}>
                      สถานะ
                    </th>
                    <th style={{ width: "20%" }} className={styles.header}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allP.map((p, index) => {
                    return (
                      <tr key={index} className={styles.table__row}>
                        <td className={styles.row__cell}>
                          {p.project_id === 0 ? (
                            <p className="text-red-500">*ยังไม่มีรหัส </p>
                          ) : (
                            <p> CPE{p.project_id.toString().padStart(2, 0)}</p>
                          )}
                        </td>
                        <td className={styles.row__cell}>
                          {p.project_name_th}
                        </td>
                        <td className={styles.row__cell}>
                          <span
                            style={{ fontSize: "0.95rem" }}
                            className="px-2 py-1  font-medium  bg-green-100 text-green-800 rounded-lg"
                          >
                            {STATE_MAP[p.state]}
                          </span>
                        </td>
                        <td
                          className={styles.row__cell}
                          style={{ display: "flex" }}
                        >
                          <Tooltip title="ดูรายละเอียด" arrow>
                            <div
                              onClick={() => finalGetProjectByID(p.id)}
                              className="text-yellow-500 cursor-pointer hover:text-yellow-400 it  "
                              style={{ width: "50%" }}
                            >
                              <VisibilityIcon />
                            </div>
                          </Tooltip>
                          &emsp;
                          <Tooltip title="แก้ไขโครงงาน">
                            <div
                              onClick={() => finalGetEditProjectByID(p.id)}
                              className="text-gray-800 cursor-pointer hover:text-gray-700"
                              style={{ width: "50%" }}
                            >
                              <EditIcon />
                            </div>
                          </Tooltip>
                          &emsp;
                          {/* <div
                      onClick={() => {
                        projectOn(project);
                      }}
                      className="text-blue-500 cursor-pointer hover:text-blue-800 text-lg "
                    >
                      ดูรายละเอียด
                    </div> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>

      {/* {allP.map((project, index) => {
        return (
          <div key={index}>
            {project.project_id === 0 ? (
              <p>ยังไม่มีรหัสโครงงาน </p>
            ) : (
              <p> CPE{project.project_id.toString().padStart(2, 0)}</p>
            )}

            <button
              onClick={() => {
                getOne(project.project_name_eng);
                setTest(true);
                setId(project.id);
              }}
            >
              {" "}
              {project.project_name_th}
            </button>
          </div>
        );
      })} */}

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={test}
        TransitionComponent={Transition}
        // keepMounted
        onClose={() => {
          setTest(false);
        }}
      >
        <DialogTitle>
          <p className="text-2xl">รายละเอียดโครงงาน</p>
        </DialogTitle>
        <DialogContent dividers>
          {p ? (
            <div className="text-xl mx-8">
              <p>
                รหัสโครงงาน : CPE
                {p.project.project_id.toString().padStart(2, 0)}
              </p>
              <p>ชื่อโครงงานภาษาไทย : {p.project.project_name_th}</p>
              <p>ชื่อโครงงานภาษาอังกฤษ : {p.project.project_name_eng}</p>
              <p>สมาชิกในกลุ่ม</p>
              {p.members.map((mem, index) => {
                return (
                  <div key={index}>
                    <p className="ml-4 ">
                      รหัสนิสิต {mem.id} <span>ชื่อ {mem.name}</span>
                    </p>
                  </div>
                );
              })}
              <p>รายชื่ออาจารย์</p>
              {p.committees.map((teacher, index) => {
                return (
                  <div key={index}>
                    <p className="ml-5">
                      ชื่อ {teacher.committee_name}{" "}
                      <span className="font-bold">{teacher.role}</span>
                      {/* สถานะ{" "}
                      {teacher.status === 1 ? (
                        <span className="text-green-400">
                          ยืนยันหัวข้อโครงงานแล้ว
                        </span>
                      ) : teacher.status === 2 ? (
                        <span className="text-red-500">
                          ปฤิเสธหัวข้อโครงงาน
                        </span>
                      ) : (
                        <span className="text-yellow-300">
                          ยังไม่ได้ทำการยืนยันหัวข้อโครงงาน
                        </span>
                      )} */}
                    </p>
                  </div>
                );
              })}

              {/* 
             
              <p className="text-2xl font-semibold">รายชื่ออาจารย์</p>
              {p.teachers.map((teacher, index) => {
                return (
                  <div key={index}>
                    <p className="ml-5 text-2xl ">
                      ชื่อ {teacher.teacher_name}{" "}
                      <span className="font-bold">{teacher.role}</span> สถานะ{" "}
                      {teacher.status === 1 ? (
                        <span className="text-green-400">
                          ยืนยันหัวข้อโครงงานแล้ว
                        </span>
                      ) : teacher.status === 2 ? (
                        <span className="text-red-500">
                          ปฤิเสธหัวข้อโครงงาน
                        </span>
                      ) : (
                        <span className="text-yellow-300">
                          ยังไม่ได้ทำการยืนยันหัวข้อโครงงาน
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
              <p className="text-2xl font-semibold">
                สถานะ :{" "}
                <span className="text-green-500">
                  {stateNumber === 1
                    ? "เสนอหัวข้อโครงงาน"
                    : stateNumber === 2 || stateNumber === 3
                    ? "ขอสอบหัวข้อโครงงาน"
                    : stateNumber === 4 || stateNumber === 5
                    ? "บันทึกผลการสอบหัวข้อโครงงาน"
                    : stateNumber === 6 || stateNumber === 7
                    ? "ประเมินความคืบหน้าโครงงาน"
                    : stateNumber === 8 || stateNumber === 9
                    ? "ขอสอบโครงงาน"
                    : stateNumber === 10 || stateNumber === 11
                    ? "บันทึกผลการสอบโครงงาน "
                    : stateNumber === 12 || stateNumber === 13
                    ? " ประเมินรูปเล่มปริญญานิพนธ์ "
                    : stateNumber === 14
                    ? "ผ่านการประเมินรูปเล่มปริญญานิพนธ์ "
                    : null}
                </span>
              </p> */}
            </div>
          ) : (
            <div>Error</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setTest(false);
              //setP(null);
            }}
            variant="contained"
            color="secondary"
          >
            ปิด
          </Button>
          {check ? (
            <Button
              onClick={handleClickOpenEdit}
              variant="contained"
              color="primary"
            >
              แก้ไขรหัสโครงงาน
            </Button>
          ) : null}

          {/* <Button
            onClick={() => setEditDetail(true)}
            variant="contained"
            //color="primary"
          >
            แก้ไขข้อมูลโครงงาน
          </Button> */}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        //keepMounted
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl"> แก้ไขรหัสโครงงาน</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          {p ? (
            <form
              id="update-id"
              onSubmit={(e) => {
                handleSubmit(e, p.project.id, idProject);
              }}
            >
              <input
                defaultValue=""
                required
                type="number"
                onChange={(e) => {
                  setIdProject(e.target.value);
                }}
                className=" text-4xl  border-2 p-2"
                min="0"
                placeholder="กรุณากรอกรหัสโครงงาน"
              ></input>
            </form>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEdit}
            variant="contained"
            color="secondary"
          >
            ยกเลิก
          </Button>
          <Button
            form="update-id"
            type="submit"
            style={{ backgroundColor: "green", color: "white" }}
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDetail}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl"> แก้ไขข้อมูลโครงงาน {idProject}</p>{" "}
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
                        setProjectEdit(null),
                          setEditDetail(false),
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
                    setProjectEdit(null),
                      setEditDetail(false),
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
                          handleRemoveStudent(mem);
                        }}
                      >
                        <i className="bx bx-minus mr-2"></i>ลบ
                      </button>
                    </div>
                  </div>
                );
              })}
              <br />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setProjectEdit(null),
                      setEditDetail(false),
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
          ) : (
            <div className="text-2xl text-center font-bold">
              กรุณาเลือกส่วนที่ต้องการจะแก้ไข...
            </div>
          )}

          {/* {pEdit ? (
            <div>
                <h1 className="text-lg font-bold text-gray-700">
                ชื่อโครงงานภาษาไทย
              </h1>
              <div className="mt-2 mb-2 border-2 py-1 px-3 flex justify-between  rounded-md">
                <input
                  className="flex-grow outline-none text-gray-800 focus:text-blue-600"
                  type="text"
                  placeholder={pEdit.project.project_name_th}
                  value={pEdit.project.project_name_th}
                  onChange={(e) =>
                    setPEdit((prev) => {
                      return { ...prev, ["project_th"]: e.target.value };
                    })
                  }
                />
              </div>


            </div>
            // <>
            //   <h1 className="text-lg font-bold text-gray-700">
            //     ชื่อโครงงานภาษาไทย
            //   </h1>
            //   <div className="mt-2 mb-2 border-2 py-1 px-3 flex justify-between  rounded-md">
            //     <input
            //       className="flex-grow outline-none text-gray-800 focus:text-blue-600"
            //       type="text"
            //       placeholder={pEdit.project.project_name_th}
            //       value={pEdit.project.project_name_th}
            //       onChange={(e) =>
            //         setPEdit((prev) => {
            //           return { ...prev, ["project_th"]: e.target.value };
            //         })
            //       }
            //     />
            //   </div>

            //   <h1 className="text-lg font-bold text-gray-700">
            //     ชื่อโครงงานภาษาอังกฤษ
            //   </h1>
            //   <div className="mt-2 mb-2 border-2 py-1 px-3 flex justify-between  rounded-md">
            //     <input
            //       className="flex-grow outline-none text-gray-800 focus:text-blue-600"
            //       type="text"
            //       placeholder={pEdit.project_eng}
            //       value={pEdit.project_eng}
            //       onChange={(e) =>
            //         setPEdit((prev) => {
            //           return { ...prev, ["project_eng"]: e.target.value };
            //         })
            //       }
            //     />
            //   </div>

            //   <div className="flex justify-between my-4 ">
            //     <h1 className="text-lg font-bold text-gray-700">
            //       สมาชิกในกลุ่ม
            //     </h1>
            //     <button
            //       type="button"
            //       className="text-xl px-4 py-1  rounded-lg font-bold text-white"
            //       style={{
            //         backgroundColor: "#32CD30",
            //         boxShadow: "#00000038 1.95px 1.95px 1.95px",
            //         width: "100px",
            //       }}
            //       onClick={() => {
            //         setAddSModal(true);
            //       }}
            //     >
            //       <i className="bx bx-plus mr-2"></i>เพิ่ม
            //     </button>
            //   </div>

            //   {pEdit.name.map((mem, index) => {
            //     return (
            //       <div key={index} className="ml-2 flex justify-between mb-2">
            //         <p>
            //           {mem.id} {mem.name}
            //         </p>

            //         <button
            //           className="ml-5 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
            //           style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
            //           onClick={() => {
            //             handleRemoveStudent(mem);
            //           }}
            //         >
            //           <i className="bx bx-minus mr-2"></i>ลบ
            //         </button>
            //       </div>
            //     );
            //   })}
            //   <div className="flex justify-between my-4">
            //     <h1 className="text-lg font-bold text-gray-700">
            //       อาจารย์ประจำโครงงาน
            //     </h1>

            //     <button
            //       type="button"
            //       className="text-xl px-4 py-1  rounded-lg font-bold text-white"
            //       style={{
            //         backgroundColor: "#32CD30",
            //         boxShadow: "#00000038 1.95px 1.95px 1.95px",
            //         width: "100px",
            //       }}
            //       onClick={() => {
            //         setAddSModal(true);
            //       }}
            //     >
            //       <i className="bx bx-plus mr-2"></i>เพิ่ม
            //     </button>
            //   </div>

            //   {pEdit.teachers.map((teacher, index) => {
            //     return (
            //       <div key={index} className="ml-2 mb-4 flex justify-between">
            //         <p>
            //           {teacher.role} {teacher.teacher_name}
            //         </p>
            //         <button
            //           className="ml-5 bg-red-500 hover:bg-yellow-300 rounded-md p-1 font-bold text-white cursor-pointer"
            //           style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
            //           onClick={() => {
            //             handleRemoveTeacher(teacher);
            //           }}
            //         >
            //           <i className="bx bx-minus mr-2"></i>ลบ
            //         </button>
            //       </div>
            //     );
            //   })}
            // </>
          ) : (
            <div>Error</div>
          )} */}
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
        </DialogActions>
      </Dialog>
    </div>
  );
}

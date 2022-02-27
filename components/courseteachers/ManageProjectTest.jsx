import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/manageteacher.module.scss";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Router from "next/router";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Loading from "../Loading";
import Tooltip from "@material-ui/core/Tooltip";
import { VpnKey } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: "#000000",
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function ManageProjectTest({ allP }) {
  // const classes = useStyles();
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

  const [allProject, SetAllProject] = useState([]);

  //---------------test------------------

  //const [allP, setAllP] = useState(null);
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
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetail, setEditDetail] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleSubmit = async (e, id, newProjectId) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3001/final-course/update-project/${id}`, {
        projectId: newProjectId,
      })
      .then(async (response) => {
        console.log(response.data);

        getAll();
        await finalGetProjectByID(id);
        setOpenEdit(false);
      });
  };

  const getAll = () => {
    axios.get("http://localhost:3001/final-course/all-project").then((res) => {
      console.log(res.data.results);
      setAllP(res.data.results);
    });
  };

  const getOne = (projectName) => {
    axios
      .get(`http://localhost:3001/project/getprojectbyname/${projectName}`)
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
    axios.get(`http://localhost:3001/allstudent/test`).then((response) => {
      console.log(response.data.studentList);
      setStudentList(response.data.studentList);
    });
  }
  function fetchTeacherList() {
    axios.get(`http://localhost:3001/allteacher`).then((response) => {
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
      .get("http://localhost:3001/final-course/get-project/" + id)
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
      .get("http://localhost:3001/final-course/get-project/" + id)
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
      {/* <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <div>
        <h1 className="text-center text-3xl font-bold">
          รายชื่อโครงงานทั้งหมด
        </h1>
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

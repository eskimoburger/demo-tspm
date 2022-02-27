import { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

import axios from "axios";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "black",
    fontSize: 16,
    fontWeight: 500,
    backgroundColor: "#ffea00",
    "&:hover": {
      backgroundColor: "#ffd600",
    },
  },
}));



const StatusDisplay = ({
  stateName,
  state,
  projectId,
  projectMembers,
  projectData,
  getProject,
}) => {
  const classes = useStyles()
  //console.log(projectMembers)

  useEffect(() => {
    setMems(projectMembers);
  }, [projectMembers]);
  //Edit Member---------------------------
  const [editMembers, setEditMembers] = useState(false);
  const [mems, setMems] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [addMems, setAddMems] = useState(false);
  const [studentValue, setStudentValue] = useState("");
  const [addList, setAddList] = useState([]);
  const [delList, setDelList] = useState([]);
  const [alert, setAlert] = useState(false);

  const handleRemoveStudent = (selected) => {
    const newSelected = mems.filter((t) => t !== selected);
    setDelList((prev) => {
      return [...prev, selected];
    });

    setMems(newSelected);
  };
  const handleRemoveStudentInAdd = (selected) => {
    const newSelected = addList.filter((t) => t !== selected);

    setAddList(newSelected);
  };
  const cancelDelete = (selected) => {
    const newSelected = delList.filter((t) => t !== selected);

    setDelList(newSelected);
    setMems((prev) => {
      return [...prev, selected];
    });
  };

  const fetchStudentList = () => {
    axios.get(`http://localhost:3001/allstudent/test`).then((response) => {
      console.log(response.data.studentList);
      setStudentList(response.data.studentList);
    });
  };

  const sendEditProject = async () => {
    await axios
      .post(`http://localhost:3001/final-project/edits/${projectData.idP}`, {
        delStudents: delList,
        addStudents: addList,
        projectNameTH: projectData.name,
        projectNameENG: projectData.name_eng,
      })
      .then((res) => {
        console.log(res.data);
        getProject();
        setEditMembers(false);
        setAddList([]);
        setDelList([]);
        setAlert(false);
      })
      .catch((err) => {
        console.log(err);
      });
    //return
  };

  return (
    <div
      className="  rounded-lg  flex flex-col"
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px", width: "730px" }}
    >
      <div
        className=" rounded-t-lg"
        style={{ backgroundColor: "hsl(356, 71%, 59%)" }}
      >
        <p className=" text-white text-2xl  text-left p-2">
          การจัดการโครงงาน (Project Management){" "}
        </p>
      </div>

      <div
        className=" bg-gray-50 rounded-b-lg  flex flex-col  items-center    "
        style={{ height: "100%" }}
      >
        <div className="flex gap-2  justify-center items-center flex-wrap  my-4">
          <div>สถานะปัจจุบัน : </div>
          <div className=" bg-green-800 py-1 px-4 text-white rounded-full font-bold  text-center  lg:text-sm md:text-sm   iphone:text-sm ">
            {stateName}
          </div>
        </div>

        {state == 1 && projectId == 0 && (
          <div className="mb-2">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditMembers(true);
                fetchStudentList();
              }}
              className={classes.button}
              startIcon={<EditTwoToneIcon />}
            >
              แก้ไขข้อมูลโครงงาน
            </Button>
          </div>
        )}
      </div>

      <Dialog open={editMembers} maxWidth="lg" fullWidth={true}>
        <DialogTitle>
          {" "}
          <p className="text-3xl">แก้ไขข้อมูลโครงงาน</p>{" "}
        </DialogTitle>
        <DialogContent>
          <button
            type="button"
            className=" block text-xl px-4 py-1  rounded-lg font-bold text-white w-full"
            style={{
              backgroundColor: "#32CD30",
              boxShadow: "#00000038 1.95px 1.95px 1.95px",
            }}
            onClick={() => {
              setAddMems(true);
              //console.log("hello");
            }}
          >
            <i className="bx bx-plus mr-2"></i>เพิ่มสมาชิกในกลุ่ม
          </button>

          <p className="my-4 text-2xl font-bold">สมาชิกในกลุ่ม</p>
          {mems.map((mem, index) => {
            if (mem.id == sessionStorage.getItem("useID")) {
              return (
                <div
                  key={index}
                  className="ml-4 my-4 text-xl flex justify-between"
                >
                  <p>
                    {mem.id} {mem.name}
                  </p>
                </div>
              );
            }
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
          {addList.length != 0 && (
            <div>
              <p className="my-4 text-2xl font-bold">สมาชิกในกลุ่มที่เพิ่ม</p>
              {addList.map((mem, index) => {
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
                        handleRemoveStudentInAdd(mem);
                      }}
                    >
                      <i className="bx bx-minus mr-2"></i>ลบสมาชิก
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {delList.length != 0 && (
            <div>
              <p className="my-4 text-2xl font-bold">สมาชิกในกลุ่มที่ลบ</p>
              {delList.map((mem, index) => {
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
          {/* <button onClick={()=>{sendEditProject()}}>testAPI</button>  */}
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setEditMembers(false);
              setMems(projectMembers);
              setAddList([]);
              setDelList([]);
            }}
            className=" h-10 rounded-lg bg-red-600   uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-4 "
          >
            ยกเลิก
          </button>

          {delList.length > 0 || addList.length > 0 ? (
            <button
              onClick={() => {
                // setEditMembers(false);
                setAlert(true);
                console.log(
                  addList,
                  delList,
                  projectData.name,
                  projectData.name_eng
                );
              }}
              className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
            >
              ยืนยัน
            </button>
          ) : null}
        </DialogActions>
      </Dialog>

      <Dialog
        open={addMems}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"เพิ่มสมาชิกในกลุ่ม"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-center ">
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

              setAddMems(false);
            }}
            variant="contained"
            color="secondary"
          >
            ยกเลิก
          </Button>
          {studentValue != "" ? (
            <Button
              form="update-id"
              type="submit"
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => {
                // setMems((prev) => {
                //   return [...prev, JSON.parse(studentValue)];
                // });
                setAddList((prev) => {
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
        open={alert}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"ยืนยันการแก้ไขข้อมูลโครงงาน ?"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-center ">
          <i
            className="bx bx-error-circle bx-tada  m-2  "
            style={{ fontSize: "180px" }}
          ></i>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setAlert(false);
            }}
            className=" h-10 rounded-lg bg-red-600   uppercase font-semibold hover:bg-red-700 text-gray-100 transition px-4 "
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              sendEditProject();
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ยืนยัน
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusDisplay;

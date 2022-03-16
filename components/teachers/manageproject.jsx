import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/manageteacher.module.scss";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Loading from "../Loading";

//material ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function manageProject(props) {
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
  const [teacher, setTeacher] = useState("");
  useEffect(() => {
    if (props.teacher) {
      setTeacher(props.teacher.id);
      // getProjectFromTeacher();
      ActiveButton(1);
    }
  }, [props.teacher]);

  const [project, setProject] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [status, setStats] = useState({
    all: false,
    advisor: false,
    coAdvisor: false,
    committee: false,
  });

  const ActiveButton = (status) => {
    const status_mock = {};
    status_mock.all = status == 1 ? true : false;
    status_mock.advisor = status == 2 ? true : false;
    status_mock.coAdvisor = status == 3 ? true : false;
    status_mock.committee = status == 4 ? true : false;
    setStats(status_mock);
    getProjectByTeacher(status);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProjectByTeacher = (status) => {
    axios
      .get(
        `https://demo-tspm-server.herokuapp.com/project/getprojectbyteacher/${props.teacher.id}/${status}`
      )
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
      })
      .catch(setProject(null));
  };

  const getProjectById = (id) => {
    setOpen(true);
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/getprojectbyid/${id}`)
      .then(async (res) => {
        console.log(res.data);
        setProjectDetail(res.data);
      })
      .catch
      //setProject(null)
      ();
  };

  return (
    <div>
      <div
        className=" px-4  pt-4 pb-6 text-xl  bg-white rounded-2xl  "
        style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px" }}
      >
        <div className="flex justify-between gap-2 px-2 my-2 flex-wrap">
          <p className=" text-center text-2xl ">รายชื่อโครงงาน</p>
          <div className="flex justify-center gap-2 flex-wrap text-sm">
            <button
              onClick={() => {
                ActiveButton(1);
              }}
              className={
                status.all
                  ? "bg-green-800   py-1 px-4 rounded-lg text-white  focus:outline-none "
                  : "bg-green-600  hover:bg-green-800 py-1 px-4 rounded-lg text-white  focus:outline-none "
              }
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => {
                ActiveButton(2);
              }}
              className={
                status.advisor
                  ? "bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
                  : "bg-blue-500  hover:bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
              }
            >
              อาจารย์ที่ปรึกษา
            </button>
            <button
              onClick={() => {
                ActiveButton(3);
              }}
              className={
                status.coAdvisor
                  ? "bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
                  : "bg-blue-500  hover:bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
              }
            >
              อาจารย์ที่ปรึกษา(ร่วม)
            </button>
            <button
              onClick={() => {
                ActiveButton(4);
              }}
              className={
                status.committee
                  ? "bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
                  : "bg-blue-500  hover:bg-blue-800 py-1 px-4 rounded-lg text-white focus:outline-none"
              }
            >
              กรรมการ
            </button>
          </div>
        </div>
        {project ? (
          <div>
            {" "}
            {project.length == 0 ? (
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
                  {project.map((project, index) => {
                    return (
                      <tr key={index} className={styles.table__row}>
                        <td className={styles.row__cell}>
                          CPE{project.project_id.toString().padStart(2, 0)}
                        </td>
                        <td className={styles.row__cell}>
                          {project.project_th}
                        </td>
                        <td className={styles.row__cell}>
                          <span
                            style={{ fontSize: "0.95rem" }}
                            className="px-2 py-1  font-medium  bg-green-100 text-green-800 rounded-lg"
                          >
                            {STATE_MAP[project.state]}
                          </span>
                        </td>
                        <td className={styles.row__cell}>
                          <span
                            onClick={() => getProjectById(project.id)}
                            className="text-yellow-500 cursor-pointer hover:text-yellow-400 "
                          >
                            <VisibilityIcon />
                          </span>
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
          {projectDetail ? (
            <div className="px-8 mb-4 space-y-2" style={{fontSize:"18px"}}>
              <p className=" font-bold">
                รหัสโครงงาน :{" "}
                <span className="font-normal">
                  CPE
                  {projectDetail.data_project.project_id
                    .toString()
                    .padStart(2, 0)}
                </span>
              </p>

              <p className=" font-bold">
                ชื่อโครงงานภาษาไทย :{" "}
                <span className="font-normal">
                  {projectDetail.data_project.project_name_th}
                </span>
              </p>
              <p className=" font-bold">
                ชื่อโครงงานภาษาอังกฤษ :{" "}
                <span className="font-normal">
                  {projectDetail.data_project.project_name_eng}
                </span>
              </p>

              <p className="font-bold">รายชื่ออาจารย์</p>

              {projectDetail.committees.map((teacher, index) => {
                return (
                  <div key={index}>
                    <p className="ml-5 ">
                      ชื่อ {teacher.committee_name}{" "}
                      <span className="font-bold">ตำแหน่ง</span> {teacher.role}
                    </p>
                  </div>
                );
              })}

              <p className=" font-bold">สมาชิกในกลุ่ม</p>

              {projectDetail.members.map((mem, index) => {
                var name = `${mem.prefix_th} ${mem.student_name_th} ${mem.student_lastname_th}`;
                return (
                  <div key={index}>
                    <p className="ml-5 ">
                      <span className="font-bold">รหัสนิสิต</span>{" "}
                      {mem.id_student} <span className="font-bold">ชื่อ </span>{" "}
                      {name}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading...</p>
          )}
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

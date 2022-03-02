import React, { useState, useEffect } from "react";
import styles from "../styles/t_index.module.scss";
import Close from "../public/close.svg";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";

export default function T_index() {
  useEffect(() => {
    getProjectFromTeacher();
  }, []);

  const [advisorProject, SetAdvisorProject] = useState([]);
  const [committeeProject, SetCommitteeProject] = useState([]);

  const [project, SetProject] = useState([]);

  function getProjectFromTeacher() {
    var advisor = [];

    axios
      .get("https://demo-tspm-server.herokuapp.com/project/getprojectbyteacher/1")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].role == "กรรมการ") {
            // console.log("กรรมการ" + i);
            //console.log(response.data[i]);
            axios
              .get(
                `https://demo-tspm-server.herokuapp.com/project/getprojectbyname/${response.data[i].project_name_eng}`
              )
              .then((res) => {
                //console.log(res.data);
                SetCommitteeProject((oldArray) => [...oldArray, res.data]);
              });

            //SetAdvisorProject([...advisorProject, {role: response.data[i].project_name_eng}])
          }
          if (response.data[i].role == "อาจารย์ที่ปรึกษา") {
            //console.log("อาจารย์ที่ปรึกษา" + i);
            advisor.push(response.data[i]);
            axios
              .get(
                `https://demo-tspm-server.herokuapp.com/project/getprojectbyname/${response.data[i].project_name_eng}`
              )
              .then((res) => {
                console.log(res.data);
                SetAdvisorProject((oldArray) => [...oldArray, res.data]);
              });
          }
        }

        // SetAdvisorProject(advisor);
      });
  }

  const [showProject, setshowProject] = useState({
    id: "",
    name: "",
    members: [],
    teachers: [],
    logbook: "",
    state: "",
  });
  var Advis_project = [
    {
      id: "CPEXX",
      name: "ระบบจัดการการทำโครงงานของนิสิต",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE02",
      name: "ระบบรดน้ำต้นไม้ตามความชื้นในดิน",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE03",
      name: "หุ่นไล่กาอัตโนมัติ",
      stat: "สอบหัวข้อโครงงาน",
    },
  ];
  var Commit_project = [
    {
      id: "CPE04",
      name: "ไม้วิเศษตรวจสอบความสุขของทุเรียน",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE05",
      name: "ระบบตรวจจับฝุ่นPM2.5",
      stat: "สอบหัวข้อโครงงาน",
    },
  ];
  var project_list = [
    {
      id: "CPE01",
      name: "ระบบจัดการการทำโครงงานของนิสิต",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE02",
      name: "ระบบรดน้ำต้นไม้ตามความชื้นในดิน",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE03",
      name: "หุ่นไล่กาอัตโนมัติ",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE04",
      name: "ไม้วิเศษตรวจสอบความสุขของทุเรียน",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE05",
      name: "ระบบตรวจจับฝุ่นPM2.5",
      stat: "สอบหัวข้อโครงงาน",
    },
  ];
  function projectOn(val, state) {
    var modal = document.getElementById("projectModal");
    modal.style.display = "block";

    setshowProject({
      id: val.id_project,
      name_th: val.project_th,
      name_eng: val.project_eng,
      members: val.name,
      teachers: val.teachers,
      state: state,

      // member: ["std1", "std2"],
      // logbook: 5,
      // state: val.stat,
    });
  }
  function projectOff() {
    var modal = document.getElementById("projectModal");
    modal.style.display = "none";
  }

  var advisorContent = null;
  var committeeContent = null;

  if (advisorProject.length > 0) {
    advisorContent = (
      <>
        <div className={styles.project_list}>
          <div className={styles.title_table}>
            รายชื่อโครงงานที่เป็นที่ปรึกษา
          </div>
          <div className={styles.project_title}>
            <div className={styles.project_i_title}>ID</div>
            <div className={styles.project_name_title}>ชื่อโครงงาน</div>
            <div className={styles.project_stat_title}>สถานะโครงงาน</div>
          </div>
          {advisorProject.map((val) => {
            var id = "";
            var state = "";
            if (val.id_project == 0) {
              id = "CPEXX";
            } else {
              id = val.project_id;
            }

            if (val.state == 1) {
              state = "ขอสอบหัวข้อโครงงาน";
            }

            return (
              <div
                className={styles.project}
                onClick={() => projectOn(val, state)}
              >
                <div className={styles.project_i}>{id}</div>
                <div className={styles.project_name}>{val.project_th}</div>
                <div className={styles.project_stat}>{state}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
  if (committeeProject.length > 0) {
    committeeContent = (
      <>
        <div className={styles.project_list}>
          <div className={styles.title_table_green}>
            รายชื่อโครงงานที่เป็นกรรมการ
          </div>
          <div className={styles.project_title}>
            <div className={styles.project_i_title}>ID</div>
            <div className={styles.project_name_title}>ชื่อโครงงาน</div>
            <div className={styles.project_stat_title}>สถานะโครงงาน</div>
          </div>
          {committeeProject.map((val) => {
            var id = "";
            var state = "";
            if (val.id_project == 0) {
              id = "CPEXX";
            } else {
              id = val.project_id;
            }
            ///condition in state
            if (val.state == 1) {
              state = "ขอสอบหัวข้อโครงงาน";
            }
            return (
              <div
                className={styles.project}
                onClick={() => projectOn(val, state)}
              >
                <div className={styles.project_i}>{id}</div>
                <div className={styles.project_name}>{val.project_th}</div>
                <div className={styles.project_stat}>{state}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>จัดการโครงงาน</div>
      </div>
      <div id="projectModal" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <div className="text-4xl font-bold">รายละเอียดโครงงาน</div>

            <div className={styles.close} onClick={projectOff}>
              <Close width="30" height="30" />
            </div>
          </div>
          <div className="flex flex-col px-8 mb-5 space-y-2">
            <p className="text-3xl font-bold">รหัสโครงงาน : {showProject.id}</p>
            <p className="text-2xl font-semibold">
              ชื่อโครงงานภาษาไทย : {showProject.name_th}
            </p>
            <p className="text-2xl font-semibold">
              ชื่อโครงงานภาษาอังกฤษ : {showProject.name_eng}
            </p>
            <p className="text-2xl font-semibold">สมาชิกในกลุ่ม</p>

            {showProject.members.map((mem) => {
              return (
                <>
                  <p className="ml-5 text-2xl">
                    รหัสนิสิต {mem.id} <span>ชื่อ {mem.name}</span>
                  </p>
                </>
              );
            })}
            <p className="text-2xl font-semibold">รายชื่ออาจารย์</p>
            {showProject.teachers.map((teacher) => {
              return (
                <>
                  <p className="ml-5 text-2xl ">
                    ชื่อ {teacher.teacher_name}{" "}
                    <span className="font-bold">{teacher.role}</span>
                  </p>
                </>
              );
            })}
            <p className="text-2xl font-semibold">
              สถานะ :{" "}
              <span className="text-green-500">{showProject.state}</span>
            </p>
          </div>
        </div>
      </div>

      {advisorContent}
      {committeeContent}

      <button
        onClick={() => {
          console.log(project);
        }}
      >
        Test
      </button>
    </div>
  );
}

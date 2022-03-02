import { useState, useEffect } from "react";
import axios from "axios";
import State1 from "./state1";
import State2 from "./state2";
import State3 from "./state3";
import State4 from "./state4";
import State5 from "./state5";
import State6 from "./state6";
import State7 from "./state7";
import State8 from "./state8";
import State9 from "./state9";
import State10 from "./state10";
import State11 from "./state11";
import State12 from "./state12";
import State13 from "./state13";
import State14 from "./state14";
import State15 from "./state15";
import StepTest from "./steptest";

import SaveLogbook from "./SaveLogbook";
import StatusDisplay from "./StatusDisplay";
import InformationDisplay from "./InformationDisplay";
import Loading from "../Loading";

export default function studentIndex() {
  useEffect(() => {
    getUser();
    getProject();
  }, []);

  const [user, setUser] = useState({});
  const stepsArray = [
    "เสนอหัวข้อโครงงาน",
    "สอบหัวข้อโครงงาน",
    "ประเมินความคืบหน้า",
    "สอบโครงงาน",
    "ส่งรูปเล่มโครงงาน",
  ];
  const [stepNumber, setStepNumber] = useState(undefined);
  const [state, setState] = useState(undefined);
  var stateContent = null;
  var state_name = null;

  const [project, setProject] = useState({
    id: "ยังไม่มีข้อมูล",
    name: "ยังไม่มีข้อมูล",
    name_eng: "ยังไม่มีข้อมูล",
    description: "ยังไม่มีข้อมูล",
    teacher: "ยังไม่มีข้อมูล",
    state: 0,
    state_name: "เสนอหัวข้อโครงงาน",
    request: "",
    logbook: 0,
    members: [{ id: "", name: "ยังไม่มีข้อมูล" }],
    committees: [
      {
        teacher_name: "ยังไม่มีข้อมูล",
        role: "",
        id_teacher: 0,
      },
    ],
  });

  const getProject = async () => {
    await axios
      .get(
        `https://demo-tspm-server.herokuapp.com/final-project/project-detail/${sessionStorage.getItem(
          "useID"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          // console.log("IS TRUE");
          // console.log(res.data.projectDetails);
          // console.log(res.data.committees);
          // console.log(res.data.members);
          // console.log(res.data.advisor);
          setProject({
            idP: res.data.projectDetails.id,
            id: res.data.projectDetails.project_id,
            name: res.data.projectDetails.project_name_th,
            name_eng: res.data.projectDetails.project_name_eng,
            description: res.data.projectDetails.project_description,
            teacher: "ยังไม่มีข้อมูล",
            state: res.data.projectDetails.state,
            state_name: "เสนอหัวข้อโครงงาน",
            request: "",
            logbook: res.data.projectDetails.logbook,
            members: res.data.members,
            committees: res.data.committees,
            asses_status: res.data.projectDetails.asses_status,
            test_status: res.data.projectDetails.test_status,
            final_status: res.data.projectDetails.final_status,
            final_asses: res.data.projectDetails.final_asses,
            advisor: res.data.advisor,
            final_count: res.data.projectDetails.final_count,
          });
          //setMems(res.data.members);

          setState(res.data.projectDetails.state);
          //setState(9)

          if (res.data.projectDetails.state === 3) {
            setStepNumber(2);
          } else if (res.data.projectDetails.state === 4) {
            setStepNumber(2);
          } else if (res.data.projectDetails.state === 5) {
            setStepNumber(2);
          } else if (res.data.projectDetails.state === 6) {
            setStepNumber(3);
          } else if (res.data.projectDetails.state === 7) {
            setStepNumber(3);
          } else if (res.data.projectDetails.state === 8) {
            setStepNumber(4);
          } else if (res.data.projectDetails.state === 9) {
            setStepNumber(4);
          } else if (res.data.projectDetails.state === 10) {
            setStepNumber(4);
          } else if (res.data.projectDetails.state === 11) {
            setStepNumber(4);
          } else if (res.data.projectDetails.state === 12) {
            setStepNumber(5);
          } else if (res.data.projectDetails.state === 13) {
            setStepNumber(5);
          } else if (res.data.projectDetails.state === 14) {
            setStepNumber(6);
          } else {
            setStepNumber(res.data.projectDetails.state);
          }
        } else if (res.data.status == false) {
          setState(0);
          setStepNumber(1);
          //setProject(project)
        } else {
          console.log("IS FAlSE");
        }
      });
  };

  const getUser = () => {
    axios
      .get(
        `https://demo-tspm-server.herokuapp.com/allstudent/test/${sessionStorage.getItem(
          "useID"
        )}`
      )
      .then((response) => {
        setUser(response.data.studentList[0]);
      });
  };

  const nextStageProject = async () => {
    await axios
      .put(`https://demo-tspm-server.herokuapp.com/final-project/next-stage/${project.idP}`)
      .then((response) => {
        getProject();
        console.log(response.data);
      });
  };

  if (state == 0) {
    stateContent = <State1 user={user} function={getProject} />;
    state_name = "เสนอหัวข้อโครงงาน";
  } else if (state == 1) {
    stateContent = (
      <State2
        projectName={project.name_eng}
        project={project}
        function={getProject}
        functionNext={nextStageProject}
      />
    );
    state_name = "รออาจารย์ตอบกลับ (เสนอหัวข้อโครงงาน)";
  } else if (state == 2) {
    stateContent = <State3 project={project} function={getProject} />;
    state_name = "ขอสอบหัวข้อโครงงาน";
  } else if (state == 3) {
    stateContent = (
      <State4
        project={project}
        function={getProject}
        functionNext={nextStageProject}
      />
    );
    state_name = "รออาจารย์ตอบกลับ(ขอสอบหัวข้อโครงงาน)";
  } else if (state == 4) {
    stateContent = <State5 project={project} function={getProject} />;
    state_name = "บันทึกผลการสอบหัวข้อโครงงาน";
  } else if (state == 5) {
    stateContent = <State6 project={project} function={getProject} />;
    state_name = "รออาจารย์ตอบกลับ(บันทึกผลสอบหัวข้อโครงงาน)";
  } else if (state == 6) {
    stateContent = (
      <State7
        project={project}
        function={getProject}
        functionNext={nextStageProject}
      />
    );
    state_name = "ขอรับประเมินความคืบหน้า";
  } else if (state == 7) {
    stateContent = <State8 project={project} functionNext={nextStageProject} />;
    state_name = "รอการตอบรับประเมินความคืบหน้า";
  } else if (state == 8) {
    stateContent = <State9 project={project} functionNext={nextStageProject} />;
    state_name = "ขอสอบโครงงาน";
  } else if (state == 9) {
    stateContent = (
      <State10
        project={project}
        function={getProject}
        functionNext={nextStageProject}
      />
    );
    state_name = "รออาจารย์ตอบกลับ(ขอสอบโครงงาน)";
  } else if (state == 10) {
    stateContent = <State11 project={project} function={getProject} />;
    state_name = 
     "บันทึกผลการสอบโครงงาน"
    
  } else if (state == 11) {
    stateContent = (
      <State12
        project={project}
        function={getProject}
        functionNext={nextStageProject}
      />
    );
    state_name = 
        "รออาจารย์ตอบกลับ(บันทึกผลสอบโครงงาน)"
   
  } else if (state == 12) {
    stateContent = (
      <State13
        project={project}
        function={getProject}
        functionNext={nextStageProject}
      />
    );
    state_name = "ประเมินรูปเล่มปริญญานิพนธ์";
  } else if (state == 13) {
    stateContent = (
      <State14
        project={project}
        function={getProject}
        functionNext={nextStageProject}
      />
    );
    state_name = "รอผลการประเมินรูปเล่มปริญญานิพนธ์";
  } else if (state == 14) {
    stateContent = (
      <State15
        project={project}
        function={getProject}
        functionNext={nextStageProject}
      />
    );
    state_name = " ผ่านการประเมินรูปเล่มปริญญานิพนธ์";
  } else {
    stateContent = <Loading />;
  }

  return (
    <div>
      <div
        className=" bg-white  rounded-md p-5"
        style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
      >
        <div
          className="  text-center text-2xl text-white py-2 rounded-md font-bold "
          style={{
            width: "250px",
            height: "50px",
            marginTop: "-25px",
            marginLeft: "-25px",
            boxShadow: "#00000038 1.95px 1.95px 1.95px",

            backgroundColor: "hsl(356, 71%, 59%)",
          }}
        >
         สถานะการดำเนินงาน
        </div>
        <StepTest currentstep={stepsArray} number={stepNumber} />
        <div className=" flex justify-center gap-4 mt-3 text-xl flex-wrap  ">
          <SaveLogbook state={state} logbookData={project.logbook} />
          <StatusDisplay
            state={state}
            projectId={projectData.id}
            stateName={state_name}
            projectMembers={project.members}
            projectData={project}
            getProject={getProject}
          />
        </div>
        
      </div>

      <InformationDisplay state={state} projectData={project} />

      <div>{stateContent}</div>
    </div>
  );
}

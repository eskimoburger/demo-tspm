import { useState, useEffect } from "react";
import axios from "axios";
import State1final from "../studentsfortest/State1final";
import State2final from "../studentsfortest/State2final";
import State3final from "../studentsfortest/State3final";
import State4final from "../studentsfortest/State4final";
import State5final from "../studentsfortest/State5final";
import State6final from "../studentsfortest/State6final";
import State7final from "../studentsfortest/State7final";
import State8final from "../studentsfortest/State8final";
import State9final from "../studentsfortest/State9final";
import State10final from "../studentsfortest/State10final";
import State11final from "../studentsfortest/State11final";
import State12final from "../studentsfortest/State12final";
import State13final from "../studentsfortest/State13final";
import State14final from "../studentsfortest/State14final";
import State15final from "../studentsfortest/State15final";
import StepTest from "../studentsfortest/steptest";
import SaveLogbook from "../studentsfortest/SaveLogbook";
import StatusDisplay from "../studentsfortest/StatusDisplay";
import InformationDisplay from "../studentsfortest/InformationDisplay";

const DEFAULT_PROJECT_DATA = {
  id: 0,
  project_id: 0,
  project_name_th: "",
  project_name_eng: "",
  project_description: "",
  project_state: "",
  state: 0,
  logbook: 0,
};

const DEFAULT_DATA_PROJECT = {
  status: true,
  message: "Fetch Data Student Complete ",
  data: {
    projectData: {
      id: 120,
      project_name_eng: "Test Project",
      project_name_th: "โปรเจคทดสอบ",
      project_description: "สร้างโปรเจคสำหรับทดสอบ",
      project_id: 99,
      state: 0,
      logbook: 0,
      asses_status: 2,
      test_status: 1,
      final_status: 1,
      final_asses: 1,
      final_count: 0,
    },
    committees: [
      {
        id: 441,
        committee_name: "ดร.เศรษฐา ตั้งค้าวานิช ",
        role: "อาจารย์ที่ปรึกษา",
        status: 1,
        status_state3: 1,
        status_state5: 1,
        status_state10: 1,
        id_teacher: "2",
        project_id: 120,
        project_name_eng: "",
        teacher_name: "ดร.เศรษฐา ตั้งค้าวานิช ",
      },
      {
        id: 441,
        committee_name: "รองศาสตราจารย์ ดร.สุชาติ แย้มเม่น ",
        role: "กรรมการ",
        status: 1,
        status_state3: 1,
        status_state5: 1,
        status_state10: 1,
        id_teacher: "2",
        project_id: 120,
        project_name_eng: "",
        teacher_name: "รองศาสตราจารย์ ดร.สุชาติ แย้มเม่น ",
      },
      {
        id: 441,
        committee_name: "ดร.จิราพร พุกสุข ",
        role: "กรรมการ",
        status: 1,
        status_state3: 1,
        status_state5: 1,
        status_state10: 1,
        id_teacher: "2",
        project_id: 120,
        project_name_eng: "",
        teacher_name: "ดร.จิราพร พุกสุข ",
      },
    ],
    advisor: {
      id: 441,
      committee_name: "ดร.เศรษฐา ตั้งค้าวานิช ",
      role: "อาจารย์ที่ปรึกษา",
      status: 1,
      status_state3: 1,
      status_state5: 1,
      status_state10: 1,
      id_teacher: "2",
      project_id: 120,
      project_name_eng: "",
      teacher_name: "ดร.เศรษฐา ตั้งค้าวานิช ",
    },
    members: [
      {
        id: "60369999",
        name: "นาย ทดสอบ ระบบ",
      },
    ],
  },
};

export default function StudentIndexIdForTest({}) {
  const [project, setProject] = useState(DEFAULT_DATA_PROJECT);
  //const [checkState, setCheckState] = useState(0);
  const refreshData = () => {
    const cloneData = { ...project };
    cloneData["data"]["projectData"]["state"] =
      cloneData["data"]["projectData"]["state"] + 1;

    //setCheckState(checkState + 1);

    setProject(cloneData);
    //console.log(checkState);
  };
  let status = project.status;
  const stepsArray = [
    "เสนอหัวข้อโครงงาน",
    "สอบหัวข้อโครงงาน",
    "ประเมินความคืบหน้า",
    "สอบโครงงาน",
    "ส่งรูปเล่มโครงงาน",
  ];
  let stepNumber;
  let state_name;
  let stateComp;
  let stateCondition;
  let members = [];
  let committees = [];
  let projectData = {
    projectData: DEFAULT_PROJECT_DATA,
    members: [],
    committees: [],
  };
  let advisor;
  let logbookData = 0;
  let projectId = 0;

  const nextStageProject = async () => {
    await axios
      .put(
        `http://localhost:3001/final-project/next-stage/${project.data.projectData.id}`
      )
      .then(async (_) => {
        await refreshData();
        //getProject();
        console.log(_.data);
      });
  };

  if (status) {
    let {
      state,
      project_name_eng,
      project_name_th,
      id,
      project_id,
      asses_status,
      test_status,
      final_status,
      final_asses,
      final_count,
      logbook,
    } = project.data.projectData;
    members = project.data.members;
    committees = project.data.committees;
    advisor = project.data.advisor;
    stateCondition = state;
    stepNumber = state;
    projectData = project.data.projectData;
    logbookData = logbook;
    projectId = id;
    if (state === 0) {
      state_name = "เสนอหัวข้อโครงงาน";
      stateComp = (
        <State1final
          // user={{
          //   id: 60365260,
          //   prefix_th: "นาย",
          //   thname: "สุนทร",
          //   thlastname: "ป้องแสนสี",
          // }}
          refreshData={refreshData}
        />
      );
    } else if (state === 1) {
      state_name = "รออาจารย์ตอบกลับ (เสนอหัวข้อโครงงาน)";
      stepNumber = 1;
      stateComp = (
        <State2final
          projectName={project_name_eng}
          projectId={id}
          projectCPE={project_id}
          refreshData={refreshData}
          functionNext={nextStageProject}
        />
      );
    } else if (state === 2) {
      stepNumber = 2;
      state_name = "ขอสอบหัวข้อโครงงาน";
      stateComp = (
        <State3final
          projectData={projectData}
          members={members}
          projectId={id}
          committees={committees}
          refreshData={refreshData}
          functionNext={nextStageProject}
        />
      );
    } else if (state === 3) {
      stepNumber = 2;
      state_name = "รออาจารย์ตอบกลับ(ขอสอบหัวข้อโครงงาน)";
      stateComp = (
        <State4final
          projectId={id}
          committees={committees}
          refreshData={refreshData}
          functionNext={nextStageProject}
        />
      );
    } else if (state === 4) {
      stepNumber = 2;
      state_name = "บันทึกผลการสอบหัวข้อโครงงาน";
      stateComp = (
        <State5final
          projectId={id}
          committees={committees}
          functionNext={nextStageProject}
          projectName={project_name_eng}
          refreshData={refreshData}
        />
      );
    } else if (state === 5) {
      stepNumber = 2;
      state_name = "รออาจารย์ตอบกลับ(บันทึกผลสอบหัวข้อโครงงาน)";
      stateComp = (
        <State6final
          projectId={id}
          committees={committees}
          functionNext={nextStageProject}
          projectName={project_name_eng}
          refreshData={refreshData}
        />
      );
    } else if (state === 6) {
      stepNumber = 3;
      state_name = "ขอรับประเมินความคืบหน้า";
      stateComp = (
        <State7final
          projectId={id}
          committees={committees}
          members={members}
          advisor={advisor}
          functionNext={nextStageProject}
          projectNameTH={project_name_th}
          projectNameENG={project_name_eng}
          projectCPE={project_id}
          refreshData={refreshData}
          //projectData={projectData}
        />
      );
    } else if (state === 7) {
      stepNumber = 3;
      state_name = "รออาจารย์ตอบกลับ(ประเมินความคืบหน้า)";
      stateComp = (
        <State8final
          assesStatus={asses_status}
          advisor={advisor}
          projectId={id}
          functionNext={nextStageProject}
          projectData={projectData}
          committees={committees}
          members={members}
          refreshData={refreshData}
          goBack={() => {
            const cloneData = { ...project };
            cloneData["data"]["projectData"]["state"] = 0;
            setProject(cloneData);
          }}
        />
      );
    } else if (state === 8) {
      stepNumber = 4;
      state_name = "ขอสอบโครงงาน";
      stateComp = (
        <State9final
          projectData={projectData}
          members={members}
          projectId={id}
          committees={committees}
          functionNext={nextStageProject}
          projectNameENG={project_name_eng}
          advisor={advisor}
          refreshData={refreshData}
        />
      );
    } else if (state === 9) {
      stepNumber = 4;
      state_name = "รออาจารย์ตอบกลับ(ขอสอบโครงงาน)";
      stateComp = (
        <State10final
          testStatus={test_status}
          projectId={id}
          functionNext={nextStageProject}
          advisor={advisor}
          refreshData={refreshData}
          goBack={() => {
            const cloneData = { ...project };
            cloneData["data"]["projectData"]["state"] = 8;
            setProject(cloneData);
          }}
        />
      );
    } else if (state === 10) {
      stepNumber = 4;
      state_name = "บันทึกผลการสอบโครงงาน";
      stateComp = (
        <State11final
          testStatus={test_status}
          projectId={id}
          functionNext={nextStageProject}
          advisor={advisor}
          refreshData={refreshData}
          projectNameENG={project_name_eng}
        />
      );
    } else if (state === 11) {
      stepNumber = 4;
      state_name = "รออาจารย์ตอบกลับ(ขอสอบโครงงาน)";
      stateComp = (
        <State12final
          finalStatus={final_status}
          projectId={id}
          functionNext={nextStageProject}
          advisor={advisor}
          refreshData={refreshData}
          projectNameENG={project_name_eng}
          members={members}
        />
      );
    } else if (state == 12) {
      state_name = "ประเมินรูปเล่มปริญญานิพนธ์";
      stepNumber = 5;
      stateComp = (
        <State13final
          projectId={id}
          finalAssesStatus={final_asses}
          projectNameTH={project_name_th}
          projectNameENG={project_name_eng}
          committees={committees}
          finalCount={final_count}
          functionNext={nextStageProject}
          members={members}
          projectCPE={project_id}
        />
      );
    } else if (state == 13) {
      state_name = "รอผลการประเมินรูปเล่มปริญญานิพนธ์";
      stepNumber = 5;
      stateComp = (
        <State14final
          projectId={id}
          finalAssesStatus={final_asses}
          projectNameTH={project_name_th}
          projectNameENG={project_name_eng}
          committees={committees}
          finalCount={final_count}
          functionNext={nextStageProject}
          members={members}
          projectCPE={project_id}
          refreshData={refreshData}
         // finalCount={final_count}
        />
      );
    } else if (state == 14) {
      state_name = " ผ่านการประเมินรูปเล่มปริญญานิพนธ์";
      stepNumber = 6;
      stateComp = <State15final />;
    }
  } else {
    stepNumber = 1;
    stateComp = (
      <State1final
        user={{
          id: 60365260,
          prefix_th: "นาย",
          thname: "สุนทร",
          thlastname: "ป้องแสนสี",
        }}
        refreshData={refreshData}
      />
    );
    state_name = "เสนอหัวข้อโครงงาน";
    stateCondition = 0;
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
          <SaveLogbook
            state={stateCondition}
            logbookData={logbookData}
            projectId={projectId}
            refreshData={refreshData}
          />

          <StatusDisplay
            state={stateCondition}
            projectId={0}
            stateName={state_name}
            projectMembers={members}
            projectData={projectData}
            refreshData={refreshData}
            // getProject={getProject}
          />
        </div>
      </div>

      <InformationDisplay
        state={stateCondition}
        projectData={{ projectData, committees, members }}
      />

      <div>{stateComp}</div>
      {/* {JSON.stringify(projectData)}
      {projectData.id} */}
      <button onClick={refreshData}>Next</button>
    </div>
  );
}

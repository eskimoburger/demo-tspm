import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DetailsIcon from "@material-ui/icons/Details";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import axios from "axios";

const ASSES_LABEL = {
  1: "ทำได้ตามข้อกำหนด",
  2: "ทำได้บางส่วน",
  3: "ไม่เป็นไปตามข้อกำหนด",
  4: "ไม่สามารถประเมินได้",
};
const SUMMARIZE = {
  1: "เหมาะสม",
  2: "ไม่เหมาะสม",
};

const InformationDisplay = ({ state, projectData }) => {
  const {
    project_id,
    project_name_th,
    project_name_eng,
    project_description,
    id,
    final_count,
  } = projectData?.projectData;
  const { committees, members } = projectData;
  const [detail, setDetail] = useState(false);
  const [openMid, setOpenMid] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);
  const [openAsses, setOpenAsses] = useState(false);
  const [openFinalAsses, setOpenFinalAsses] = useState(false);
  const [midResults, setMidResults] = useState([]);
  const [assesResults, setAssesResults] = useState(null);
  const [finalAssesResults, setFinalAssesResults] = useState(null);
  const [finalResults, setFinalResults] = useState([]);

  const getMidExamResults = async () => {
    // await axios
    //   .get("https://demo-tspm-server.herokuapp.com/final-project/mid-exam-result/" + id)
    //   .then((res) => {
    //     setMidResults(res.data.exam_result);
    //     setOpenMid(true);
    //   })
    //   .catch((_) => alert("Cannot get results"));

    setMidResults([
      {
        exam_status: 0,
        id_teacher: 2,
        exam_value: "ผ่าน",
        exam_details:
          "ดีเลยครับ ไปต่างประเทศแน่นอน//แก้ไขโดย : ดร.เศรษฐา ตั้งค้าวานิช  --> ไปแน่นอนน้อนน",
        committee_name: "ดร.เศรษฐา ตั้งค้าวานิช ",
        role: "อาจารย์ที่ปรึกษา",
        project_name_eng: "",
        project_id: 120,
      },
      {
        exam_status: 0,
        id_teacher: 5,
        exam_value: "ผ่าน",
        exam_details: "ผ่านค่ะ//แก้ไขโดย : ดร.จิราพร พุกสุข  --> ผ่านแล้วววววว",
        committee_name: "ดร.จิราพร พุกสุข ",
        role: "กรรมการ",
        project_name_eng: "",
        project_id: 120,
      },
      {
        exam_status: 0,
        id_teacher: 7,
        exam_value: "ผ่าน",
        exam_details:
          "ผ่าน//แก้ไขโดย : รองศาสตราจารย์ ดร.พงศ์พันธ์ กิจสนาโยธิน  --> ผ่านแล้วว",
        committee_name: "รองศาสตราจารย์ ดร.พงศ์พันธ์ กิจสนาโยธิน ",
        role: "กรรมการ",
        project_name_eng: "",
        project_id: 120,
      },
    ]);
    setOpenMid(true);
  };

  const getFinalExamResults = async () => {
    // await axios
    //   .get("https://demo-tspm-server.herokuapp.com/final-project/final-exam-result/" + id)
    //   .then((res) => {
    //     setFinalResults(res.data.exam_result);
    //     setOpenFinal(true);
    //   })
    //   .catch((_) => alert("Cannot get results"));

    setFinalResults([
      {
        exam_status: 0,
        id_teacher: 2,
        exam_value: "ผ่าน",
        exam_details:
          "ผ่านยื่นจบได้เลยครับ//แก้ไขโดย : ดร.เศรษฐา ตั้งค้าวานิช  --> ได้เลยยื่นได้เลย",
        committee_name: "ดร.เศรษฐา ตั้งค้าวานิช ",
        role: "อาจารย์ที่ปรึกษา",
        project_name_eng: "",
        project_id: 120,
      },
      {
        exam_status: 0,
        id_teacher: 5,
        exam_value: "ผ่าน",
        exam_details: "ผ่านยื่นจบได้เลย//แก้ไขโดย : ดร.จิราพร พุกสุข  --> โอเค",
        committee_name: "ดร.จิราพร พุกสุข ",
        role: "กรรมการ",
        project_name_eng: "",
        project_id: 120,
      },
      {
        exam_status: 0,
        id_teacher: 7,
        exam_value: "ผ่าน",
        exam_details: "ผ่านยื่นจบได้เลย",
        committee_name: "รองศาสตราจารย์ ดร.พงศ์พันธ์ กิจสนาโยธิน ",
        role: "กรรมการ",
        project_name_eng: "",
        project_id: 120,
      },
    ]);
    setOpenFinal(true);
  };

  const getAssesResult = async () => {
    // await axios
    //   .get("https://demo-tspm-server.herokuapp.com/final-project/get-asses-results/" + id)
    //   .then((res) => {
    //     setAssesResults(res.data);
    //     setOpenAsses(true);
    //   })
    //   .catch((_) => alert("Cannot get results"));
    setAssesResults({
      asses_project: {
        id_asses: 4,
        id_project: 120,
        asses1: "1",
        asses2: "1",
        asses3: "1",
        asses4: "1",
        asses5: "1",
        feedback: "ไปเพิ่ม.....",
        asses_status: 0,
      },
      asses_member: [
        {
          id_student: 60369999,
          student1: "A",
          student2: "A",
          student3: "A",
          student4: "A",
          name: "นาย ทดสอบ ระบบ",
        },
      ],
    });
    setOpenAsses(true);
  };

  const getFinalAsses = async () => {
    // await axios
    //   .get(
    //     `https://demo-tspm-server.herokuapp.com/final-project/get-asses-final/${id}/${
    //       final_count - 1
    //     }`
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     setFinalAssesResults(res.data);
    //     setOpenFinalAsses(true);
    //   })
    //   .catch((_) => alert("Cannot get results"));

    setFinalAssesResults([
      {
        id: 57,
        id_project: 120,
        final1: 2,
        final2: 2,
        final3: 2,
        final4: 1,
        final_details: "ไปแก้นี่มานะ........",
        times: 0,
      },
    ]);
    setOpenFinalAsses(true);
  };

  return (
    <div
      className=" bg-white  rounded-md p-3 mt-5   "
      style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
    >
      <div className=" flex justify-center gap-4  text-xl flex-wrap ">
        <div
          className="  rounded-lg border border-gray-200 "
          style={{ width: 730 }}
        >
          <div
            className="p-2 text-white rounded-t-lg text-2xl"
            style={{ backgroundColor: "#32a5c2" }}
          >
            ข้อมูลโครงงาน
          </div>
          <div className="bg-white rounded-b-lg m-2 font-medium px-2  ">
            {state == 0 ? (
              <p>ยังไม่มีข้อมูล</p>
            ) : (
              //0ld
              // <div className="text-xl space-y-1 ">
              //   <p>รหัสโครงงาน : CPE{projectData.id.toString().padStart(2, 0)}</p>
              //   <p>ชื่อโครงงาน (ภาษาไทย) : {projectData.name} </p>
              //   <p>ชื่อโครงงาน (ภาษาอังกฤษ) : {projectData.name_eng} </p>
              //   <p className="font-bold">อาจารย์ประจำโครงงาน</p>
              //   {projectData.committees.map((teacher, index) => {
              //     return (
              //       <div className="ml-2" key={index}>
              //         <p>
              //           {index + 1}. {teacher.teacher_name}
              //           {/* <br /> */}
              //           <span className="font-bold">ตำแหน่ง : </span>{" "}
              //           {teacher.role}
              //         </p>
              //       </div>
              //     );
              //   })}
              //   <button
              //     className="bg-yellow-400 text-black px-2 p-1 rounded-lg shadow-lg hover:bg-yellow-300"
              //     onClick={() => {
              //       setDetail(true);
              //     }}
              //   >
              //     ดูรายละเอียดโครงงาน
              //   </button>
              // </div>

              //new
              <div className="text-xl space-y-1 ">
                <p>
                  รหัสโครงงาน :{" "}
                  {project_id === 0
                    ? "ยังไม่มีข้อมูล"
                    : "CPE" + project_id.toString().padStart(2, 0)}
                </p>
                <p>ชื่อโครงงาน (ภาษาไทย) : {project_name_th} </p>
                <p>ชื่อโครงงาน (ภาษาอังกฤษ) : {project_name_eng} </p>
                <p className="font-bold">อาจารย์ประจำโครงงาน</p>
                {committees.map((teacher, index) => {
                  return (
                    <div className="ml-2" key={index}>
                      <p>
                        {index + 1}. {teacher.teacher_name}
                        <span className="font-bold">ตำแหน่ง : </span>{" "}
                        {teacher.role}
                      </p>
                    </div>
                  );
                })}
                <Button
                  variant="contained"
                  style={{ fontSize: 16, backgroundColor: "#ffc107" }}
                  startIcon={<DetailsIcon />}
                  size="small"
                  onClick={() => {
                    setDetail(true);
                  }}
                >
                  ดูรายละเอียดโครงงาน
                </Button>
              </div>
            )}
            <div className="my-2">
              {state >= 6 && (
                <h3 className="text-xl font-bold my-1">บันทึกผล</h3>
              )}
              <div className="flex flex-wrap gap-2">
                {state >= 6 && (
                  <Button
                    startIcon={<ChromeReaderModeIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: 14 }}
                    onClick={getMidExamResults}
                  >
                    บันทึกผลการสอบเสนอหัวข้อโครงงาน
                  </Button>
                )}
                {state >= 8 && (
                  <Button
                    startIcon={<ChromeReaderModeIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: 14 }}
                    onClick={getAssesResult}
                  >
                    ผลการประเมินความคืบหน้า
                  </Button>
                )}
                {state >= 12 && (
                  <Button
                    startIcon={<ChromeReaderModeIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ fontSize: 14 }}
                    onClick={getFinalExamResults}
                  >
                    บันทึกผลการสอบโครงงาน
                  </Button>
                )}
              </div>
            </div>
            {final_count > 0 && (
              <div>
                <h3 className="text-xl font-bold my-1">
                  ผลการประเมินรูปเล่มวิทยานิพนธ์
                </h3>
                <Button
                  startIcon={<ChromeReaderModeIcon />}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ fontSize: 14 }}
                  onClick={getFinalAsses}
                >
                  ผลการประเมินรูปเล่ม
                </Button>
              </div>
            )}
          </div>
        </div>
        <div
          className=" w-1/2  rounded-lg border border-gray-200 "
          style={{ width: 730 }}
        >
          <div
            className="p-2  text-white rounded-t-lg text-2xl"
            style={{ backgroundColor: "#32a5c2" }}
          >
            สมาชิกในกลุ่ม
          </div>

          <div className="bg-white rounded-b-lg m-2 px-2 text-xl">
            {state == 0 ? (
              <p>ยังไม่มีข้อมูล</p>
            ) : (
              <div>
                {members.map((member, index) => {
                  return (
                    <p key={index}>
                      รหัสนิสิต {member.id} ชื่อ {member.name}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div style={{ height: 50 }} />
        </div>
      </div>
      <Dialog
        open={detail}
        onClose={() => {
          setDetail(false);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"รายละเอียดโครงงาน"}</p>{" "}
        </DialogTitle>
        <DialogContent
          className=" text-xl mb-4 "
          style={{ wordBreak: "break-word", textIndent: "40px" }}
        >
          <p>{project_description}</p>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openMid}
        onClose={() => {
          setOpenMid(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการสอบหัวข้อโครงงาน"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4  space-y-4">
          {midResults.map((m, i) => {
            return (
              <div key={i}>
                <h3 className="">
                  <span className="font-bold">{m.role}</span> {m.committee_name}
                </h3>
                <p
                  className="bg-gray-100 py-1"
                  style={{ wordBreak: "break-word", textIndent: "20px" }}
                >
                  {m.exam_details.length === 0
                    ? "ไม่มีข้อเสนอแนะ"
                    : m.exam_details}
                </p>
              </div>
            );
          })}
          <div></div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openFinal}
        onClose={() => {
          setOpenFinal(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการสอบโครงงาน"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4 space-y-2 ">
          {finalResults.map((m, i) => {
            return (
              <div key={i}>
                <h3 className="">
                  <span className="font-bold">{m.role}</span> {m.committee_name}
                </h3>
                <p
                  className="bg-gray-100 py-1"
                  style={{ wordBreak: "break-word", textIndent: "20px" }}
                >
                  {m.exam_details.length === 0
                    ? "ไม่มีข้อเสนอแนะ"
                    : m.exam_details}
                </p>
              </div>
            );
          })}
          <div></div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAsses}
        onClose={() => {
          setOpenAsses(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการประเมินความคืบหน้า"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4 ">
          {assesResults && (
            <div>
              <div className=" indent-2  ">
                <p>
                  {" "}
                  1. การดำเนินงานตามวัตถุประสงค์ &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses1]}
                  </span>
                </p>
                <p>
                  {" "}
                  2. การดำเนินงานตามแผนงาน/ปฏิทิน &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses2]}
                  </span>
                </p>
                <p>
                  {" "}
                  3. การแบ่งงานและการทำงานเป็นทีม (กรณีมีนิสิตมากกว่า 1 คน)
                  &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses3]}
                  </span>
                </p>
                <p>
                  {" "}
                  4. ผลผลิต/ผลลัพธ์ของโครงงาน &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses4]}
                  </span>
                </p>
                <p>
                  {" "}
                  5. ความสมบูรณ์ของรายงาน &nbsp;{" "}
                  <span className="font-bold">
                    {ASSES_LABEL[assesResults.asses_project.asses5]}
                  </span>
                </p>
              </div>

              <p className="my-2 font-bold"> ผลการประเมินนิสิตที่ทำโครงงาน</p>

              <table className="table-auto text-lg">
                <thead>
                  <tr>
                    <th>
                      หัวข้อการประเมิน <hr /> สมาชิกในกลุ่ม
                    </th>
                    <th>ความรู้ความเข้าใจเกี่ยวกับโครงงาน</th>
                    <th> ความรับผิดชอบและการมีส่วนร่วม</th>
                    <th> ความตรงต่อเวลา</th>
                    <th> การปฏิบัติตามจรรยาบรรณของนักวิจัย</th>
                  </tr>
                </thead>
                <tbody>
                  {assesResults.asses_member.map((m, i) => {
                    return (
                      <tr key={i} className="text-center text-base">
                        <td>
                          {m.id_student} {m.name}
                        </td>
                        <td>{m.student1}</td>
                        <td>{m.student2}</td>
                        <td>{m.student3}</td>
                        <td>{m.student4}</td>
                      </tr>
                    );
                  })}
                  {assesResults.asses_project.feedback.length > 0 && (
                    <>
                      <h2 className="my-2 font-bold"> ข้อเสนอแนะ</h2>
                      <div className="indent-2">
                        {assesResults.asses_project.feedback}
                      </div>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div></div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openFinalAsses}
        onClose={() => {
          setOpenFinalAsses(false);
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <p className="text-2xl">{"ผลการประเมินรูปเล่มปริญานิพนธ์"}</p>{" "}
        </DialogTitle>
        <DialogContent className=" text-xl mb-4 space-y-2 ">
          {/* {JSON.stringify(finalAssesResults)} */}
          {finalAssesResults && (
            <>
              <div>
                <p>
                  1.
                  รูปแบบการพิมพ์รายงานถูกต้องตามระเบียบของคณะและ/หรือมหาวิทยาลัย
                  &nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final1]}
                  </span>
                </p>{" "}
                <p>
                  2. เนื้อหารายงานครบถ้วนสมบูรณ์&nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final2]}
                  </span>
                </p>{" "}
                <p>
                  3. การอ้างอิงบรรณานุกรมถูกต้องตามรูปแบบที่กำหนด&nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final3]}
                  </span>
                </p>
                <p>
                  {" "}
                  4. รูปแบบการเขียนสารบัญเนื้อหา
                  สารบัญรูปภาพและตารางถูกต้องตามกำหนด &nbsp;{" "}
                  <span className="font-bold">
                    {SUMMARIZE[finalAssesResults[0].final4]}
                  </span>
                </p>
              </div>
              <div>
                <h2 className="font-bold">ข้อเสนอแนะ</h2>
                <div className="indent-2">
                  <p>{finalAssesResults[0].final_details}</p>
                </div>
              </div>
            </>
          )}

          {/* {finalResults.map((m, i) => {
            return (
              <div key={i}>
                <h3 className="">
                  <span className="font-bold">{m.role}</span> {m.committee_name}
                </h3>
                <p
                  className="bg-gray-100 py-1"
                  style={{ wordBreak: "break-word", textIndent: "20px" }}
                >
                  {m.exam_details.length === 0
                    ? "ไม่มีข้อเสนอแนะ"
                    : m.exam_details}
                </p>
              </div>
            );
          })} */}
          <div></div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InformationDisplay;

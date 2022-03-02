import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
//import styles from "../../styles/notification.module.scss";
import Link from "next/link";
import styles from "../../styles/final_assess.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function testState({
  projectID,
  projectName,
  teacherID,
  teacherName,
}) {

  const sortedBy = {
    'อาจารย์ที่ปรึกษา'  : 0, 
    'อาจารย์ที่ปรึกษาร่วม'   : 1, 
    'กรรมการ' : 2,
  }

  const showSort = () =>{
    
    const result = project.committees.sort((a, b) => sortedBy[a.role] - sortedBy[b.role])
    console.log(result)
  }

  const sortTeacherRole = (a,b) => {
   return sortedBy[a.role] - sortedBy[b.role]

  }



  const [value, setValue] = useState(false);
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(
    "https://demo-tspm-server.herokuapp.com/cpetest/612f43e142f8c.pdf"
  );
  const handleClickOpen = async () => {
   setOpen(true);
  };

  const handleClose = () => {
    setFinalStatus(0)
    setOpen(false);
  };

  const [project, setProject] = useState(null);
  const [finalStatus, setFinalStatus] = useState(0);
  const [final, setFinal] = useState({
    final1: 0,
    final2: 0,
    final3: 0,
    final4: 0,
    //final1:0,
  });

  const [members, setMembers] = useState([]);
  var summarize = [
    { label: "สมควรแก้ไขรายงานตามคำแนะนำและส่งให้ตรวจซ้ำอีกครั้ง", value: 1 },
    { label: "ไม่ต้องทำการแก้ไขรายงาน", value: 2 },
  ];

  const getProjectMembers = (id) => {
    axios
      .get(`https://demo-tspm-server.herokuapp.com/notification/getproject/` + id)
      .then((response) => {
        console.log(response.data);
        setMembers(response.data.members);
      });
  };

  const getDataProject = (id) => {
    axios
      .get("https://demo-tspm-server.herokuapp.com/project/getprojectbyid/" + id)
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
        //setFinal(res.data.final_assess);
        //setFinalStatus(res.data.data_project.final_assess);
      });
  };

  useEffect(() => {
    //getProjectMembers(1);
    //getDataProject();
  }, []);

  useEffect(() => {
    getFile();
  }, []);

  const [showFile, setShowFile] = useState("");
  const getFile = () => {
    //console.log(projectID)
    axios
      .get(`https://demo-tspm-server.herokuapp.com/project/showfilefinalstate/${projectID}`)
      .then((res) => {
        console.log(res.data);
        setShowFile(res.data);
      });
  };

  const finalGetProjectAsses = (id) =>{
    axios.get(`https://demo-tspm-server.herokuapp.com/final-course/project-asses/${id}`).then((res)=>{
      console.log(res.data)
      setProject(res.data.data_project)
    })
  }

  const finalSendFinalAsses = (id) =>{
    axios.post(`https://demo-tspm-server.herokuapp.com/final-course/project-asses/${id}`,{final:final,finalStatus:finalStatus}).then((res)=>{
      console.log(res.data)
    })
  }

  

  return (
    <>
      <div className="my-4">
        <a
          href={showFile}
          target="_blank"
          className=" block mb-2 focus:outline-none  bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border  rounded shadow "
          style={{ width: "270px" }}
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            <i className="bx bx-link-alt" style={{ fontSize: "24px" }}></i>
            ไฟล์รูปเล่มปริญญานิพนธ์
          </span>
        </a>
        {/* <div className="text-blue-600  cursor-pointer hover:text-indigo-500">
        <a href={showFile} target="_blank">
          ดูไฟล์โครงงงาน {props.teacherID} {props.projectID}
        </a>
      </div> */}
      </div>
      <div className="flex space-x-5 justify-center">
        <button
          onClick={() => {
            handleClickOpen();
            finalGetProjectAsses(projectID)
          }}
          className="focus:outline-none  bg-blue-100 hover:bg-blue-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"
        >
          <span
            className="flex items-center gap-2"
            style={{ fontSize: "18px" }}
          >
            {" "}
            <i className="bx bxs-cube" style={{ fontSize: "24px" }}></i>{" "}
            ประเมินรูปเล่มปริญญานิพนธ์
          </span>
        </button>

      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogTitle>
          <p className="text-2xl">แบบประเมินรูปเล่มปริญญานิพนธ์</p>{" "}
          {/* <button onClick={()=>console.log(final,finalStatus)}>55</button> */}
        </DialogTitle>
        <DialogContent dividers>
          {project ? (
            <div className="text-xl">
              <p>
                <span className="font-bold">รหัสโครงงาน :</span> CPE
                {project.project.id.toString().padStart(2, 0)}
              </p>
              <p>
                <span className="font-bold">ชื่อโครงงาน : </span>
                {project.project.project_name_th}
              </p>

              <p>
                <span className="font-bold">ชื่อโครงงานภาษาอังกฤษ : </span>
                {project.project.project_name_eng}
              </p>
              <p className="font-bold">สมาชิกในกลุ่ม</p>
              {project.members.map((member, index) => {
                return (
                  <p className="ml-5" key={index}>
                    {member.id} {member.name}
                  </p>
                );
              })}
              <p className="font-bold">อาจารย์</p>

              {project.committees.sort(sortTeacherRole).map((teacher,index)=>{
                return(<div className="ml-5" key={index}> {index+1}. {teacher.role} {teacher.committee_name}</div>)
              })}
              {/* {project.committees.map((committee, index) => {
                let count = 0;
                return (
                  <div key={index}>
                    {committee.role == "อาจารย์ที่ปรึกษา" ? (
                      <p>
                        {count + 1}. อาจารย์ที่ปรึกษา {committee.committee_name}
                      </p>
                    ) : committee.role == "อาจารย์ที่ปรึกษาร่วม" ? (
                      <p>
                        {count + 1}. อาจารย์ที่ปรึกษาร่วม
                        {committee.committee_name}
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                );
              })} */}
              <br />
              <p>ผลการประเมินรูปเล่มรายงานปริญญานิพนธ์</p>
              <br />
              <div
                className={styles.table_student}
                style={{ fontSize: "18px" }}
              >
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "15%", textAlign: "center" }}>
                        ไม่เหมาะสม
                      </th>
                      <th style={{ width: "15%", textAlign: "center" }}>
                        เหมาะสม
                      </th>
                      <th style={{ textAlign: "center" }}>หัวข้อการประเมิน</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.center}>
                        <input
                          className="inline-block align-middle"
                          type="radio"
                          id="final1"
                          value={1}
                          checked={final.final1 == 1}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td className={styles.center}>
                        <input
                          type="radio"
                          id="final1"
                          value={2}
                          checked={final.final1 == 2}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td>
                        1.
                        รูปแบบการพิมพ์รายงานถูกต้องตามระเบียบของคณะและ/หรือมหาวิทยาลัย
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.center}>
                        <input
                          type="radio"
                          id="final2"
                          value={1}
                          checked={final.final2 == 1}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>

                      <td className={styles.center}>
                        {" "}
                        <input
                          type="radio"
                          id="final2"
                          value={2}
                          checked={final.final2 == 2}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td>2. เนื้อหารายงานครบถ้วนสมบูรณ์</td>
                    </tr>
                    <tr>
                      <td className={styles.center}>
                        <input
                          type="radio"
                          id="final3"
                          value={1}
                          checked={final.final3 == 1}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td className={styles.center}>
                        {" "}
                        <input
                          type="radio"
                          id="final3"
                          value={2}
                          checked={final.final3 == 2}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td>3. การอ้างอิงบรรณานุกรมถูกต้องตามรูปแบบที่กำหนด</td>
                    </tr>
                    <tr>
                      <td className={styles.center}>
                        <input
                          type="radio"
                          id="final4"
                          value={1}
                          checked={final.final4 == 1}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td className={styles.center}>
                        <input
                          type="radio"
                          id="final4"
                          value={2}
                          checked={final.final4 == 2}
                          onChange={(e) => {
                            setFinal((prev) => {
                              return { ...prev, [e.target.id]: e.target.value };
                            });
                          }}
                        />
                      </td>
                      <td>
                        4. รูปแบบการเขียนสารบัญเนื้อหา
                        สารบัญรูปภาพและตารางถูกต้องตามกำหนด{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {finalStatus == 1 ?
                <>
                <p className="font-bold">สิ่งที่ควรแก้ไขเพิ่มเติม</p>
              <div className="flex justify-center mt-2">
                <textarea
                  //id="edit"
                  className="bg-gray-100 p-2"
                  placeholder="เพิ่มข้อเสนอแนะ"
                  rows="4"
                  cols="200"
                  //value={edit}
                  //onChange={onChangeEdit}
                ></textarea>
              </div>
              </>:null  }
              <p className="font-bold">สรุป</p>
              <div className="ml-5">
                {summarize.map((sum, index) => {
                  return (
                    <div key={index}>
                      <input
                        id={sum.value}
                        type="radio"
                        name="summarize"
                        value={sum.value}
                        checked={finalStatus == sum.value}
                        onChange={(e) => {
                          setFinalStatus(e.target.value);
                        }}
                      />
                      <label htmlFor={sum.value}>{sum.label}</label>
                    </div>
                  );
                })}
              </div>
              {/* <button onClick={()=>showSort()}>test</button> */}
            </div>
          ) : (
            <div>Loading ...</div>
          )}
        </DialogContent>

        <DialogActions>
        <Button onClick={()=>{handleClose()}} variant="contained" color="secondary">
            ปิด
          </Button>
         {finalStatus != 0 && final.final1 != 0 && final.final2 != 0 && final.final3 != 0 && final.final4 != 0  ? <Button
            onClick={() => {
              //console.log(asses,feedback,assesStudent,assesStatus);

          finalSendFinalAsses(projectID)
              //finalSendAsses();
              //setAlert(true)
            }}
            variant="contained"
            color="primary"
          >
            ตกลง
          </Button>:null}
        </DialogActions>
      </Dialog>
    </>
  );
}

import React, { useState,useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import styles from "../../styles/notification.module.scss";
import Asses from "../Asses";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function teacherState3({
  projectID,
  projectName,
  teacherID,
  teacherName,
  idNotification,functionNew
}) {
  const [open, setOpen] = useState(false);
  const [asses, setAsses] = useState(null);
  const [assesStudent, setAssesStudent] = useState([]);
  const [assesStatus, setAssesStatus] = useState(0);
  const [project, setProject] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [buttonShow,setButtonShow] = useState(null)

  const [alert,setAlert] = useState(false)

  const asses_status_map = {
    1:"ไม่สมควรดำเนินโครงงานในหัวข้อนี้ต่อไป",
    2:"สมควรให้ดำเนินโครงงานต่อไป แต่ควรมีการปรับแก้ตามข้อเสนอแนะ",
    3:"สมควรให้ดำเนินโครงงานต่อไป"
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [members, setMembers] = useState([]);

  const getProjectMembers = (id) => {
    axios
      .get(`http://localhost:3001/notification/getproject/` + id)
      .then((response) => {
        console.log(response.data);
        setMembers(response.data.members);
      });
  };

  const getAsses = () => {
    axios
      .get("http://localhost:3001/project/asses/" + projectID)
      .then((res) => {
        console.log(res.data);
        setAsses(res.data.asses[0]);
        setAssesStudent(res.data.asses_student);
        setAssesStatus(res.data.project_data[0].asses_status);
        setProject(res.data.project_data[0]);
        setFeedback(res.data.asses[0].feedback);
        setButtonShow(res.data.project_data[0].asses_status)
      });
  };


  const  finalGetAsses = async() =>{
    await axios.get("http://localhost:3001/final-teacher/asses/" + projectID).then((res)=>{
      setAsses(res.data.project_asses)
      setAssesStudent(res.data.student_asses)

      console.log(res.data)
      
    })
  }

  const finalSendAsses = async(des)=>{
    await axios.post("http://localhost:3001/final-teacher/asses/" + projectID,{asses:asses,assesStatus:assesStatus,feedback:feedback,assesStudent:assesStudent,idNotification:idNotification,description:des,idTeacher:teacherID}).then(async(res)=>{
      await functionNew();
      console.log(res.data)
      setAlert(false)
    })

  }

  var values = [
    { value: 1, label: "ทำได้ตามข้อกำหนด" },
    { value: 2, label: "ทำได้บางส่วน" },
    { value: 3, label: "ไม่เป็นไปตามข้อกำหนด" },
    { value: 4, label: "ไม่สามารถประเมินได้" },
  ];
  var values_student = ["A", "B", "C", "D", "F", "U"];
  var summarize = [
    { value: 1, label: "ไม่สมควรดำเนินโครงงานในหัวข้อนี้ต่อไป" },
    {
      value: 2,
      label: "สมควรให้ดำเนินโครงงานต่อไป แต่ควรมีการปรับแก้ตามข้อเสนอแนะ",
    },
    { value: 3, label: "สมควรให้ดำเนินโครงงานต่อไป" },
  ];

  const updateFieldChanged = (e, index, student) => {
    const cloneData = [...assesStudent];

    cloneData[index][student] = e.target.value;
    // console.log(cloneData);
    // console.log(student);
    setAssesStudent(cloneData);
  };

  // const updateAsses =  () => {
  //   axios
  //     .put("http://localhost:3001/project/asses/" + projectID, {
  //       asses1: asses.asses1,
  //       asses2: asses.asses2,
  //       asses3: asses.asses3,
  //       asses4: asses.asses4,
  //       asses5: asses.asses5,
  //       feedback: feedback,
  //       assesStatus: assesStatus,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
        
  //     });



  //  for (let i = 0; i < assesStudent.length ; i++  ){
  //   axios
  //   .put("http://localhost:3001/project/asses_student/" + projectID, {
  //     idStudent:assesStudent[i].id_student ,
  //     student1: assesStudent[i].student1,
  //     student2: assesStudent[i].student2,
  //     student3: assesStudent[i].student3,
  //     student4: assesStudent[i].student4,
      
  //   })
  //   .then((res) => {
  //     console.log(res.data);
      
  //   });
  //      console.log(i)


  //  }
    

     

  //  getAsses();
  //  handleClose();

     
  // };

  const finalUpdateAsses = () =>{
    console.log("hello")
  }

  return (
    <>
      <div>
        {/* {assesStatus == 0 ? <p
          onClick={() => {
            handleClickOpen(), getAsses();
          }}
          className="text-blue-600  cursor-pointer hover:text-indigo-500"
        >
          แบบประเมินความคืบหน้าของโครงงาน
        </p> : <p></p>  } */}
      </div>
      <div className="flex space-x-5 justify-center mt-4">
        {/* <button
          className="bg-blue-700 px-8  py-2 text-white   text-lg shadow-sm font-medium tracking-wider   rounded-2xl hover:shadow-2xl hover:bg-blue-500 focus:outline-none"
          onClick={() => {
            handleClickOpen(), getProjectMembers(projectID), getAsses();
          }}
        >
          ประเมินความคืบหน้า
        </button> */}

        <button
          onClick={()=>{
            handleClickOpen(),finalGetAsses()
          }}
          className="focus:outline-none  bg-green-100 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"  
        >
          <span className="flex items-center gap-2" style={{fontSize:"18px"}}> <i className='bx bx-comment-add' style={{fontSize:"24px"}}  ></i>ประเมินความคืบหน้าโครงงาน</span>        
        </button>

       {/* {  buttonShow  == 0 ? 
       <>
       
       
        <button
          onClick={updateAsses}
          className="focus:outline-none  bg-green-100 hover:bg-green-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"  
        >
          <span className="flex items-center gap-2" style={{fontSize:"18px"}}> <i className='bx bxs-check-square' style={{fontSize:"24px"}}  ></i>ยอมรับ</span>        
        </button>


        <button
          onClick={() => {
            handleClickOpen(), getAsses();
          }}
          className="focus:outline-none  bg-yellow-100 hover:bg-yellow-200 text-gray-800 font-semibold py-2 px-4   rounded shadow"  
        >
           <span className="flex items-center gap-2" style={{fontSize:"18px"}}> <i className='bx bxs-edit-alt' style={{fontSize:"24px"}}  ></i> แก้ไข </span>        
        </button>
       
        </>
       :
       <div></div>
       } */}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        //onClose={handleClose}
        fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogTitle>
          <p className="text-2xl">ประเมินความก้าวหน้าของโครงงาน </p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          <div>
            {/* <button onClick={()=>{console.log(assesStudent)}}>TestData</button> */}
            {asses ? (
              <>
                <p>
                  <span className="font-bold">รหัสโครงงาน :</span> CPE
                  {asses.project_id.toString().padStart(2, 0)}
                </p>
                <p>
                  <span className="font-bold">ชื่อโครงงาน : </span>
                  {asses.project_name_th}
                </p>
              </>
            ) : 
              null
            }
            <br />

            <p className="font-bold"> ผลการประเมินความก้าวหน้าของงาน</p>
            {asses ? (
              <div className="flex flex-col space-y-4  ">
                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <label htmlFor="asses1">
                    {asses.asses1 == 0 ? (
                      <span className="text-red-500 font-bold"> * </span>
                    ) : (
                      <span></span>
                    )}{" "}
                    1. การดำเนินงานตามวัตถุประสงค์{" "}
                  </label>
                  <select
                    className="ml-5 bg-gray-100"
                    id="asses1"
                    value={asses.asses1}
                    onChange={(e) =>
                      setAsses((prev) => {
                        return { ...prev, [e.target.id]: e.target.value };
                      })
                    }
                  >
                    <option hidden>ความคิดเห็นผู้ประเมิน</option>
                    {values.map((value, index) => {
                      return (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <label htmlFor="asses2">
                    {asses.asses2 == 0 ? (
                      <span className="text-red-500 font-bold"> * </span>
                    ) : (
                      <span></span>
                    )}{" "}
                    2. การดำเนินงานตามแผนงาน/ปฏิทิน
                  </label>
                  <select
                    className="ml-5 bg-gray-100"
                    id="asses2"
                    value={asses.asses2}
                    onChange={(e) =>
                      setAsses((prev) => {
                        return { ...prev, [e.target.id]: e.target.value };
                      })
                    }
                  >
                    <option hidden>ความคิดเห็นผู้ประเมิน</option>
                    {values.map((value, index) => {
                      return (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <label htmlFor="asses3">
                    {asses.asses3 == 0 ? (
                      <span className="text-red-500 font-bold"> * </span>
                    ) : (
                      <span></span>
                    )}{" "}
                    3. การแบ่งงานและการทำงานเป็นทีม (กรณีมีนิสิตมากกว่า 1 คน)
                  </label>
                  <select
                    className="ml-5 bg-gray-100"
                    id="asses3"
                    value={asses.asses3}
                    onChange={(e) =>
                      setAsses((prev) => {
                        return { ...prev, [e.target.id]: e.target.value };
                      })
                    }
                  >
                    <option hidden>ความคิดเห็นผู้ประเมิน</option>
                    {values.map((value, index) => {
                      return (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <label htmlFor="asses4">
                    {asses.asses4 == 0 ? (
                      <span className="text-red-500 font-bold"> * </span>
                    ) : (
                      <span></span>
                    )}{" "}
                    4. ผลผลิต/ผลลัพธ์ของโครงงาน
                  </label>
                  <select
                    className="ml-5 bg-gray-100"
                    id="asses4"
                    value={asses.asses4}
                    onChange={(e) =>
                      setAsses((prev) => {
                        return { ...prev, [e.target.id]: e.target.value };
                      })
                    }
                  >
                    <option hidden>ความคิดเห็นผู้ประเมิน</option>
                    {values.map((value, index) => {
                      return (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div
                  className=" flex justify-between "
                  style={{ width: "85%" }}
                >
                  <label htmlFor="asses5">
                    {asses.asses5 == 0 ? (
                      <span className="text-red-500 font-bold"> * </span>
                    ) : (
                      <span></span>
                    )}{" "}
                    5. ความสมบูรณ์ของรายงาน
                  </label>
                  <select
                    className="ml-5 bg-gray-100"
                    id="asses5"
                    value={asses.asses5}
                    onChange={(e) =>
                      setAsses((prev) => {
                        return { ...prev, [e.target.id]: e.target.value };
                      })
                    }
                  >
                    <option hidden>ความคิดเห็นผู้ประเมิน</option>
                    {values.map((value, index) => {
                      return (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ) : null}
            <br />

            <p className="font-bold">ผลการประเมินนิสิตที่ทำโครงงาน</p>

            <p className="text-red-600 my-5">
              ** ให้คะแนนเป็นเกรด A = ดีเยี่ยม, B = ดี, C = พอใช้ , D =
              ต้องปรับปรุง, F = ไม่ผ่าน, U = ไม่สามารถประเมินได้
            </p>

            <div className={styles.table_notification}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <div>หัวข้อการประเมิน</div>
                      <div className="border-t-2 border-black">
                        รายชื่อนิสิต
                      </div>
                    </th>
                    <th>ความรู้ความเข้าใจเกี่ยวกับโครงงาน</th>
                    <th>ความรับผิดชอบและการมีส่วนร่วม</th>
                    <th>ความตรงต่อเวลา</th>
                    <th>การปฏิบัติตามจรรยาบรรณของนักวิจัย</th>
                  </tr>
                </thead>
                <tbody>
                  {assesStudent.map((member, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {member.student1 === "" ||
                          member.student2 === "" ||
                          member.student3 === "" ||
                          member.student4 === "" ? (
                            <span className="text-red-500 font-bold">*</span>
                          ) : (
                            <span></span>
                          )}{" "}
                          {member.id} {member.name}
                          
                        </td>
                        <td>
                          {" "}
                          <select
                            className=" bg-gray-100 w-full "
                            id="student1"
                            value={member.student1}
                            onChange={(e) => {
                              updateFieldChanged(e, index, e.target.id);
                            }}
                          >
                            <option hidden>ความคิดเห็นผู้ประเมิน</option>
                            {values_student.map((value, index) => {
                              return (
                                <option key={index} value={value}>
                                  {value}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td>
                          {" "}
                          <select
                            className="bg-gray-100 w-full "
                            id="student2"
                            value={member.student2}
                            onChange={(e) => {
                              updateFieldChanged(e, index, e.target.id);
                            }}
                          >
                            <option hidden>ความคิดเห็นผู้ประเมิน</option>
                            {values_student.map((value, index) => {
                              return <option key={index}>{value}</option>;
                            })}
                          </select>
                        </td>
                        <td>
                          {" "}
                          <select
                            className=" bg-gray-100 w-full"
                            id="student3"
                            value={member.student3}
                            onChange={(e) => {
                              updateFieldChanged(e, index, e.target.id);
                            }}
                          >
                            <option hidden>ความคิดเห็นผู้ประเมิน</option>
                            {values_student.map((value, index) => {
                              return <option key={index}>{value}</option>;
                            })}
                          </select>
                        </td>
                        <td>
                          {" "}
                          <select
                            className=" bg-gray-100 w-full "
                            id="student4"
                            value={member.student4}
                            onChange={(e) => {
                              updateFieldChanged(e, index, e.target.id);
                            }}
                          >
                            {<option hidden>ความคิดเห็นผู้ประเมิน</option>}
                            {values_student.map((value, index) => {
                              return <option key={index}>{value}</option>;
                            })}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <br />
            <p className="font-bold">{feedback.length==0 && assesStatus==2 ? <span className="text-red-500">* </span>:null}ข้อเสนอแนะ</p>
            <div className="flex justify-center mt-2">
              <textarea
                //id="edit"
                className="bg-gray-100 p-2"
                placeholder="เพิ่มข้อเสนอแนะ"
                rows="4"
                cols="200"
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              ></textarea>
            </div>
            <p className="font-bold">
              {assesStatus == 0 ? (
                <span className="text-red-500 font-bold"> * </span>
              ) : (
                <span></span>
              )}{" "}
              สรุป
            </p>
            <div className="ml-5">
              {summarize.map((sum, index) => {
                return (
                  <div key={index}>
                    <input
                      id={sum.value}
                      type="radio"
                      name="summarize"
                      value={sum.value}
                      onChange={(e) => {
                        setAssesStatus(e.target.value);
                      }}
                      checked={assesStatus == sum.value}
                    />
                    <b className="mx-2 font-normal">{sum.label}</b>
                    {/* <label htmlFor={sum.value}>{sum.label}</label> */}
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose()}} variant="contained" color="secondary">
            ปิด
          </Button>
          <Button
            onClick={() => {
              console.log(asses,feedback,assesStudent,assesStatus);
              //finalSendAsses();
              setAlert(true)
            }}
            variant="contained"
            color="primary"
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={alert}
        //onClose={handleClose}
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl">{"ยืนยันการประเมินความก้าวหน้าของโครงงาน ?"}</p>{" "}
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
              finalSendAsses(`${teacherName} ได้ประเมินความก้าวหน้าของโครงงาน ${asses.project_name_eng} สรุป ${asses_status_map[assesStatus]}`)
            }}
            className=" h-10 rounded-lg bg-gray-400   uppercase font-semibold hover:bg-gray-600 text-white transition px-4 "
          >
            ยืนยัน
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

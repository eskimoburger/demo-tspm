import React, { useState, useEffect } from "react";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from "axios";
import { useRouter } from "next/router";
export const NewAsses = (props) => {
  
  const router = useRouter();
  const [teacher, setTeacher] = useState({
    name: "",
    id_teacher: 0,
    role: "",
  });
  useEffect(()=>{
    getTeacher();
  },[])

  function getTeacher() {
    var teacher = [];
    for (let i = 0; i < props.project.committees.length; i++) {
      if (props.project.committees[i].role == "อาจารย์ที่ปรึกษา") {
        //console.log(props.project.committees[i]);
        teacher.push({
          name: props.project.committees[i].teacher_name,
          id_teacher: props.project.committees[i].id_teacher,
          role: props.project.committees[i].role,
        });
      }
    }
    //console.log(teacher)
    setTeacher(teacher[0]);
  }
  

  function NextStage(){
      axios.put(`https://demo-tspm-server.herokuapp.com/project/update/${props.project.id}`).then((res)=>{
          console.log(res.data)
          if(res.data){
              router.reload()
          }

      })

  }

  return (
    <div>
      <div className="bg-red-700 w-full text-2xl text-white p-2 rounded-t-md">
        ขอรับการประเมินความก้าวหน้า 
      </div>
      <div className="p-4 text-xl  space-y-2">
      <p><span className="font-bold">รหัสโครงงงาน : </span> CPE{props.project.id.toString().padStart(2,0)}</p>
      <p><span className="font-bold">ชื่อโครงงงาน : </span>{props.project.name}</p>
      <p><span className="font-bold">ชื่อโครงงาน(ภาษาอังกฤษ) : </span>{props.project.name_eng}</p>
      <p><span className="font-bold">อาจารย์ที่ปรึกษา : </span>{teacher.name}</p>
      <p className="font-bold">สมาชิกในกลุ่ม</p>
      {props.project.members.map((member,index)=>{
          return <p  className="ml-2" key={index}>{index+1}. {member.name}</p> 
      })}
      </div>
      <div className="flex justify-center"><button onClick={NextStage} className="bg-blue-600 p-2 text-white  rounded-lg hover:bg-blue-900 "  style={{boxShadow:" rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"}}><ArrowForwardIcon/> ส่งคำขอรับการประเมิน</button></div>
      <br />
      
    </div>
  );
};

import React,{useEffect,useState} from 'react'

export default function teacherIndex(props) {
    const [teacherName,setTeacherName] = useState("")
    useEffect(() => {
        if (props.teacher) {
            setTeacherName(props.teacher.name)
          //setTeacher(props.teacher.id);
         // getProjectFromTeacher();
          //getProjectByTeacher();
        }
      }, [props.teacher]);
    return (

        <div
        className=" px-4  pt-4 pb-6 text-xl  bg-white rounded-2xl  "
        style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 1.95px 1.95px" }}
       >

        <div  className="text-3xl text-center my-8">
            Welcome, {teacherName}
        </div>

        <div className="flex gap-4 flex-wrap justify-center mx-auto   " style={{width:"90%"}}>
        <div className="bg-blue-800  rounded-xl p-4 flex flex-col justify-between" style={{boxShadow:" rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",width:"250px"}}>
            <p className="text-2xl text-right text-white ">จำนวนโครงงานทั้งหมด</p>
            <i style={{fontSize:"50px"}} className='bx bxs-graduation text-right text-white' ></i>
            <p className="text-2xl my-4 text-white text-right"> 20<span className="text-2xl">โครงงาน</span> </p>
        </div>

        <div className="bg-blue-800  rounded-xl p-4 flex flex-col justify-between" style={{boxShadow:" rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",width:"250px"}}>
            <p className="text-2xl text-right text-white ">โครงงานที่กำลังดำเนินการ</p>
            <i style={{fontSize:"50px"}} className='bx bxs-graduation text-right text-white' ></i>
            <p className="text-2xl my-4 text-white text-right"> 20<span className="text-2xl">โครงงาน</span> </p>
        </div>
        <div className="bg-blue-800  rounded-xl p-4 flex flex-col justify-between" style={{boxShadow:" rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",width:"250px"}}>
            
            <p className="text-2xl text-right text-white ">โครงงานที่ทำสำเร็จ</p>
            <br />
            <i style={{fontSize:"50px"}} className='bx bxs-graduation text-right text-white' ></i>
            <p className="text-2xl my-4 text-white text-right"> 20<span className="text-2xl">โครงงาน</span> </p>
        </div>

        </div>

      </div>)
        
}

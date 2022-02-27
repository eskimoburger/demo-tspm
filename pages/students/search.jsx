import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import { InputAdornment } from "@material-ui/core";
import StudentLayout from "../../components/students/studentLayout";
import SearchIcon from "@material-ui/icons/Search";
import Image from "next/image";
export default function Search() {
  const [search, setSearch] = useState("");
  const projectList = [
    {
      name: "โปรเจค1",
      name_en: "Project1",
      year: "2560",
      description: "detail of project1",
    },
    {
      name: "โปรเจค2",
      name_en: "Project2",
      year: "2560",
      description: "detail of project2",
    },
    {
      name: "โปรเจค3",
      name_en: "Project3",
      year: "2560",
      description: "detail of project3",
    },
    {
      name: "โปรเจค4",
      name_en: "Project4",
      year: "2560",
      description: "detail of project4",
    },
    {
      name: "โปรเจค5",
      name_en: "Project5",
      year: "2560",
      description: "detail of project5 ",
    },
    {
      name: "โปรเจค6",
      name_en: "Project6",
      year: "2562",
      description: "detail of project6",
    },
    {
      name: "โปรเจค7",
      name_en: "Project7",
      year: "2563",
      description: "detail of project7",
    },
    {
      name: "โปรเจค8",
      name_en: "Project8",
      year: "2560",
      description: "detail of project8",
    },
    {
      name: "โปรเจค9",
      name_en: "Project9",
      year: "2560",
      description: "detail of project9",
    },
  ];
  const [projects, setProjects] = useState([
    {
      name: "โปรเจค1",
      name_en: "Project1",
      year: "2560",
      description: "detail of project1",
    },
    {
      name: "โปรเจค2",
      name_en: "Project2",
      year: "2560",
      description: "detail of project2",
    },
    {
      name: "โปรเจค3",
      name_en: "Project3",
      year: "2560",
      description: "detail of project3",
    },
    {
      name: "โปรเจค4",
      name_en: "Project4",
      year: "2560",
      description: "detail of project4",
    },
    {
      name: "โปรเจค5",
      name_en: "Project5",
      year: "2560",
      description: "detail of project5 ",
    },
    {
      name: "โปรเจค6",
      name_en: "Project6",
      year: "2562",
      description: "detail of project6",
    },
    {
      name: "โปรเจค7",
      name_en: "Project7",
      year: "2563",
      description: "detail of project7",
    },
    {
      name: "โปรเจค8",
      name_en: "Project8",
      year: "2560",
      description: "detail of project8",
    },
    {
      name: "โปรเจค9",
      name_en: "Project9",
      year: "2560",
      description: "detail of project9",
    },
  ]);

  const [output, setOutput] = useState(projects);
  const handleChange = (value) => {
    setSearch(value);
    filterData(value);
  };

  const filterData = (value) => {
    const lowerCasedValue = value;
    if (lowerCasedValue.toLowerCase().trim() === "") setOutput(projects);
    else {
      const filteredData = projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(lowerCasedValue.toLowerCase()) ||
          project.name_en
            .toLowerCase()
            .includes(lowerCasedValue.toLowerCase()) ||
          project.year.toString().includes(lowerCasedValue.toString())
        );
      });
      setOutput(filteredData);
    }
  };

  return (
    <>
      <div
        className=" bg-white  rounded-md p-5 mt-5 mx-auto"
        style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
      >
        <div className="flex   justify-center">
          <Input
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            style={{
              padding: "10px",
              backgroundColor: "white",
              width: "300px",
              marginBottom: "10px",
              boxShadow: "#00000038 1.95px 1.95px 1.95px",
            }}
            placeholder="ค้นหาโครงงาน....."
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          ></Input>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {output.map((project, index) => {
            // console.log(projects.length)

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl flex justify-center items-center gap-4 flex-wrap   py-6"
                style={{
                  width: "700px",

                  boxShadow: "#00000038 1.95px 1.95px 1.95px",
                }}
              >
                <div
                  className="bg-red-300 rounded-full flex items-center justify-center "
                  style={{ width: "90px", height: "90px" }}
                >
                  <Image
                    layout="fixed"
                    src={"/file.png"}
                    alt=""
                    width={80}
                    height={80}
                  />
                </div>

                <div className="text-lg font-bold">
                  <p>
                    ชื่อโครงงาน :
                    <span className="font-extralight"> {project.name}</span>
                  </p>
                  <p>
                    ชื่อโครงงาน (ภาษาอังกฤษ) :
                    <span className="font-extralight"> {project.name_en}</span>
                  </p>
                  <p>
                    รายละเอียดโครงงาน :
                    <span className="font-extralight">
                      {" "}
                      {project.description}
                    </span>
                  </p>
                  <p>
                    {" "}
                    ปีการศึกษา :
                    <span className="font-extralight"> {project.year}</span>
                  </p>
                </div>

                <a
                  className=" block m-2  cursor-pointer bg-blue-500 p-2 rounded-md text-white  hover:bg-blue-600"
                  style={{ width: "140px" }}
                  //href={doc.show}
                >
                  <i className="bx bxs-download"></i> Download File
                </a>
              </div>

              // <div
              //   key={index}
              //   className=" border-b-2 border-gray-400 my-2 w-full "
              // >
              //   <div className="flex flex-1">
              //     <div
              //       style={{
              //         width: "100px",
              //         height: "100px",
              //         borderStyle: "solid",
              //         borderWidth: "2px",
              //         padding: "10px",
              //       }}
              //     >
              //       <img src={"/file.png"} alt="" className="w-full h-full" />
              //     </div>
              //     <div className=" w-full flex-1  ml-2   ">
              //       <div className="text-xl">
              //         <p>
              //           ชื่อโครงงาน :
              //           <span className="font-extralight"> {project.name}</span>
              //         </p>
              //         <p>
              //           ชื่อโครงงาน (ภาษาอังกฤษ) :
              //           <span className="font-extralight">
              //             {" "}
              //             {project.name_en}
              //           </span>
              //         </p>
              //         <p>
              //           รายละเอียดโครงงาน :
              //           <span className="font-extralight">
              //             {" "}
              //             {project.description}
              //           </span>
              //         </p>
              //         <p>
              //           {" "}
              //           ปีการศึกษา :
              //           <span className="font-extralight"> {project.year}</span>
              //         </p>
              //       </div>

              //       <a
              //         className=" block m-2  cursor-pointer bg-blue-500 p-2 rounded-md text-white  hover:bg-blue-600"
              //         style={{ width: "140px" }}
              //         //href={doc.show}
              //       >
              //         <i className="bx bxs-download"></i> Download File
              //       </a>
              //     </div>
              //   </div>
              // </div>
            );
          })}
        </div>

        {output.length === 0 && (
          <div>
               <p className="text-center text-2xl font-bold">ไม่พบข้อมูลโครงงาน...</p>
          </div>
         
        )}
      </div>
    </>
  );
}

{
  /* <a
className=" block m-2  bg-blue-500 p-2 rounded-md text-white  hover:bg-blue-600"
style={{ width: "120px" }}
//href={doc.show}
>
Download File
</a> */
}

{
  /* <div className="my-4">
                      <a className=" text-center block cursor-pointer bg-green-500 p-2 rounded-md text-white  hover:bg-green-600" style={{width:"50%"}}>
                        Download File
                      </a>
                    </div> */
}

Search.getLayout = function getLayout(page){
  return (<StudentLayout title={"ค้นหา"}>{page}</StudentLayout>)
}

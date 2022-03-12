import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import { InputAdornment } from "@material-ui/core";

export default function search() {
  React.useEffect(() => {
    axios.get("http://localhost:3001/files/document").then((response) => {
      console.log(response.data);
      SetDocuments(response.data);
    });
  }, []);


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

  const [documents, SetDocuments] = React.useState([]);
  const [search, setSearch] = useState("");

  return (
    <div>
      <p
        style={{
          fontSize: "36px",
          marginBottom: "5px",
          padding: "5px 0px",
        }}
      >
        ค้นหาโครงงาน
      </p>

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
        }}
        placeholder="ค้นหาโครงงาน....."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></Input>

      {projects
        .filter((project) => {
          if (search === "") {
            return project;
          } else if (
            project.name.toLowerCase().includes(search.toLowerCase()) ||
            project.name_en.toLowerCase().includes(search.toLowerCase()) ||
            project.year.toString().includes(search.toString())
          ) {
            return project;
          }
        })
        .map((project, index) => {
          return (
            <div
              key={index}
              className=" p-2 border-b-2 border-gray-500 my-2 mx-2"
            >
              <div className="flex my-2 space-x-5">
                <div>
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "10px",
                    }}
                  >
                    <img src={"/docs.svg"} alt="" />
                  </div>
                </div>

                <div className="text-2xl">
                  <p>
                    {" "}
                    <span className="font-bold">ชื่อโครงงาน :</span>{" "}
                    {project.name}
                  </p>
                  <p>
                    <span className="font-bold">
                      ชื่อโครงงาน (ภาษาอังกฤษ) :{" "}
                    </span>{" "}
                    {project.name_en}
                  </p>
                  <p>
                    <span className="font-bold">รายละเอียดโครงงาน : </span>
                    {project.description}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold"> ปีการศึกษา : </span>{" "}
                    {project.year}
                  </p>
                  <div className="my-4">
                    <a className=" bg-green-500 p-2 rounded-md text-white  hover:bg-green-600">
                      Download File
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

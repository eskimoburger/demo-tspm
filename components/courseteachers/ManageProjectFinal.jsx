import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ModalDetail from "./ModalDetail";
import { useState } from "react";
import axios from "axios";
import ModalEdit from "./ModalEdit";
import ModalLogbooks from "./ModalLogbooks";

const STATE_MAP = {
  1: "เสนอหัวข้อโครงงาน",
  2: "ขอสอบหัวข้อโครงงาน",
  3: "ขอสอบหัวข้อโครงงาน",
  4: "บันทึกผลการสอบหัวข้อโครงงาน",
  5: "บันทึกผลการสอบหัวข้อโครงงาน",
  6: "ประเมินความคืบหน้าโครงงาน",
  7: "ประเมินความคืบหน้าโครงงาน",
  8: "ขอสอบโครงงาน",
  9: "ขอสอบโครงงาน",
  10: "บันทึกผลการสอบโครงงาน",
  11: "บันทึกผลการสอบโครงงาน",
  12: "ประเมินรูปเล่มปริญญานิพนธ์",
  13: "ประเมินรูปเล่มปริญญานิพนธ์",
  14: "ผ่านการประเมินรูปเล่มปริญญานิพนธ์",
};
const ManageProjectFinal = ({ allP, refreshData }) => {
  const [projectData, setProjectData] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [openLogbook, setOpenLogbook] = useState(false);
  const [logbookData,setLogbookData] = useState([]);

  const [idProject, setIdProject] = useState(0);
  const [projectEdit, setProjectEdit] = useState(null);
  const [editSList, setEditSList] = useState([]);
  const [editTList, setEditTList] = useState([]);
  const [check, setCheck] = useState(false);
  


  const finalGetProjectByID = async (id) => {
    await axios
      .get("http://localhost:3001/final-course/get-project/" + id)
      .then((res) => {
        setProjectData(res.data.results);
        setCheck(res.data.results.status);
        setOpenDetail(true);
      });
  };

  const finalGetEditProjectByID = async (id) => {
    setEditDetail(true);
    setIdProject(id);
    await axios
      .get("http://localhost:3001/final-course/get-project/" + id)
      .then((res) => {
        console.log(res.data);

        setProjectEdit(res.data.results.project);
        setEditSList(res.data.results.members);
        setEditTList(res.data.results.committees);
      });
  };
  const finalGetLogbookProjectByID = async (id) => {
    //setEditDetail(true);
    //setIdProject(id);
    setOpenLogbook(true)
    await axios
      .get("http://localhost:3001/final-course/get-logbook/" + id)
      .then((res) => {
        console.log(res.data);
        setLogbookData(res?.data)

      });
  };

  return (
    <>
      {/* {JSON.stringify(allP)} */}

      <h1 className="text-center text-3xl font-bold">รายชื่อโครงงานทั้งหมด</h1>

      <div>
        {" "}
        {allP.length == 0 ? (



          <p className="text-center text-2xl mt-4">ยังไม่มีข้อมูล...</p>
        ) : (
          <table
            className="table-auto mx-auto overflow-hidden border-collapse pb-4 rounded-md bg-[#e6e6e6] mt-4 w-full  "
            style={{ boxShadow: "1px 1px 16px #00000033 " }}
          >
            <thead>
              <tr className="bg-[#36304A] ">
                <th
                  style={{ width: "10%" }}
                  className="text-xl px-0 py-2 text-white font-medium"
                >
                  ID
                </th>
                <th
                  style={{ width: "40%" }}
                  className="text-xl px-0 py-2 text-white font-medium"
                >
                  ชื่อโครงงาน
                </th>
                <th
                  style={{ width: "30%" }}
                  className="text-xl px-0 py-2 text-white font-medium"
                >
                  สถานะ
                </th>
                <th
                  style={{ width: "20%" }}
                  className="text-xl px-0 py-2 text-white font-medium"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allP.map((p, index) => {
                return (
                  <tr key={index} className={index % 2 == 0 ? "bg-white" : ""}>
                    <td className={"text-lg text-center px-0 py-2"}>
                      {p.project_id === 0 ? (
                        <p className="text-red-500">*ยังไม่มีรหัส </p>
                      ) : (
                        <p> CPE{p.project_id.toString().padStart(2, 0)}</p>
                      )}
                    </td>
                    <td className={"text-lg text-center px-0 py-2"}>
                      {p.project_name_th}
                    </td>
                    <td className={"text-lg text-center px-0 py-2"}>
                      <span
                        style={{ fontSize: "0.95rem" }}
                        className="px-2 py-1  font-medium  bg-green-100 text-green-800 rounded-lg"
                      >
                        {STATE_MAP[p.state]}
                      </span>
                    </td>
                    <td className={"text-lg text-center flex px-0 py-2"}>
                      <Tooltip
                        title={
                          <p style={{ fontSize: 14, padding: 3 }}>
                            ดูรายละเอียด
                          </p>
                        }
                        arrow
                      >
                        <div
                          onClick={() => finalGetProjectByID(p.id)}
                          className="text-yellow-500 cursor-pointer hover:text-yellow-400 it  "
                          style={{ width: "50%" }}
                        >
                          <VisibilityIcon />
                        </div>
                      </Tooltip>
                      &emsp;
                      <Tooltip
                        title={
                          <p style={{ fontSize: 14, padding: 3 }}>
                            แก้ไขโครงงาน
                          </p>
                        }
                        arrow
                      >
                        <div
                          onClick={() => finalGetEditProjectByID(p.id)}
                          className="text-gray-800 cursor-pointer hover:text-gray-700"
                          style={{ width: "50%" }}
                        >
                          <EditIcon />
                        </div>
                      </Tooltip>
                      &emsp;
                      <Tooltip
                        title={
                          <p style={{ fontSize: 14, padding: 3 }}>Logbooks</p>
                        }
                        arrow
                      >
                        <div
                          onClick={() => finalGetLogbookProjectByID(p.id)}
                          className="text-gray-800 cursor-pointer hover:text-gray-700"
                          style={{ width: "50%" }}
                        >
                          <LibraryBooksIcon />
                        </div>
                      </Tooltip>
                      &emsp;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <ModalDetail
        openDetail={openDetail}
        check={check}
        projectData={projectData}
        onClose={() => setOpenDetail(false)}
        refreshData={refreshData}
        getIdFunction={finalGetProjectByID}
      />

      <ModalEdit
        editDetail={editDetail}
        idProject={idProject}
        onClose={() => {
          setEditDetail(false), setProjectEdit(null);
        }}
        editSListP={editSList}
        editTListP={editTList}
        projectEditP={projectEdit}
      />
      <ModalLogbooks
        openLogbook={openLogbook}
        onClose={()=>setOpenLogbook(false)}
        logbookData= {logbookData}
      
      />
    </>
  );
};
export default ManageProjectFinal;

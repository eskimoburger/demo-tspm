import React, { useState } from "react";
import CourseLayout from "../../components/courseteachers/LayoutCourse";
import Input from "@material-ui/core/Input";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import axios from "axios";
const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [historyData, setHistoryData] = useState(null);
  const handleChange = (value) => {
    setSearch(value);
    setHistoryData(null)
  };

  const getHistory = async () => {
    await axios
      .get("http://localhost:3001/final-course/get-history/" + parseInt(search))
      .then((res) => {
        console.log(res.data);
        setHistoryData(res.data);
      })
      .catch((err) => {
        console.log(err.message);

        alert("ไม่พบประวัติการทำโครงงาน");
      });
  };

  return (
    <>
    <h1 className="text-center text-3xl font-bold mb-4">ประวัติการทำโครงงานของนิสิต</h1>
      <div className="flex justify-center gap-2 ">
        {" "}
        <Input
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          style={{
            padding: "5px",
            backgroundColor: "white",
            width: "300px",
            boxShadow: "#00000038 1.95px 1.95px 1.95px",
          }}
          placeholder="กรุณากรอกรหัสนิสิต"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        ></Input>
        {search.length > 0 && (
          <div>
            <Button
              startIcon={<SearchIcon />}
              variant="contained"
              color="primary"
              size="small"
              style={{ height: "100%", fontSize: 18 }}
              onClick={getHistory}
            >
              ค้นหา
            </Button>
          </div>
        )}
      </div>
      {historyData && (
        <>
        <div className="text-xl space-y-1 bg-white rounded-xl py-2 px-4 mt-4 ">
          <h2 className="text-2xl">ข้อมูลส่วนตัว</h2>
          รหัสนิสิต : {historyData.user.id_member}
         <p>ชื่อ : {historyData.user.name  }</p> 
         
        </div>
        <div className="text-2xl  py-2 px-4">
        <h2 >ประวัติการทำโครงงานเรียงตาม ( ใหม่ - เก่า )</h2>
        </div>
       
        <div className="gap-2  flex flex-col items-center flex-wrap">
          {historyData.projectData.map((p, i) => {
            return (
              <div
                key={i}
                className="py-2 px-4 bg-white rounded-xl text-xl  space-y-1 w-full"
              >
                <h3 className="text-2xl">ข้อมูลโครงงาน</h3>
                <p>
                  <span className="font-bold">รหัสโครงงาน : </span>
                  {p.project_name_th}{" "}
                </p>
                <p>
                  <span className="font-bold">ชื่อโครงงานภาษาไทย : </span>
                  {p.project_name_th}{" "}
                </p>
                <p>
                  <span className="font-bold">ชื่อโครงงานภาษาอังกฤษ : </span>
                  {p.project_name_eng}{" "}
                </p>
                <h3 className="font-bold">สมาชิกในกลุ่ม</h3>
                {historyData.members.map((m, im) => {
                  if (p.id === m.id_project) {
                    return (
                      <div className="ml-2" key={im}>
                        {m.id_member}{" "}
                        {m.name}
                      </div>
                    );
                  }
                })}
                 <h3 className="font-bold">อาจารย์ประจำโครงาน</h3>
                {historyData.committees.map((c, ic) => {
                  if (p.id === c.id_project) {
                    return (
                      <div className="ml-2" key={ic}>
                        {c.name}
                        {c.role}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
          {historyData.id_member}
        </div>
        </>
      )}
    </>
  );
};
HistoryPage.getLayout = function getLayout(page) {
  return <CourseLayout title={"Course | History"}>{page}</CourseLayout>;
};

export default HistoryPage;

import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function logbook({ logbook, projectId }) {
  const getLogBook = async (logbookNumber) => {
    const logbookResponse = await axios.get(
      `http://localhost:3001/final-project/get-logbook/${projectId}/${logbookNumber}`
    );
    const logbookData = logbookResponse.data.results;
    setLogbookDetail(logbookData);
    setOpenLogbook(true);
  };

  const [openLogbook, setOpenLogbook] = useState(false);
  const [logbookDetail, setLogbookDetail] = useState(null);
  const logbooks = new Array(12).fill(0);
  const logbookProgress = () => {
    return logbooks.map((logbookIndex, index) => {
      return (
        <div
          key={index}
          className={
            logbook >= index + 1
              ? "cursor-pointer hover:bg-rose-400 bg-rose-600"
              : "bg-gray-300 "
          }
          onClick={
            logbook >= index + 1
              ? () => {
                  console.log(index + 1);
                  getLogBook(index + 1);
                }
              : null
          }
          style={{
            width: "50px",
            height: "23px",
            borderRadius: "4px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        ></div>
      );
    });
  };
  return (
    <>
      <div className="my-2 flex gap-2 flex-wrap justify-center  mx-2  ">
        {logbookProgress()}
      </div>

      <Dialog
        open={openLogbook}
        onClose={() => setOpenLogbook(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          {logbookDetail && (
            <p className="text-3xl font-bold">
              บันทึกก้าวหน้าครั้งที่ {logbookDetail.number}
            </p>
          )}
        </DialogTitle>
        <DialogContent dividers>
          <div>
            {logbookDetail && (
              <div className="text-xl space-y-2">
                {/* {JSON.stringify(logbookDetail)} */}
                <h3 className="font-bold text-2xl">วันที่</h3>
                <div className=" bg-slate-100">{logbookDetail.date}</div>
                <h3 className="font-bold text-2xl">
                  สรุปความคืบหน้าของงานที่ได้รับมอบหมาย
                </h3>
                <div className=" bg-slate-100">{logbookDetail.summary}</div>
                <h3 className="font-bold text-2xl">
                  ปัญหาที่พบหรือหัวข้อที่เข้ารับคำปรึกษา
                </h3>
                <div className=" bg-slate-100">{logbookDetail.problem}</div>
                <h3 className="font-bold text-2xl">
                  แนวทางการแก้ปัญหา หรือ งานที่ได้รับมอบหมาย
                </h3>
                <div className=" bg-slate-100">{logbookDetail.solution}</div>
                <h3 className="font-bold text-2xl">กำหนดการนัดหมายครั้งต่อไป</h3>
                <div className=" bg-slate-100">{logbookDetail.next_date}</div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

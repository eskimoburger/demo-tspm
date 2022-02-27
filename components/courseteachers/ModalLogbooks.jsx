import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import axios from "axios";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalLogbooks = ({ openLogbook, onClose, logbookData }) => {
  const [logbookDetail, setLogbookDetail] = useState(null);

  return (
    <>
      <Dialog open={openLogbook} onClose={()=>{onClose(),setLogbookDetail(null)}} fullWidth maxWidth={"lg"}>
        <DialogTitle>
          <p className="text-2xl"> Logbook</p>{" "}
        </DialogTitle>
        <DialogContent>
          <div className="flex gap-3 flex-wrap ">
            {logbookData.length === 0 ? (
              <div>No LogbookData</div>
            ) : (
              logbookData.map((lb, i) => {
                return (
                  <div key={i}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setLogbookDetail(lb)}
                    >
                      ครั้งที่ {lb.number}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
          <br />
          {logbookDetail && (
            <div className="text-xl space-y-2">
              <p>
                วันที่ <span>{logbookDetail.date}</span>{" "}
              </p>
              <p>สรุปความคืบหน้าของงานที่ได้รับมอบหมาย</p>
              <div className="bg-gray-100 indent-2   break-words">
                {logbookDetail.summary}
              </div>
              <p> ปัญหาที่พบหรือหัวข้อที่เข้ารับคำปรึกษา </p>
              <div className="bg-gray-100 indent-2   break-words">
                {logbookDetail.problem}
              </div>
              <p>แนวทางการแก้ปัญหา หรือ งานที่ได้รับมอบหมาย</p>
              <div className="bg-gray-100 indent-2   break-words">
                {logbookDetail.solution}
              </div>

              <p>
                กำหนดการนัดหมายครั้งต่อไป{" "}
                <span> {logbookDetail.next_date}</span>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalLogbooks;

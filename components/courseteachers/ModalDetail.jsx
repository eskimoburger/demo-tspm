import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
//import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalDetail = ({
  openDetail,
  projectData,
  check,
  onClose,
  refreshData,
  getIdFunction,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [idProject, setIdProject] = useState(0);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setIdProject(0);
    setOpenEdit(false);
  };

  const handleSubmit = async (e, id, newProjectId) => {
    e.preventDefault();
    await axios
      .put(`https://demo-tspm-server.herokuapp.com/final-course/update-project/${id}`, {
        projectId: newProjectId,
      })
      .then((_) => {
        setOpenEdit(false);
        refreshData();
        getIdFunction(id);
        setIdProject(0);
      });
  };
  const handleChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length < 2) {
      setIdProject(onlyNums);
    } else if (onlyNums.length === 2) {
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      setIdProject(number);
    }
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openDetail}
        onClose={onClose}
      >
        <DialogTitle>
          <p className="text-2xl">รายละเอียดโครงงาน</p>
        </DialogTitle>
        <DialogContent dividers>
          {projectData && (
            <div className="text-lg stage2:text-xl space-y-1">
              <p>
                <span className="font-bold"> รหัสโครงงาน : </span>
                CPE{projectData.project.project_id.toString().padStart(2, 0)}
              </p>
              <p>
                <span className="font-bold">ชื่อโครงงานภาษาไทย :</span>{" "}
                {projectData.project.project_name_th}
              </p>
              <p>
                <span className="font-bold"> ชื่อโครงงานภาษาอังกฤษ :</span>{" "}
                {projectData.project.project_name_eng}
              </p>
              <p className="font-bold">สมาชิกในกลุ่ม</p>
              {projectData.members.map((mem, index) => {
                return (
                  <div key={index}>
                    <p className="ml-4 ">
                      รหัสนิสิต {mem.id} <span>ชื่อ {mem.name}</span>
                    </p>
                  </div>
                );
              })}
              <p className="font-bold">รายชื่ออาจารย์</p>
              {projectData.committees.map((teacher, index) => {
                return (
                  <div key={index}>
                    <p className="ml-5">
                      ชื่อ {teacher.committee_name}{" "}
                      <span className="font-bold">{teacher.role}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="secondary">
            ปิด
          </Button>
          {check && (
            <Button
              onClick={handleClickOpenEdit}
              variant="contained"
              color="primary"
            >
              แก้ไขรหัสโครงงาน
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        fullWidth
        maxWidth={"xs"}
        //keepMounted
      >
        <DialogTitle>
          {" "}
          <p className="text-2xl"> แก้ไขรหัสโครงงาน</p>{" "}
        </DialogTitle>
        <DialogContent dividers>
          {projectData && (
            <form
              id="update-id"
              onSubmit={(e) => {
                handleSubmit(e, projectData.project.id, idProject);
              }}
            >
              <TextField
                //style={{fontSize:22}}
                inputProps={{ style: { fontSize: 22 } }}
                fullWidth
                placeholder="กรุณากรอกรหัสโครงงาน"
                value={idProject === 0 ? "" : idProject}
                onChange={handleChange}
                required
                helperText={<span className="text-2xl">กรุณากรอกหมายเลข 1-99</span> }
                
                //inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
              />

              {/* <input
                value={idProject === 0 ? "" : idProject}
                required
                type="number"
                onChange={(e) => {
                  setIdProject(e.target.value);
                }}
                className=" text-4xl  border-2 p-2"
                min="0"
                placeholder="กรุณากรอกรหัสโครงงาน"
              ></input> */}
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEdit}
            variant="contained"
            color="secondary"
          >
            ยกเลิก
          </Button>
          <Button
            form="update-id"
            type="submit"
            style={{ backgroundColor: "green", color: "white" }}
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalDetail;

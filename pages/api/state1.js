// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const state1 = async (req, res) => {
  if (req.method === "POST") {
    try {
      const axiosRes = await axios.post(
        "http://localhost:3001/final-project/state-1-demo",
        req.body
      );

      return res.send(axiosRes.data);
      //res.send("Data has been received");
    } catch {
      return res.status(422).send("Data cannot be stored!");
    }
    
  }
};

export default state1;


//console.log(req.body)
    // await axios
    // .post("http://localhost:3001/final-project/state-1-demo", {
    //   project_th: project.projectName_TH,
    //   project_eng: project.projectName_ENG,
    //   project_des: project.detail,
    //   selectedStudent: selectedStudent,
    //   selectedTeacher: selectedTeacher,
    // })
    // .then(async (res) => {
    //   //await props.function()

    //   console.log(res.data);
    // })
    //return res.json({ name: "John Doe" });

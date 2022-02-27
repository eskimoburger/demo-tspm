import React, { useState, useEffect } from "react";
import styles from "../../styles/step.module.scss";

export default function steptest({ currentstep,number }) {
  useEffect(() => {
    const steps = currentstep;
    const stepStates = steps.map((step, index) => {
      const stepObj = {};
      stepObj.description = step;
      stepObj.completed = false;
      stepObj.highlighted = index === 0 ? true : false;
      stepObj.selected = index === 0 ? true : false;
      return stepObj;
    });
    const currentSteps  =  updateStep(number-1,stepStates)
    // console.log(currentSteps)
    // console.log(number)
    setStates(currentSteps);
  }, [number]);

  const [steps, setStates] = useState([
    // {
    //     description:"เสนอหัวข้อโครงงาน",
    //     complete:false,
    //     selected:false,
    //     highlighted:false
    // },
    // {
    //     description:"สอบหัวข้อโครงงาน",
    //     complete:false,
    //     selected:false,
    //     highlighted:true
    // },
    // {
    //     description:"ประเมินความคืบหน้า",
    //     complete:false,
    //     selected:false,
    //     highlighted:true
    // },
    // {
    //     description:"สอบโครงงาน",
    //     complete:false,
    //     selected:false,
    //     highlighted:true
    // },
    // {
    //     description:"ส่งรูปเล่มโครงงาน",
    //     complete:false,
    //     selected:false,
    //     highlighted:true
    // },
  ]);


  const stepsDisplay = steps.map((step, index) => {
    return (
      <div className={styles.stepper_wrapper} key={index}>
        <div
          className={
            step.selected
              ? styles.stepper_number_active
              : styles.stepper_number_disabled
          }
         
        >
          {step.completed ? <span>&#10003;</span> : index + 1}
        </div>
        
        <div
          className={step.highlighted ? styles.stepper_description_active : undefined}
          //style={{ display:"flex"}}
        >
          {step.description}
          
        </div>
        <div
          className={index !== steps.length - 1 ? styles.divider_line : undefined}
        ></div>
      </div>
    );
  });

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];

    let stepCounter = 0;
    while (stepCounter < newSteps.length) {
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
            ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false,
         
        };
        stepCounter++;
       
      } else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true,
        };
        stepCounter++;
      } else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        };
        stepCounter++;
      }
     
    }
    return newSteps;
  };

  return (
    <div className={styles.stepper_container}>
      <div className={styles.stepper_wrapper_horizontal}>{stepsDisplay}</div>
   
      {/* <button onClick={()=>console.log(steps)}>test</button> */}
    </div>
  );
}

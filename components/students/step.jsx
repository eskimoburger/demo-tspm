import React,{useState} from 'react'
import styles from "../../styles/css2.module.scss";

export default function step({step}) {

  /*progressbar*/
  var progress_style1 = styles.blank;
  var progress_style2 = styles.blank;
  var progress_style3 = styles.blank;
  var progress_style4 = styles.blank;
  var progress_style5 = styles.blank;
  if (step == 0) {
    progress_style1 = styles.now;
  } else if (step <= 5) {
    progress_style1 = styles.active;
    progress_style2 = styles.now;
  } else if (step <= 7) {
    progress_style1 = styles.active;
    progress_style2 = styles.active;
    progress_style3 = styles.now;
  } else if (step <= 11) {
    progress_style1 = styles.active;
    progress_style2 = styles.active;
    progress_style3 = styles.active;
    progress_style4 = styles.now;
  } else if (step <= 13) {
    progress_style1 = styles.active;
    progress_style2 = styles.active;
    progress_style3 = styles.active;
    progress_style4 = styles.active;
    progress_style5 = styles.now;
  } else if (step == 14) {
    progress_style1 = styles.active;
    progress_style2 = styles.active;
    progress_style3 = styles.active;
    progress_style4 = styles.active;
    progress_style5 = styles.active;
  }
  return (
    <div>
      <div className={styles.progressbar}>
              <li className={progress_style1}>เสนอหัวข้อโครงงาน</li>
              <li className={progress_style2}>สอบหัวข้อโครงงาน</li>
              <li className={progress_style3}>ประเมินความคืบหน้า</li>
              <li className={progress_style4}>สอบโครงงาน</li>
              <li className={progress_style5}>ส่งรูปเล่ม</li>
            </div>
      
    </div>
  )
}

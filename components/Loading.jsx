import React from "react";
import styles from "../styles/loading.module.scss";
export default function Loading() {
  return (
    <div className="flex flex-col items-center">
    <div className={styles.lds_facebook}>
      <div></div>
      <div style={{ backgroundColor: "red" }}></div> <div style={{backgroundColor:"yellow"}}></div>
    </div>
    <p className="text-2xl font-bold">Loading ...</p>
    </div>
  );
}

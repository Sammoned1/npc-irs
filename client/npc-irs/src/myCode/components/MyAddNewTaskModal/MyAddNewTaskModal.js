/* eslint-disable react/prop-types */

import React from "react";
import classes from "./MyAddNewTaskModal.module.css";
import MyInput from "../MyInput/MyInput";

const MyAddNewTaskModal = ({ isActive, setIsActive }) => {
  return (
    <div className={classes.modal} style={{ display: isActive ? "flex" : "none" }}>
      <div className={classes.modalContentBox}>
        <div className={classes.modalTitle}>Add new task</div>
        <div className={classes.modalContent}>
          <MyInput text={"Task name"} />
          <MyInput text={"Description"} />
          <div>Choose an employee</div>
          <div className={classes.modalBtnContainer}>
            <button
              onClick={() => {
                setIsActive(false);
              }}
            >
              Cansel
            </button>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddNewTaskModal;

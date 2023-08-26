/* eslint-disable react/prop-types */

import React from "react";
import classes from "./MyAddNewTaskModal.module.css";
import MySearchBar from "../MySearchBar/MySearchBar";

const MyAddNewTaskModal = ({ isActive, setIsActive }) => {
  return (
    <div className={classes.modal} style={{ display: isActive ? "flex" : "none" }}>
      <div className={classes.modalContentBox}>
        <div>Add new task</div>
        <div className={classes.modalContent}>
          <MySearchBar />
          {/*<div>Enter task name</div>*/}
          <div>Enter a description</div>
          <div>Choose an employee</div>
        </div>
      </div>
    </div>
  );
};

export default MyAddNewTaskModal;

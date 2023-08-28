import React from "react";
import classes from "./MyTaskComp.module.css";

const MyTaskComp = (p) => {
  return <div className={classes.taskContainer}>{p.value}</div>;
};

export default MyTaskComp;

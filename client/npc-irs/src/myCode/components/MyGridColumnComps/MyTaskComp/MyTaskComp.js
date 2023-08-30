import React from "react";
import classes from "./MyTaskComp.module.css";

const MyTaskComp = (p) => {
  // console.log(p.value);
  return <div className={classes.taskContainer}>{p.value}</div>;
};

export default MyTaskComp;

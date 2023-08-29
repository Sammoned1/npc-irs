import React from "react";
import classes from "./MyTaskAmountComp.module.css";

const MyTaskAmountComp = (p) => {
  return (
    <div className={classes.taskAmount}>
      <div>{p.value}</div>
    </div>
  );
};

export default MyTaskAmountComp;

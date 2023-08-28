import React from "react";
import classes from "./MyStatusComp.module.css";

const MyStatusComp = (p) => {
  return (
    <div className={classes.statusContainer}>
      <div>{p.value}</div>
    </div>
  );
};

export default MyStatusComp;

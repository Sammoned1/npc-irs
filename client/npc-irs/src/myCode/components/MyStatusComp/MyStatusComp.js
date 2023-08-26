import React from "react";
import classes from "./MyStatusComp.module.css";

const MyStatusComp = (p) => {
  return <div className={classes.statusContainer}>{p.value}</div>;
};

export default MyStatusComp;

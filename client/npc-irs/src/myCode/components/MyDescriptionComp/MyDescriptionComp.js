import React from "react";
import classes from "./MyDescriptionComp.module.css";

const MyDescriptionComp = (p) => {
  return <div className={classes.descriptionContainer}>{p.value}</div>;
};

export default MyDescriptionComp;

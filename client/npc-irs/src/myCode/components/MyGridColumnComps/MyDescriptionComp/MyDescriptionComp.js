import React from "react";
import classes from "./MyDescriptionComp.module.css";

const MyDescriptionComp = (p) => {
  return (
    <div className={classes.descriptionContainer}>
      <div>{p.value}</div>
    </div>
  );
};

export default MyDescriptionComp;

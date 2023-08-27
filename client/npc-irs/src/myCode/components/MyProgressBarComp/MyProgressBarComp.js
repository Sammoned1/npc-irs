import React, { useEffect } from "react";
import classes from "./MyProgressBarComp.module.css";

const MyProgressBarComp = (p) => {
  const progress = p.value;
  console.log(p);
  return (
    <div className={classes.progressBarContainer}>
      <div className={classes.progressText}>{progress}%</div>
      <div className={classes.progressBar}>
        <div
          className={classes.progressBarFill}
          style={{
            width: `${progress}%`,
            background:
              progress < 25
                ? "linear-gradient(195deg, #EF5350, #E53935)"
                : progress < 75
                ? "linear-gradient(195deg, #49a3f1, #1A73E8)"
                : "linear-gradient(195deg, #66BB6A, #43A047)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default MyProgressBarComp;

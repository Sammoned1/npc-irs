import React, { useEffect, useState } from "react";
import classes from "./MyProgressBarComp.module.css";
import { getUser } from "../../../http/userAPI";

const MyProgressBarComp = (p) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (p.data) {
      if (p.data.progress) setProgress(p.data.progress);
      else setProgress(p.data.overall_progress);
    }
  }, []);

  return (
    <div className={classes.progressBarContainer}>
      <div className={classes.progressText}>{Math.floor(progress * 100)}%</div>
      <div className={classes.progressBar}>
        <div
          className={classes.progressBarFill}
          style={{
            width: `${Math.floor(progress * 100)}%`,
            background:
              progress < 0.25
                ? "linear-gradient(195deg, #EF5350, #E53935)"
                : progress < 0.75
                ? "linear-gradient(195deg, #49a3f1, #1A73E8)"
                : "linear-gradient(195deg, #66BB6A, #43A047)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default MyProgressBarComp;

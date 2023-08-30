import React, { useEffect, useState } from "react";
import classes from "./MyTaskAmountComp.module.css";

const MyTaskAmountComp = (p) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (p.data) {
      setValue(p.data.task_amount);
    }
  }, []);
  return (
    <div className={classes.taskAmount}>
      <div>{value}</div>
    </div>
  );
};

export default MyTaskAmountComp;

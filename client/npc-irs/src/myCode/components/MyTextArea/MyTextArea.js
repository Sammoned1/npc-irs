/* eslint-disable react/prop-types */

import React, { useState } from "react";
import classes from "./MyTextArea.module.css";

const MyTextArea = ({ text, value, setValue }) => {
  return (
    <div className={classes.container}>
      <div className={classes.textAreaContainer}>
        <textarea
          id={text + "_id"}
          className={value ? classes.active : ""}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor={text + "_id"}>{text}</label>
        <fieldset>
          <legend>
            <span>{text}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
};

export default MyTextArea;

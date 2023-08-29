/* eslint-disable react/prop-types */

import React, { useEffect, useRef, useState } from "react";
import classes from "./MyInput.module.css";

const MyInput = ({ text, value, setValue }) => {
  return (
    <div className={classes.container}>
      <div className={classes.inputContainer}>
        <input
          className={value ? classes.active : ""}
          type="text"
          id={text + "_id"}
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

export default MyInput;

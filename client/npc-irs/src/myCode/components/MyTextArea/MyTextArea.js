/* eslint-disable react/prop-types */

import React from "react";
import classes from "./MyTextArea.module.css";

const MyTextArea = ({ text }) => {
  return (
    <div className={classes.container}>
      <div className={classes.textAreaContainer}>
        <textarea id={text + "_id"} />
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

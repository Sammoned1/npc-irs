/* eslint-disable react/prop-types */

import React, { useEffect, useRef } from "react";
import classes from "./MyInput.module.css";

const MyInput = ({ text }) => {
  return (
    <div className={classes.searchBarContainer}>
      <div className={classes.inputContainer}>
        <input type="text" id={"mySearchInput"} className={classes.searchInput} />
        <label htmlFor="mySearchInput">{text}</label>
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

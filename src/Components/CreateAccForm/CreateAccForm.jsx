import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import InputBase from "../InputBase/InputBase";

const createAccForm = ({
  inputData,
  formData,
  formError,
  handleBlur,
  handleInputChange,
}) => {
  const handleEye = () => {
    const input = document.getElementById("password-eye");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };
  return inputData.map((item) => (
    <label htmlFor={item.name} className="form-label" key={item.key}>
      <div className="grid-div">
        {item.label}
        {formError &&
        formError[item.error] &&
        formError[item.error].length > 1 ? (
          <div className="error">{formError[item.error]}</div>
        ) : null}
      </div>
      <InputBase
        className={item.class}
        type={item.type}
        name={item.name}
        value={formData && formData[item.name]}
        onBlur={handleBlur}
        onChange={handleInputChange}
        id={item.id}
        autoComplete="off"
      />
      {item.name === "password" ? (
        <FontAwesomeIcon
          icon={faEye}
          className="eye-icon"
          onClick={handleEye}
        />
      ) : null}
      {item.label2 ? <p className="para-tag">{item.label2}</p> : null}
    </label>
  ));
};

export default createAccForm;

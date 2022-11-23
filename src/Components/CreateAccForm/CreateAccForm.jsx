import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import InputBase from "../InputBase/InputBase";

const createAccForm = ({
  inputData,
  formData,
  error,
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
        {error && error[item.error] && error[item.error].length > 1 ? (
          <div className="error">{error[item.error]}</div>
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

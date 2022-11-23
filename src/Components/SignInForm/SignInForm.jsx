import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import InputBase from "../InputBase/InputBase";

const SignInForm = ({
  signInInputData,
  signInForm,
  error,
  handleInputChange,
  handleBlur,
}) => {
  const handleEye = () => {
    const input = document.getElementById("password-eye");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };
  return signInInputData.map((item) => (
    <label className="form-label" htmlFor={item.name} key={item.key}>
      <div className="grid-div">
        {item.label}
        {error && error[item.error] && error[item.error].length > 1 ? (
          <div className="error">{error[item.error]}</div>
        ) : null}
      </div>
      <InputBase
        type={item.type}
        name={item.name}
        value={signInForm && signInForm[item.name]}
        onBlur={handleBlur}
        onChange={handleInputChange}
        className={item.class}
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
    </label>
  ));
};

export default SignInForm;

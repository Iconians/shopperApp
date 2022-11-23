import React from "react";
import SignInForm from "../SignInForm/SignInForm";
import CreateAccForm from "../CreateAccForm/CreateAccForm";
import InputBase from "../InputBase/InputBase";

const AccountForms = ({
  signIn,
  createAcc,
  formData,
  signInFormData,
  error,
  closeAccForm,
  forms,
  switchForm,
  handleInputChange,
  handleBlur,
  handleSignIn,
  handleSubmit,
}) => {
  const showHideClass = forms ? "display-block" : "display-none";
  const inputData = [
    {
      label: "Your Email Address *",
      class: "email-input inputs",
      type: "text",
      name: "email",
      error: "emailError",
      key: "1",
    },
    {
      label: "Create Password *",
      label2:
        "Password must be 8-20 characters, including at least one capital letter, at one small letter, one number and one special character -!@#$%^&*()_+",
      class: "password-input-1 inputs",
      type: "password",
      name: "password",
      id: "password-eye",
      error: "passwordError",
      key: "2",
    },
    {
      label: "Confirm Password *",
      class: "password-input-2 inputs",
      type: "password",
      name: "confirmPassword",
      error: "confirmPasswordError",
      key: "3",
    },
    {
      label: "First Name *",
      class: "first-name-input inputs",
      type: "text",
      name: "firstName",
      error: "firstNameError",
      key: "4",
    },
    {
      label: "Surname *",
      class: "surname-input inputs",
      type: "text",
      name: "surName",
      error: "surNameError",
      key: "5",
    },
    {
      label: "Postcode",
      class: "postcode-input inputs",
      type: "text",
      name: "postal",
      error: "postalError",
      key: "6",
    },
  ];

  const signInInputData = [
    {
      label: "Your Email Address *",
      name: "email",
      type: "text",
      class: "inputs",
      error: "emailError",
      key: "7",
    },
    {
      label: "Enter Your Password *",
      name: "password",
      type: "password",
      class: "inputs",
      id: "password-eye",
      error: "passwordError",
      key: "8",
    },
  ];

  return (
    <div className={`page-header modal modal-main ${showHideClass}`}>
      <div className="radio-buttons-div">
        <label
          htmlFor="signin"
          className={signIn === true ? "active" : "inactive"}
        >
          <input
            onChange={switchForm}
            value="true"
            checked={signIn === true && createAcc === false}
            type="radio"
            name="formChoice"
            id="signIn"
          />
          SIGN IN
        </label>
        <label
          htmlFor="create-account"
          className={createAcc === true ? "active" : "inactive"}
        >
          <input
            onChange={switchForm}
            value="false"
            checked={createAcc === true && signIn === false}
            type="radio"
            name="formChoice"
            id="createAccount"
          />
          CREATE ACCOUNT
        </label>
      </div>
      <div id="signinForm" className="signin-form-div">
        <form onSubmit={signIn ? handleSignIn : handleSubmit}>
          {signIn ? (
            <SignInForm
              signInInputData={signInInputData}
              signInForm={signInFormData}
              error={error}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
            />
          ) : (
            <CreateAccForm
              inputData={inputData}
              formData={formData}
              error={error}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
            />
          )}
          {signIn ? (
            <div className="submit-div">
              <InputBase
                type="submit"
                value="SIGN IN"
                class="btn-inputs save-btn"
              />
            </div>
          ) : (
            <div className="submit-div">
              <InputBase
                type="submit"
                value="Create Account"
                class="btn-inputs save-btn"
              />
            </div>
          )}
          <div className="cancel-div">
            <input type="button" value="Cancel" onClick={closeAccForm} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForms;

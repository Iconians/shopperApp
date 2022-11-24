import React from "react";
import InputBase from "../InputBase/InputBase";
import "./ShippingComponent.css";

const ShippingComponent = ({
  backPage,
  handleInputChange,
  standardShipping,
  expressShipping,
  errorMsg,
}) => {
  const formData = [
    {
      divClassName: "address-title-field",
      gridClass: "address-title-grid-spot",
      h5: "Address Title",
      name: "addressTitle",
      placeholder: "Address Title",
      error: "addressTitleError",
      key: "1",
    },
    {
      divClassName: "name-field",
      gridClass: "name-grid-spot",
      h5: "Name - Surname",
      name: "name",
      placeholder: "Name",
      error: "nameError",
      key: "2",
    },
    {
      divClassName: "address-field",
      gridClass: "address-grid-spot",
      h5: "Your Address",
      name: "address",
      placeholder: "Address",
      error: "addressError",
      key: "3",
    },
    {
      divClassName: "zip-code-field",
      gridClass: "zip-grid-spot",
      h5: "Zip Code",
      name: "zip",
      placeholder: "zip",
      error: "zipError",
      key: "4",
    },
    {
      divClassName: "country-select-div",
      gridClass: "country-grid-spot",
      h5: "Country",
      name: "country",
      value: "Country",
      error: "countryError",
      key: "5",
    },
    {
      divClassName: "city-select-div",
      gridClass: "city-grid-spot",
      h5: "City",
      name: "city",
      value: "City",
      error: "cityError",
      key: "6",
    },
    {
      divClassName: "state-select-div",
      gridClass: "state-grid-spot",
      h5: "State",
      name: "state",
      value: "State",
      error: "stateError",
      key: "7",
    },
    {
      divClassName: "cellphone-field",
      gridClass: "cellphone-grid-spot",
      input1class: "cell-area-code-input",
      input2Class: "cellphone-input",
      h5: "Cell Phone",
      type: "text",
      name: "cellAreaCode",
      name2: "cellNum",
      placeholder: "Area Code",
      placeholder2: "Number",
      error: "cellAreaCodeError",
      error2: "cellNumError",
      maxLength: "3",
      key: "8",
    },
    {
      divClassName: "phone-field",
      gridClass: "phone-grid-spot",
      input1class: "phone-area-code-input",
      input2Class: "phone-input",
      h5: "Telephone",
      type: "text",
      name: "phoneAreaCode",
      name2: "phoneNum",
      placeholder: "Area Code",
      placeholder2: "Number",
      maxLength: "3",
      error: "phoneAreaCodeError",
      error2: "phoneNumError",
      key: "9",
    },
  ];
  return (
    <div className="shipping-component-parent-div">
      <div className="shipping-form-div">
        <div className="shipping-title">
          <h4>SHIPPING INFORMATION</h4>
          <hr />
        </div>
        <div className="shipping-form">
          {formData.map((item) => {
            if (
              item.name === "addressTitle" ||
              item.name === "name" ||
              item.name === "address" ||
              item.name === "zip"
            ) {
              return (
                <div
                  className={`grid input-height ${item.gridClass}`}
                  key={item.key}
                >
                  <h5>{item.h5}</h5>
                  <div className={item.divClassName}>
                    {errorMsg &&
                    errorMsg[item.error] &&
                    errorMsg[item.error].length > 1 ? (
                      <div className="error">{errorMsg[item.error]}</div>
                    ) : null}
                    <InputBase
                      type="text"
                      name={item.name}
                      placeholder={item.placeholder}
                      onChange={handleInputChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
              );
            } else if (
              item.name === "country" ||
              item.name === "city" ||
              item.name === "state"
            ) {
              return (
                <div
                  className={`flex input-height ${item.gridClass}`}
                  key={item.key}
                >
                  <h5>{item.h5}</h5>
                  <div className={item.divClassName}>
                    {errorMsg &&
                    errorMsg[item.error] &&
                    errorMsg[item.error].length > 1 ? (
                      <div className="error">{errorMsg[item.error]}</div>
                    ) : null}
                    <select
                      name={item.name}
                      id=""
                      defaultValue="Select"
                      onChange={handleInputChange}
                    >
                      <option>-Select-</option>
                      <option>{item.value}</option>
                    </select>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className={`grid input-height ${item.gridClass}`}
                  key={item.key}
                >
                  <h5>{item.h5}</h5>
                  <div className={item.divClassName}>
                    {errorMsg &&
                    errorMsg[item.error] &&
                    errorMsg[item.error].length > 1 ? (
                      <div className="error">{errorMsg[item.error]}</div>
                    ) : null}
                    <InputBase
                      className={item.input1class}
                      placeholder={item.placeholder}
                      name={item.name}
                      onChange={handleInputChange}
                      maxLength="3"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    {errorMsg &&
                    errorMsg[item.error2] &&
                    errorMsg[item.error2].length > 1 ? (
                      <div className="error">{errorMsg[item.error2]}</div>
                    ) : null}
                    <InputBase
                      className={item.input2Class}
                      placeholder={item.placeholder2}
                      name={item.name2}
                      onChange={handleInputChange}
                      maxLength="7"
                      autoComplete="off"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="shipping-method-div">
        <div className="shipping-method-title">
          <hr />
          <h4>SHIPPING METHOD</h4>
          {errorMsg &&
          errorMsg["shippingOptionError"] &&
          errorMsg["shippingOptionError"].length > 1 ? (
            <div className="error">{errorMsg["shippingOptionError"]}</div>
          ) : null}
        </div>
        <div className="shipping-options">
          <div className="flex standard-option">
            <input
              name="shippingOption"
              type="radio"
              onChange={standardShipping}
            />
            <h5>Standard</h5>
            <p>Delivery in 4-6 Business Days - Free($40 min.)</p>
          </div>
          <div className="flex standard-option express">
            <input
              name="shippingOption"
              type="radio"
              onChange={expressShipping}
            />
            <h5>Express</h5>
            <p>Delivery in 1-3 Business Days - $5.00</p>
          </div>
        </div>
        <div className="back-btn">
          <InputBase type="submit" value="Back To Cart" onClick={backPage} />
        </div>
      </div>
    </div>
  );
};

export default ShippingComponent;

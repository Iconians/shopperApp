import React from "react";
import InputBase from "../InputBase/InputBase";
import "./PaymentComponent.css";
import { CARD, CardIcon } from "../../constants";

const PaymentComponent = ({
  backPage,
  total,
  errorMsg,
  handleInputChange,
  cardType,
  maxLength,
  paymentData,
  nextPage,
  disableBtn,
}) => {
  const formData = [
    {
      class: "name-grid-spot",
      name: "cardName",
      h4: "Cardholders Name",
      className: "name-div",
      placeholder: "name",
      error: "cardNameError",
      key: "1",
    },
    {
      class: "card-grid-spot",
      name: "cardNumber",
      h4: "Card Number",
      className: "number-div",
      placeholder: "Card Number",
      error: "cardNumberError",
      key: "2",
    },
    {
      class: "expire-month-grid-spot",
      h4: "Exp.Date",
      className: "month-div",
      name: "cardMonth",
      value: "January",
      error: "cardMonthError",
      key: "3",
    },
    {
      class: "expire-year-grid-spot",
      className: "year-div",
      name: "cardYear",
      value: "2020",
      error: "cardYearError",
      key: "4",
    },
    {
      class: "cvv-grid-spot",
      h4: "CVV",
      className: "cvv-div",
      name: "cardCvv",
      placeholder: "CVV",
      error: "cardCvvError",
      maxLength: "3",
      key: "5",
    },
  ];

  return (
    <div className="payment-parent-div">
      <div className="payment-title">
        <h4>PAYMENT INFORMATION</h4>
        <hr />
      </div>
      <div className="card-details">
        {formData.map((item) => {
          if (item.name === "cardMonth" || item.name === "cardYear") {
            return (
              <div
                className={`expire-div payment-flex ${item.class}`}
                key={item.key}
              >
                <h4>{item.h4}</h4>
                <div className={item.className}>
                  {errorMsg &&
                  errorMsg[item.error] &&
                  errorMsg[item.error].length > 1 ? (
                    <div className="error">{errorMsg[item.error]}</div>
                  ) : null}
                  <select name={item.name} id="" onChange={handleInputChange}>
                    <option value="select">-Select-</option>
                    <option value={item.value}>{item.value}</option>
                  </select>
                </div>
              </div>
            );
          } else {
            return (
              <div className={`payment-flex ${item.class}`} key={item.key}>
                <h4>{item.h4}</h4>
                <div className={item.className}>
                  {errorMsg &&
                  errorMsg[item.error] &&
                  errorMsg[item.error].length > 1 ? (
                    <div className="error">{errorMsg[item.error]}</div>
                  ) : null}
                  <InputBase
                    placeholder={item.placeholder}
                    type="text"
                    value={paymentData && paymentData[item.name]}
                    name={item.name}
                    onChange={handleInputChange}
                    maxLength={
                      item.name === "cardNumber" ? maxLength : item.maxLength
                    }
                  />
                  {item.error &&
                  item.name === "cardNumber" &&
                  CARD.includes(cardType) ? (
                    <img className="img" src={CardIcon[cardType]} alt="card" />
                  ) : null}
                </div>
              </div>
            );
          }
        })}
      </div>
      <div
        className={
          "payment-btn-div " + (disableBtn ? "payment-btn-disabled" : null)
        }
      >
        <InputBase
          type="submit"
          value={`PAY ${total}`}
          onClick={nextPage}
          disabled={disableBtn}
        />
      </div>
      <div className="back-btn payment-back-btn">
        <InputBase type="submit" value="BACK TO ADDRESS" onClick={backPage} />
      </div>
    </div>
  );
};

export default PaymentComponent;

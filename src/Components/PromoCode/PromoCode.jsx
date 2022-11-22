import React from "react";
import InputBase from "../InputBase/InputBase";

const PromoCode = ({ discountCode }) => {
  const getCode = () => {
    let code = document.getElementById("codeInput").value;
    discountCode(code);
  };
  return (
    <div className="promo-code-div">
      <p>Do you have a promo code?</p>
      <div className="code-inputs-wrapper">
        <InputBase className="code-input" placeholder="code" id="codeInput" />
        <InputBase
          className="code-input-btn"
          type="button"
          value="APPLY"
          onClick={getCode}
          cursor="pointer"
        />
      </div>
    </div>
  );
};

export default PromoCode;

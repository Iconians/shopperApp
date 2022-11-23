import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import ShippingComponent from "../ShippingComponent/ShippingComponent";
import SummaryComponent from "../SummaryComponent/SummaryComponent";

const ShippingPage = ({
  index,
  handleInputChange,
  expressShipping,
  standardShipping,
  errorMsg,
  subTotal,
  discount,
  discountCodes,
  cartTotal,
  cartItems,
  tax,
  shipping,
  next,
}) => {
  return (
    <div>
      <ProgressBar index={index} />
      <ShippingComponent
        index={index}
        handleInputChange={handleInputChange}
        expressShipping={expressShipping}
        standardShipping={standardShipping}
        errorMsg={errorMsg}
      />
      <SummaryComponent
        index={index}
        subTotal={subTotal}
        discount={discount}
        discountCodes={discountCodes}
        cartTotal={cartTotal}
        tax={tax}
        shipping={shipping}
        next={next}
        cartItems={cartItems}
      />
    </div>
  );
};

export default ShippingPage;

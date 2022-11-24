import React from "react";

const ShippingMethod = ({ shipping }) => {
  return (
    <div className="shipping-method-parent-div">
      <div className="title">SHIPMENT METHOD</div>
      <div className="ship-type">{shipping.shippingTitle}</div>
      <div className="ship-description">{shipping.shippingDescription}</div>
    </div>
  );
};

export default ShippingMethod;

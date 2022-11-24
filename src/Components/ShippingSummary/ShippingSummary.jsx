import React from "react";

const ShippingSummary = ({ shippingData }) => {
  return (
    <div className="shipping-summary-parent-div">
      <div className="title">SHIPMENT ADDRESS</div>
      <div className="name">{shippingData.name}</div>
      <div className="address">{shippingData.address}</div>
      <div className="city">
        {shippingData.city}-{shippingData.zip}
      </div>
      <hr />
    </div>
  );
};

export default ShippingSummary;

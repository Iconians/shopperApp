import React from "react";
import "./CartSummary.css";

const CartSummary = ({ cartData }) => {
  const array = cartData.filter((item) => {
    return item.totalPrice !== 0;
  });
  return (
    <div className="cart-summary-parent-div">
      {array.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-details">
            <div>{item.name}</div>
            <div>Qty {item.value}</div>
          </div>
          <div>{item.totalPrice}</div>
        </div>
      ))}
    </div>
  );
};

export default CartSummary;

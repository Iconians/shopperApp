import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./CartItem.css";

const CartItem = ({ img, name, price, id, openItemPage, removeFromCart }) => (
  <div className="main-wrapper">
    <FontAwesomeIcon
      id={id}
      icon={faClose}
      className="close"
      onClick={removeFromCart}
    />
    <div className="product-card" id={id} onClick={openItemPage}>
      <img src={img} alt="" id={id} />
      <div id={id}>{name}</div>
      <div id={id}>{price}</div>
    </div>
  </div>
);

export default CartItem;

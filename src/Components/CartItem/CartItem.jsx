import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./CartItem.css";

const CartItem = ({
  img,
  name,
  price,
  id,
  openItemPage,
  removeFromCart,
  inventoryError,
  quantity,
}) => {
  const errorMsg = quantity.filter((value) => value.id === id);

  return (
    <div className="main-wrapper">
      <div className="faclose-div">
        <FontAwesomeIcon
          id={id}
          icon={faClose}
          className="close"
          onClick={removeFromCart}
        />
      </div>
      <div className="product-card" id={id} onClick={openItemPage}>
        <img src={img} alt="" id={id} />
        <div id={id}>{name}</div>
        <div id={id}>{price}</div>
      </div>
      {inventoryError && errorMsg.length && errorMsg[0].value > 0 ? (
        <div>{`low quantity ${errorMsg[0].value} available`}</div>
      ) : null}
      {inventoryError && errorMsg.length && errorMsg[0].value === 0 ? (
        <div>{`Out Of Stock`}</div>
      ) : null}
    </div>
  );
};

export default CartItem;

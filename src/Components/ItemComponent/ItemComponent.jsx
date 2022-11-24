import React from "react";
import "./ItemComponent.css";

const ItemComponent = ({
  img,
  title,
  price,
  id,
  openItemPage,
  addToCart,
  inventoryError,
  quantity,
}) => {
  // const errorMsg = quantity.filter((value) => value.id === id);
  return (
    <div>
      <div className="product-card" id={id} onClick={openItemPage}>
        <img src={img} alt="" id={id} />
        <div id={id}>{title}</div>
        <div id={id}>{price}</div>
        {inventoryError && quantity[0].id === id && quantity[0].value > 0 ? (
          <div>{`low quantity ${quantity[0].value} available`}</div>
        ) : null}
        {inventoryError && quantity[0].id === id && quantity[0].value === 0 ? (
          <div>{`Out Of Stock`}</div>
        ) : null}
      </div>
      <div>
        <input type="button" value="Add To Cart" id={id} onClick={addToCart} />
      </div>
    </div>
  );
};

export default ItemComponent;

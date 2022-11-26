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
  const errorMsg = quantity.filter((value) => value.id === id);
  const isAddCartEror = errorMsg.length
    ? errorMsg[0].value >= errorMsg[0].reqVal
    : null;
  const doubleCheckValue = errorMsg.length
    ? errorMsg[0].qty === errorMsg[0].value
    : null;
  return (
    <div className="product-card-parent-div">
      <div className="product-card" id={id} onClick={openItemPage}>
        <img src={img} alt="" id={id} />
        <div id={id}>{title}</div>
        <div id={id}>{price}</div>

        {inventoryError &&
        isAddCartEror &&
        errorMsg.length &&
        errorMsg[0].value > 0 ? (
          <div>{`low quantity ${errorMsg[0].value} available`}</div>
        ) : null}
        {inventoryError &&
        isAddCartEror &&
        errorMsg.length &&
        errorMsg[0].value === 0 ? (
          <div>{`Out Of Stock`}</div>
        ) : null}
        {inventoryError && isAddCartEror && doubleCheckValue ? (
          <div>Failed to add to cart</div>
        ) : null}
      </div>
      <div className="btn-div">
        <input type="button" value="Add To Cart" id={id} onClick={addToCart} />
      </div>
    </div>
  );
};

export default ItemComponent;

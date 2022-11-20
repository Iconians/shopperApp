import React from "react";
import "./ItemComponent.css";

const ItemComponent = ({ img, title, price, id, openItemPage, addToCart }) => (
  <div>
    <div className="product-card" id={id} onClick={openItemPage}>
      <img src={img} alt="" id={id} />
      <div id={id}>{title}</div>
      <div id={id}>{price}</div>
    </div>
    <div>
      <input type="button" value="Add To Cart" id={id} onClick={addToCart} />
    </div>
  </div>
);

export default ItemComponent;

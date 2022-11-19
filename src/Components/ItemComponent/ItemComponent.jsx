import React from "react";
import "./ItemComponent.css";

const ItemComponent = ({ img, title, price, id, openItemPage }) => (
  <div className="product-card" key={id} id={id} onClick={openItemPage}>
    <img src={img} alt="" id={id} />
    <div id={id}>{title}</div>
    <div id={id}>{price}</div>
  </div>
);

export default ItemComponent;

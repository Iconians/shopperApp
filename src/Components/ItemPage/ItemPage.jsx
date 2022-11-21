import React from "react";
import "./ItemPage.css";
const ItemPage = ({ product, showItemPage, handleClose, addToCart }) => {
  const showHideClass = showItemPage ? "display-block" : "display-none";

  return (
    <div className={`modal ${showHideClass}`}>
      <div>
        {!undefined ? (
          product.map((product) => (
            <div className="modal-main" key={product.id}>
              <div className="img-container">
                <img src={product.img} alt="" />
              </div>
              <div>
                <div>
                  <h4>{product.name}</h4>
                </div>
                <div>
                  <div>{product.price}</div>
                </div>
                <div>{product.desc.replace("<p>", "").replace("</p>", "")}</div>
              </div>
              <div>
                <input
                  id={product.id}
                  type="button"
                  value="Add To Cart"
                  onClick={addToCart}
                />
              </div>
              <input type="button" value="Close" onClick={handleClose} />
            </div> // make change quantity select field
          ))
        ) : (
          <div>...Loading</div>
        )}
      </div>
    </div>
  );
};

export default ItemPage;

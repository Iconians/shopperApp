import React from "react";
import "./ItemPage.css";
const ItemPage = ({
  product,
  showItemPage,
  handleClose,
  addToCart,
  updateQty,
  inventoryError,
  quantity,
}) => {
  const showHideClass = showItemPage ? "display-block" : "display-none";
  const errorMsg = quantity.map((value) => value.id === product.id);
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
                {inventoryError ? (
                  <div>{`low quantity ${errorMsg.value}`}</div>
                ) : null}
                <input
                  id={product.id}
                  type="button"
                  value="Add To Cart"
                  onClick={addToCart}
                />
              </div>
              <div>
                <select
                  name="productQty"
                  id={product.id}
                  onChange={updateQty}
                  defaultValue="0"
                >
                  {[...Array(10).keys()].map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <input type="button" value="Close" onClick={handleClose} />
            </div>
          ))
        ) : (
          <div>
            ...Somthing broke on our end please refresh page and try again
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemPage;

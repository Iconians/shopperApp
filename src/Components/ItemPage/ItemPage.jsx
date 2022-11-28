import React from "react";
import "./ItemPage.css";
const ItemPage = ({
  product,
  handleClose,
  addToCart,
  updateQty,
  inventoryError,
  quantity,
}) => {
  const errorMsg = quantity.filter((value) => value.id === product[0].id);
  const isAddCartEror = errorMsg.length
    ? errorMsg[0].value > errorMsg[0].reqVal
    : null;
  return (
    <div className="">
      <div className="close-btn-div">
        <input type="button" value="back" onClick={handleClose} />
      </div>
      <div>
        {!undefined ? (
          product.map((product) => (
            <div className="item-page-parent-div" key={product.id}>
              <div className="img-container">
                <img src={product.img} alt="" />
              </div>
              <div className="description-info-div">
                <div>
                  <div>
                    <h4>{product.name}</h4>
                  </div>
                  <div>
                    <div>{product.price}</div>
                  </div>
                  <div className="product-description">
                    {product.desc.replace("<p>", "").replace("</p>", "")}
                  </div>
                </div>
                <div className="select-div">
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
                <div className="btn-div">
                  {inventoryError &&
                  !isAddCartEror &&
                  errorMsg.length &&
                  errorMsg[0].value > 0 ? (
                    <div>{`low quantity ${errorMsg[0].value} available`}</div>
                  ) : null}
                  {inventoryError &&
                  !isAddCartEror &&
                  errorMsg.length &&
                  errorMsg[0].value === 0 ? (
                    <div>{`Out Of Stock`}</div>
                  ) : null}
                  {inventoryError && isAddCartEror ? (
                    <div>Failed to add to cart</div>
                  ) : null}
                  <input
                    id={product.id}
                    type="button"
                    value="Add To Cart"
                    onClick={addToCart}
                  />
                </div>
              </div>
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

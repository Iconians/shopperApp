import React from "react";
import ItemComponent from "../ItemComponent/ItemComponent";
import "./CategoryPage.css";

const CategoryPage = ({
  products,
  handleClose,
  openItemModal,
  title,
  addToCart,
  inventoryError,
  quantity,
}) => {
  return (
    <div className="category-page">
      <div className="">
        <div className="category-btn-div">
          <input type="button" value="Back" onClick={handleClose} />
        </div>
        <div className="title">
          <h2>{title.replace("-", " ")}</h2>
        </div>
        <div className="product-container">
          {products.length ? (
            products.map((item) => (
              <div className={`${item.categories[0]}-container`} key={item.id}>
                <ItemComponent
                  img={item.img}
                  title={item.name}
                  price={item.price}
                  id={item.id}
                  openItemPage={openItemModal}
                  addToCart={addToCart}
                  inventoryError={inventoryError}
                  quantity={quantity}
                />
              </div>
            ))
          ) : (
            <div className="broken-div">
              Something broke please hit the back button and try again
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

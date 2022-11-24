import React from "react";
import ItemComponent from "../ItemComponent/ItemComponent";
import "./CategoryPage.css";

const CategoryPage = ({
  products,
  showCategoryPage,
  handleClose,
  openItemModal,
  title,
  addToCart,
  inventoryError,
  quantity,
}) => {
  const showHideClass = showCategoryPage ? "display-block" : "display-none";

  return (
    <div className={`modal ${showHideClass}`}>
      <div className="modal-main">
        <div className="title">
          <h2>{title.replace("-", " ")}</h2>
        </div>
        <div className="product-container">
          {products.map((item) => (
            <div key={item.id}>
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
          ))}
        </div>
        <input type="button" value="close" onClick={handleClose} />
      </div>
    </div>
  );
};

export default CategoryPage;

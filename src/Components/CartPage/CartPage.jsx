import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Cart from "../Cart/Cart";

const CartPage = ({
  products,
  closeCartPage,
  openItemPage,
  updateQty,
  removeFromCart,
}) => {
  return (
    <div className="cart-wrapper">
      {<FontAwesomeIcon icon={faClose} onClick={closeCartPage} />}
      <Cart
        products={products}
        openItemPage={openItemPage}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default CartPage;

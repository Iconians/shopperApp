import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import Cart from "../Cart/Cart";
import SummaryComponent from "../SummaryComponent/SummaryComponent";

const CartPage = ({
  products,
  closeCartPage,
  openItemPage,
  updateQty,
  removeFromCart,
  index,
  subTotal,
  discount,
  discountCodes,
  cartTotal,
}) => {
  return (
    <div className="cart-wrapper">
      {<FontAwesomeIcon icon={faClose} onClick={closeCartPage} />}
      <ProgressBar index={index} />
      <Cart
        products={products}
        openItemPage={openItemPage}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
      />
      <SummaryComponent
        index={index}
        subTotal={subTotal}
        discount={discount}
        discountCodes={discountCodes}
        cartTotal={cartTotal}
      />
    </div>
  );
};

export default CartPage;

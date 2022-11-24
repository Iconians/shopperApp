import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import Cart from "../Cart/Cart";
import PaymentComponent from "../PaymentComponent/PaymentComponent";
import ShippingComponent from "../ShippingComponent/ShippingComponent";
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
  tax,
  shipping,
  next,
  cartItems,
  backPage,
  handleInputChange,
  expressShipping,
  standardShipping,
  shippingErrorMsg,
  paymentErrorMsg,
  cartError,
  disableBtn,
  shippingData,
  cardType,
  maxLength,
  paymentData,
}) => {
  return (
    <div className="cart-wrapper">
      {<FontAwesomeIcon icon={faClose} onClick={closeCartPage} />}
      <ProgressBar index={index} />
      {index === 1 ? (
        <Cart
          products={products}
          openItemPage={openItemPage}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
        />
      ) : null}
      {index === 2 ? (
        <ShippingComponent
          backPage={backPage}
          handleInputChange={handleInputChange}
          expressShipping={expressShipping}
          standardShipping={standardShipping}
          errorMsg={shippingErrorMsg}
        />
      ) : null}
      {index === 3 ? (
        <PaymentComponent
          backPage={backPage}
          total={cartTotal}
          errorMsg={paymentErrorMsg}
          handleInputChange={handleInputChange}
          cardType={cardType}
          maxLength={maxLength}
          paymentData={paymentData}
          nextPage={next}
          disableBtn={disableBtn}
        />
      ) : null}
      <SummaryComponent
        index={index}
        subTotal={subTotal}
        discount={discount}
        discountCodes={discountCodes}
        disableBtn={disableBtn}
        cartTotal={cartTotal}
        tax={tax}
        shipping={shipping}
        next={next}
        cartItems={cartItems}
        error={cartError}
        shippingData={shippingData}
      />
    </div>
  );
};

export default CartPage;

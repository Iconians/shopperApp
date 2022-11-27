import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import Cart from "../Cart/Cart";
import ConfirmationComponent from "../ConfirmationComponent/ConfirmationComponent";
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
  inventoryError,
  quantity,
}) => {
  return (
    <div className="cart-wrapper">
      {<FontAwesomeIcon icon={faClose} onClick={closeCartPage} />}
      <ProgressBar index={index} />
      {index === 4 ? (
        <Cart
          products={products}
          openItemPage={openItemPage}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
          inventoryError={inventoryError}
          quantity={quantity}
        />
      ) : null}
      {index === 5 ? (
        <ShippingComponent
          backPage={backPage}
          handleInputChange={handleInputChange}
          expressShipping={expressShipping}
          standardShipping={standardShipping}
          errorMsg={shippingErrorMsg}
        />
      ) : null}
      {index === 6 ? (
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
      {index === 7 ? <ConfirmationComponent backPage={backPage} /> : null}
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

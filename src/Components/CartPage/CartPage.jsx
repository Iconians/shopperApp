import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import Cart from "../Cart/Cart";
import ConfirmationComponent from "../ConfirmationComponent/ConfirmationComponent";
import PaymentComponent from "../PaymentComponent/PaymentComponent";
import ShippingComponent from "../ShippingComponent/ShippingComponent";
import SummaryComponent from "../SummaryComponent/SummaryComponent";
import "./CartPage.css";

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
      {index === 4 ? (
        <div className="cartpage-back-btn">
          {<button onClick={closeCartPage}>BACK</button>}
        </div>
      ) : null}
      <div className="progress-bar-div">
        <ProgressBar index={index} />
      </div>
      <div className="component-div">
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
    </div>
  );
};

export default CartPage;

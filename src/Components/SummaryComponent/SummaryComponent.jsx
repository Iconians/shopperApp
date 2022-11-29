import React from "react";
import CartSummary from "../CartSummary/CartSummary";
import InputBase from "../InputBase/InputBase";
import PromoCode from "../PromoCode/PromoCode";
import ShippingMethod from "../ShippingMethod/ShippingMethod";
import ShippingSummary from "../ShippingSummary/ShippingSummary";
import "./SummaryComponent.css";

const SummaryComponent = ({
  index,
  error,
  cartTotal,
  next,
  discount,
  shipping,
  subTotal,
  disableBtn,
  shippingData,
  cardType,
  cardNumber,
  discountCodes,
  tax,
  cartItems,
}) => {
  const buttonValue = () => {
    if (index === 4) {
      return "CHECKOUT";
    } else if (index === 5) {
      return "  NEXT  ";
    } else {
      return `PAY $${cartTotal} `;
    }
  };
  const titles = [
    {
      className1: "cart-subtotal-div",
      className2: "subtotal-price-div price-div",
      p: "Cart Subtotal:",
      propValue: subTotal,
      key: 10,
    },
    {
      className1: "tax-div",
      className2: "price-div tax-price-div",
      p: "Taxes",
      propValue: tax,
      key: 11,
    },
    {
      className1: "shipping-div",
      className2: "price-div",
      p: "Shipping & handling:",
      propValue: shipping.shippingCost,
      key: 12,
    },
    {
      className1: "discount-div",
      className2: "price-div discount",
      p: "Discounts:",
      propValue: discount,
      key: 13,
    },
    {
      className1: "cart-total-div",
      className2: "price-div total",
      p: "Cart Total:",
      propValue: cartTotal,
      key: 14,
    },
  ];
  return (
    <div className="cart-summary-and-totals">
      <div className="summary-div">
        <h4>SUMMARY</h4>
      </div>
      <hr className="summary-hr" />
      {index === 4 ? (
        <PromoCode discountCode={discountCodes} />
      ) : (
        <CartSummary cartData={cartItems} />
      )}
      <hr />
      <div className="totals-div">
        {titles.map((title) => (
          <div className={title.className1} key={title.key}>
            <div className="total-headings">
              <p>{title.p}</p>
            </div>
            <div className={title.className2}>{`$${title.propValue}`}</div>
          </div>
        ))}
      </div>
      <hr />
      {index === 6 ? <ShippingSummary shippingData={shippingData} /> : null}

      {index >= 6 ? <ShippingMethod shipping={shipping} /> : null}
      {/* {index === 7 ? (
        <PaymentSummary
          cardType={cardType}
          total={total}
          cardNumber={cardNumber}
        />
      ) : null} */}

      <div className="checkout-btn-div">
        {error ? <p>select items to checkout</p> : null}
        {index === 7 ? null : (
          <InputBase
            className={
              "submit-btn " + (disableBtn ? "submit-btn-disabled" : null)
            }
            type="submit"
            value={buttonValue()}
            onClick={next}
            disabled={disableBtn}
          />
        )}
      </div>
    </div>
  );
};

export default SummaryComponent;

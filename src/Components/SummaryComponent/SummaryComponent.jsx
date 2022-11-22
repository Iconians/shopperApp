import React from "react";
import CartSummary from "../CartSummary/CartSummary";
import InputBase from "../InputBase/InputBase";
import PromoCode from "../PromoCode/PromoCode";

const SummaryComponent = ({
  index,
  error,
  cartTotal,
  next,
  discount,
  shipping,
  subTotal,
  disableBtn,
  cartData,
  shippingData,
  cardType,
  cardNumber,
  discountCodes,
}) => {
  const buttonValue = () => {
    if (index === 1) {
      return "CHECKOUT";
    } else if (index === 2) {
      return "  NEXT  ";
    } else {
      return `PAY ${cartTotal} `;
    }
  };
  const titles = [
    {
      className1: "cart-subtotal-div",
      className2: "subtotal-price-div price-div",
      p: "Cart Subtotal:",
      propValue: subTotal,
    },
    {
      className1: "shipping-div",
      className2: "price-div",
      p: "Shipping & handling:",
      propValue: shipping,
    },
    {
      className1: "discount-div",
      className2: "price-div discount",
      p: "Discounts:",
      propValue: discount,
    },
    {
      className1: "cart-total-div",
      className2: "price-div total",
      p: "Cart Total:",
      propValue: cartTotal,
    },
  ];
  return (
    <div className="cart-summary-and-totals">
      <div className="summary-div">
        <h4>SUMMARY</h4>
      </div>
      <hr className="summary-hr" />
      {index === 1 ? (
        <PromoCode discountCode={discountCodes} />
      ) : (
        <CartSummary cartData={cartData} />
      )}
      <hr />
      <div className="totals-div">
        {titles.map((title) => (
          <div className={title.className1}>
            <div className="total-headings">
              <p>{title.p}</p>
            </div>
            <div className={title.className2}>
              {title.propValue === subTotal
                ? `$${title.propValue}`
                : title.propValue}
            </div>
          </div>
        ))}
      </div>
      <hr />
      {/* {index === 2 ? <ShippingSummary shippingData={shippingData} /> : null}
      {index >= 2 ? <ShippingMethod shipping={shipping} /> : null}
      {index === 3 ? (
        <PaymentSummary
          cardType={cardType}
          total={total}
          cardNumber={cardNumber}
        />
      ) : null} */}

      <div className="btn-div">
        {error ? <p>select items to checkout</p> : null}
        {index === 3 ? null : (
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

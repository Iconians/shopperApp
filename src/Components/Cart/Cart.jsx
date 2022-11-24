import React from "react";
import CartItem from "../CartItem/CartItem.jsx";

const Cart = ({ products, openItemPage, updateQty, removeFromCart }) => {
  const headings = [
    { h4: "product", class: "product-h4", key: 113 },
    { h4: "Price", class: "price-h4", key: 243 },
    { h4: "Quantity", class: "quauntity-h4", key: 323 },
    { h4: "Total", class: "total-price-h4", key: 432 },
  ];
  return (
    <div className="cart">
      <div className="cart-headings-div">
        {headings.map((heading) => (
          <div className={heading.class} key={heading.key}>
            <h4>{heading.h4}</h4>
          </div>
        ))}
        <hr className="hr" />
      </div>
      {products.length ? (
        products.map((item) => (
          <div className="cart-items" key={item.id}>
            <CartItem
              name={item.name}
              price={item.price}
              id={item.id}
              img={item.img}
              openItemPage={openItemPage}
              removeFromCart={removeFromCart}
            />
            <select
              name="cartQty"
              id={item.id}
              className=""
              onChange={updateQty}
              defaultValue={item.qty}
            >
              {[...Array(10).keys()].map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <h4 className="total-price">{item.totalPrice}</h4>
            <hr className="hr" />
          </div>
        ))
      ) : (
        <div className="cart-items">
          <h3>Cart is empty</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;

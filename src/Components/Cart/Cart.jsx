import React from "react";
import CartItem from "../CartItem/CartItem.jsx";
import "./Cart.css";

const Cart = ({
  products,
  openItemPage,
  updateQty,
  removeFromCart,
  inventoryError,
  quantity,
}) => {
  return (
    <div className="cart">
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
              inventoryError={inventoryError}
              quantity={quantity}
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

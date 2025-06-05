import React, { useContext } from "react";
import { AppContext } from "../App";
import "../App.css";

export default function Cart() {
  const { cart, setCart } = useContext(AppContext);

  const updateQuantity = (productId, change) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Cart List ❤︎</h3>

      {cart.length === 0 ? (
        <p style={{ color: "#191970" }}>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="total">
            <strong>Total:</strong> ${getTotal()}
          </div>
        </>
      )}
    </div>
  );
}

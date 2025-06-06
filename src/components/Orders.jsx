import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `https://gcet-node-app-pi.vercel.app/orders/${user.email}`
          );
          setOrders(res.data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (!user || !user.email) {
    return (
      <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            maxWidth: "400px",
            width: "100%",
            padding: "30px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#fff0f0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "20px", color: "#b00020" }}>
            Please log in to view your orders.
          </h3>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Order Value:</strong> ₹{order.orderValue}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items?.map((item, i) => (
                  <li key={i}>
                    {item.name} - ₹{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
              <small><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

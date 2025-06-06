import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { FaSmile } from "react-icons/fa";
import "./Product.css";

export default function Product() {
  const { user, addToCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get(`https://gcet-node-app-pi.vercel.app/products/`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <div className="welcome-box">
        <h3>
          <FaSmile className="welcome-icon" />
          Welcome {user.name}!
        </h3>
        <p className="welcome-desc">
          Explore our latest collection and enjoy your shopping experience!
        </p>
      </div>

      <div className="App-Product-Row">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>₹{product.price}</h4>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <br />
      <button onClick={() => navigate("/cart")} className="btn">
        🛒 Go to Cart
      </button>
    </div>
  );
}

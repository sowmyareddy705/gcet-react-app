import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // <-- import here

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://gcet-node-app-pi.vercel.app/users/login", {
        email: user.email,
        pass: user.pass,
      });

      const found = res.data;

      if (found && found.name) {
        setMsg("Welcome " + found.name);
        setUser({ ...user, name: found.name, token: "123" });
        navigate("/");
      } else {
        setMsg("Invalid email or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response?.status === 401) {
        setMsg("Invalid email or password");
      } else {
        setMsg("Something went wrong during login");
      }
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3>LOGIN</h3>
        <p>{msg}</p>
        <input
          type="text"
          placeholder="Email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={goToRegister}>Create Account</button>
      </div>
    </div>
  );
}

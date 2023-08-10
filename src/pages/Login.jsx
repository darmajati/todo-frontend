import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login-register.css";

const Login = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (pin.length !== 4) {
      setError("Invalid pin. Please try again.");
      return;
    }
    axios
      .post("https://healthy-blue-outerwear.cyclic.app/auth/api/login", { pin })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userPin", pin);
        setError("");
        navigate("/");
      })
      .catch((error) => {
        setError("Invalid pin. Please try again.");
      });
  };

  return (
    <div className="login-register-container">
      <Form className="login-register-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Pin</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your pin"
            value={pin}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d{0,4}$/.test(inputValue)) {
                setPin(inputValue);
              }
            }}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Sign In
        </Button>
        <p className="mt-2">
          <Link to="/register">Register</Link>
        </p>
        <p>
          <Link to="/">Kembali ke Beranda</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;

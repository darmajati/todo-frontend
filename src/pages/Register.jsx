import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login-register.css";

const Register = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (pin.length !== 4) {
      setError("PIN must be exactly 4 characters long");
      return;
    }
    axios
      .post("https://healthy-blue-outerwear.cyclic.app/auth/api/register", { pin })
      .then((response) => {
        // Handle successful registration (if needed)
        setError("");
        navigate("/login");
      })
      .catch((error) => {
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <div className="login-register-container">
      <Form className="login-register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Pin</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choose a pin"
            value={pin}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d{0,4}$/.test(inputValue)) {
                setPin(inputValue);
              }
            }}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
        <p className="mt-2">
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/">Kembali ke Beranda</Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;

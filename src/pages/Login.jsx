import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BeatLoader } from "react-spinners";
import "../css/login-register.css";

const Login = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (pin.length !== 4) {
      setError("Pin harus memiliki 4 karakter.");
      return;
    }
    setIsLoading(true);

    axios
      .post("https://careful-shift-cod.cyclic.app/auth/api/login", { pin })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userPin", pin);
        setError("");
        setIsLoading(false);
        navigate("/")
        ;
      })
      .catch((error) => {
        setError("Invalid pin. Please try again.");
        setIsLoading(false);
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

        <Button variant="primary" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? (
                  <BeatLoader color="#ffffff" />
                ) : (
                   "Sign In"
                  )}
        </Button>
        <p className="mt-2">
          Belum punya akun?
          <Link to="/register"> Register</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;

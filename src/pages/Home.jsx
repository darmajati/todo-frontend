import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Home = () => {
  const userId = localStorage.getItem("userId");
  const userPin = localStorage.getItem("userPin");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userPin");
    localStorage.removeItem("token");
    navigate("/login")
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: "20px 0" }}>Welcome to the Home Page</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title className="mb-4">User Info</Card.Title>
            <Card.Text>
                {userId && <h6>Logged in user ID: {userId}</h6>}
                {userPin && <h6>Logged in user PIN: {userPin}</h6>}
            </Card.Text>
            <Button variant="danger"  onClick={handleLogout}>Logout</Button>
          </Card.Body>
        </Card>
      </div>

      <h3 className="mt-4">
        <Link to="/todo">Klik disini untuk akses todo list</Link>
      </h3>
    </div>
  );
};

export default Home;

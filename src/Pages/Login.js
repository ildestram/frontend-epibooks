import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedIn"));
    console.log(user);
    if (user && user.email && user.email.length > 0) {
      navigate("../homepage", { replace: true });
    }
  }, [navigate]);
  const post = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (req.status === 200) {
        const user = await req.json();
        console.log("Utente loggato", user);
      } else {
        const error = await req.json();
        console.log("Errore", error.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <img
          src="https://i.pinimg.com/originals/89/7a/61/897a61f56ec18239c658bf02cdba1b6e.jpg"
          alt="login-logo"
          className="img-fluid rounded rounded-circle"
          width="150"
        />
      </div>
      <Form className="m-5" onSubmit={post}>
        <Form.Control
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="insert email"
          className="my-2"
          aria-label="email"
        />
        <Form.Control
          onChange={handleInputChange}
          name="password"
          type="password"
          placeholder="insert password"
          className="my-2"
          aria-label="password"
        />
        <Button type="Submit">Login</Button>
      </Form>
    </>
  );
};

export default Login;

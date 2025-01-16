import React, { useState } from "react";
import "../styles/Register.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      toast.success("User registered successfully!");

      console.log("User Registered Successfully: ", response.data);

      // Navigate to /login after registration
      navigate("/login");
    } catch (error) {
      console.error("Error in registration: ", error);

      toast.error("Registration failed. Please try again.")
    }
  };

  return (
    <div className="loginContainterMain">
      <div className="container">
        <div className="register-container">
          <form onSubmit={handleSubmit}>
            <div className="register-form">
              <h2>REGISTER</h2>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={form.username}
                  id="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleChange}
                  value={form.email}
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                  value={form.password}
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-custom">
                Register
              </button>
              <div className="mt-3 text-center">
                <a href="/login" id="login-link">
                  Already have an account? Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

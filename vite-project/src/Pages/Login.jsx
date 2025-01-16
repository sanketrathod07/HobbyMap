import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form.username:", form.username);
        console.log("form.password:", form.password);


        try {
            // API call to login
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                username: form.username,
                password: form.password
            });

            toast.success("Logged In Successfully!")

            // Handle successful login
            console.log("Login successful:", response.data);

            // Store token in localStorage or cookies if applicable
            localStorage.setItem("authToken", response.data.token);

            navigate('/')
        } catch (error) {
            console.error("Error in sending data:", error);
        }
    };

    return (
        <div className="loginContainterMain">
            <div className="container">
                <div className="login-container" id="login-container">
                    {/* Removed the nested form */}
                    <form action="submit" onSubmit={handleSubmit}>
                        <div className="login-form">
                            <h2>LOGIN</h2>
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
                                    placeholder="Enter your username: admin"
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
                                    placeholder="Enter your password: admin"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-custom">
                                Login
                            </button>
                            <div className="mt-3 text-center">
                                <a href="/forgotpassword" id="forgot-password-link">
                                    Forgot password?
                                </a>
                                <a href="/register" id="register-link">
                                    Register
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
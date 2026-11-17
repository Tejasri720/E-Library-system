import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    // Handle Signup
    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(formData).some(value => !value.trim())) {
            setError("Please fill all fields");
            return;
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            setError("Enter a valid 10-digit phone number");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        let users = [];

        try {
            users = JSON.parse(localStorage.getItem("users")) || [];
        } catch {
            setError("Unable to retrieve registered users");
            return;
        }

        const existingUser = users.find(
            user => user.email.toLowerCase() ===
                formData.email.trim().toLowerCase()
        );

        if (existingUser) {
            setError("Email already registered");
            return;
        }

        const newUser = {
            fullname: formData.fullname.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone,
            password: formData.password
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful!");

        navigate("/login");
    };

    return (

        <div className="signup-container">

            <div className="signup-box">

                <div className="signup-icon">
                    <i className="bi bi-book-half"></i>
                </div>

                <h2>Create Account</h2>

                <p className="signup-subtitle">
                    Join us and explore our E-Library
                </p>

                {error && (
                    <div className="signup-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="signup-input-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="signup-input-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="signup-input-group">
                        <label>Phone Number</label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="signup-input-group">
                        <label>Password</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="signup-input-group">
                        <label>Confirm Password</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="show-password">

                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() =>
                                setShowPassword(!showPassword)
                            }
                        />

                        <label htmlFor="showPassword">
                            Show Password
                        </label>

                    </div>

                    <button type="submit" className="signup-btn">
                        Create Account
                        <i className="bi bi-arrow-right ms-2"></i>
                    </button>

                </form>

                <div className="login-link">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </div>

            </div>

        </div>
    );
}

export default Signup;
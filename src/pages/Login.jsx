import React, { useState } from 'react';
import {
    Link,
    useNavigate,
    useLocation
} from 'react-router-dom';

import './Login.css';

function Login({ onLogin }) {

    const navigate = useNavigate();
    const location = useLocation();

    // Remember the page the user originally wanted to visit
    const redirectPath = location.state?.from || '/';

    const [loginType, setLoginType] = useState('user');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');


    // Handle Input Changes
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError('');

    };


    // Handle Login
    const handleSubmit = (e) => {

        e.preventDefault();
        setError('');

        const email = formData.email.trim().toLowerCase();
        const password = formData.password;


        // ADMIN LOGIN
        if (loginType === 'admin') {

            const adminEmail = 'admin@elibrary.com';
            const adminPassword = 'Admin@123';

            if (
                email === adminEmail &&
                password === adminPassword
            ) {

                const adminData = {
                    fullname: 'Admin',
                    email: adminEmail,
                    role: 'admin'
                };

                // Update App login state
                onLogin(adminData);

                // Navigate to Admin Dashboard
                navigate('/admin', { replace: true });

            } else {

                setError('Invalid Admin Email or Password!');

            }

        }


        // USER LOGIN
        else {

            try {

                const registeredUsers = JSON.parse(
                    localStorage.getItem('users') || '[]'
                );

                const user = registeredUsers.find(
                    (item) =>
                        item.email?.toLowerCase() === email &&
                        item.password === password
                );

                if (user) {

                    const loggedInUser = {
                        fullname:
                            user.fullname ||
                            user.fullName ||
                            user.name ||
                            'User',

                        email: user.email,

                        role: 'user'
                    };

                    // Update App login state
                    onLogin(loggedInUser);

                    // Return to the originally requested page
                    navigate(redirectPath, {
                        replace: true
                    });

                } else {

                    setError(
                        'Invalid credentials! Please sign up first.'
                    );

                }

            } catch {

                setError('Unable to read registered user details.');

            }

        }

    };


    return (

        <section className="login-section">

            <div className="login-container">

                <div className="login-header">

                    <i className="bi bi-book-half"></i>

                    <h2>E-Library</h2>

                    <p>Welcome Back! Please Login</p>

                </div>


                {/* Login Type Selection */}
                <div className="login-tabs">

                    <button
                        type="button"
                        className={loginType === 'user' ? 'active' : ''}
                        onClick={() => {
                            setLoginType('user');
                            setError('');
                        }}
                    >
                        <i className="bi bi-person"></i>
                        User Login
                    </button>

                    <button
                        type="button"
                        className={loginType === 'admin' ? 'active' : ''}
                        onClick={() => {
                            setLoginType('admin');
                            setError('');
                        }}
                    >
                        <i className="bi bi-shield-lock"></i>
                        Admin Login
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="login-input-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Password */}
                    <div className="login-input-group">

                        <label>Password</label>

                        <div className="password-wrapper">

                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <i
                                className={`bi ${
                                    showPassword
                                        ? 'bi-eye-slash'
                                        : 'bi-eye'
                                }`}
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                role="button"
                            ></i>

                        </div>

                    </div>


                    {/* Error Message */}
                    {error && (

                        <p className="text-danger text-center">
                            {error}
                        </p>

                    )}


                    {/* Login Button */}
                    <button
                        type="submit"
                        className="login-submit-btn"
                    >
                        Login
                        <i className="bi bi-arrow-right ms-2"></i>
                    </button>

                </form>


                {/* Signup Link */}
                {loginType === 'user' && (

                    <div className="signup-link">

                        Don't have an account?

                        <Link to="/signup"> Sign Up</Link>

                    </div>

                )}

            </div>

        </section>

    );

}

export default Login;
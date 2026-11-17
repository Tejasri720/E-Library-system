import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ loggedInUser, onLogout }) {

    const navigate = useNavigate();

    // Logout Functionality
    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    // Get Logged-in User Name
    const userName =
        loggedInUser?.fullname ||
        loggedInUser?.fullName ||
        loggedInUser?.name ||
        'User';

    const isAdmin = loggedInUser?.role === 'admin';

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">

            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand fw-bold fs-3" to="/">
                    <i className="bi bi-book-half me-2 text-primary"></i>
                    E-Library
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                    aria-controls="navbarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="navbarMenu">

                    <ul className="navbar-nav mx-auto gap-lg-3">

                        {/* Home */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        {/* Categories */}
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/#featured-books"
                            >
                                Categories
                            </Link>
                        </li>

                        {/* Regular User Navigation */}
                        {!isAdmin && (
                            <>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/favourites"
                                    >
                                        <i className="bi bi-heart me-1"></i>
                                        Favourites
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/recently-viewed"
                                    >
                                        <i className="bi bi-clock-history me-1"></i>
                                        Recently Viewed
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/#about"
                                    >
                                        About Us
                                    </Link>
                                </li>

                            </>
                        )}

                        {/* Admin Navigation */}
                        {isAdmin && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/admin"
                                >
                                    <i className="bi bi-speedometer2 me-1"></i>
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}

                    </ul>

                    {/* Authentication Section */}
                    <div className="d-flex align-items-center gap-3 flex-wrap">

                        {loggedInUser ? (

                            <>

                                {/* Welcome Message */}
                                <span className="fw-semibold text-primary">
                                    <i className="bi bi-person-circle me-2"></i>
                                    Welcome, {userName}!
                                </span>

                                {/* Logout */}
                                <button
                                    className="btn btn-outline-danger px-4"
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Logout
                                </button>

                            </>

                        ) : (

                            <>

                                {/* Login */}
                                <Link
                                    to="/login"
                                    className="btn btn-outline-primary px-4"
                                >
                                    Login
                                </Link>

                                {/* Signup */}
                                <Link
                                    to="/signup"
                                    className="btn btn-primary px-4"
                                >
                                    Sign Up
                                </Link>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
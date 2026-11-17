import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {

    // Back to Top Functionality
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer-section">

            <div className="container">

                <div className="row g-4">

                    {/* Social Media */}
                    <div className="col-lg-6">
                        <div className="footer-card">

                            <h4>Our Social Media</h4>

                            <div className="footer-links">

                                <a href="https://www.facebook.com/"
                                   target="_blank" rel="noreferrer">
                                    <i className="bi bi-facebook"></i>
                                    Facebook
                                </a>

                                <a href="https://www.linkedin.com/"
                                   target="_blank" rel="noreferrer">
                                    <i className="bi bi-linkedin"></i>
                                    LinkedIn
                                </a>

                                <a href="https://www.instagram.com/"
                                   target="_blank" rel="noreferrer">
                                    <i className="bi bi-instagram"></i>
                                    Instagram
                                </a>

                                <a href="https://x.com/"
                                   target="_blank" rel="noreferrer">
                                    <i className="bi bi-twitter-x"></i>
                                    Twitter
                                </a>

                            </div>

                        </div>
                    </div>

                    {/* Explore Our Books */}
                    <div className="col-lg-6">
                        <div className="footer-card">

                            <h4>Explore Our Books</h4>

                            <div className="footer-links">

                                <Link to="/#books">
                                    <i className="bi bi-book"></i>
                                    All Books
                                </Link>

                                <Link to="/#categories">
                                    <i className="bi bi-grid"></i>
                                    Categories
                                </Link>

                                <Link to="/favourites">
                                    <i className="bi bi-heart"></i>
                                    Favourite Books
                                </Link>

                                <Link to="/recently-viewed">
                                    <i className="bi bi-clock-history"></i>
                                    Recently Viewed
                                </Link>

                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="footer-bottom">

                    <div className="footer-logo">
                        <i className="bi bi-book-half"></i>
                        E-Library
                    </div>

                    <p>
                        Discover knowledge, explore stories and enjoy reading.
                    </p>

                    <div className="footer-policy">
                        <a href="/#about">About Us</a>
                        <a href="/#contact">Contact Us</a>
                    </div>

                    <hr />

                    <p className="copyright">
                        © {new Date().getFullYear()} E-Library.
                        All Rights Reserved.
                    </p>

                    {/* Back to Top Button */}
                    <button
                        className="back-to-top"
                        onClick={handleBackToTop}
                    >
                        <i className="bi bi-arrow-up"></i>
                        Back to Top
                    </button>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
import React, { useState } from 'react';
import FeaturedBooks from '../components/FeaturedBooks';
import About from '../components/About';
import Contact from '../Contact.jsx';

function Home({ books = [], favourites, toggleFavourite }) {

    const [search, setSearch] = useState('');

    // Search Functionality
    const handleSearch = (e) => {
        e.preventDefault();

        document.getElementById('featured-books')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Explore Books Functionality
    const handleExplore = () => {
        setSearch('');

        document.getElementById('featured-books')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className="home">

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-lg-6 hero-content">

                            <span className="hero-badge">
                                <i className="bi bi-stars me-2"></i>
                                YOUR DIGITAL LIBRARY
                            </span>

                            <h1>
                                Discover a World of
                                <span> Knowledge & Stories</span>
                            </h1>

                            <p>
                                Explore thousands of books, discover new ideas
                                and enjoy reading anytime, anywhere.
                                Your next favourite book is just one click away!
                            </p>

                            {/* Search Bar */}
                            <form className="search-box" onSubmit={handleSearch}>

                                <i className="bi bi-search"></i>

                                <input
                                    type="text"
                                    placeholder="Search books, authors..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                <button type="submit">
                                    Search
                                </button>

                            </form>

                            {/* Explore Books Button */}
                            <button
                                className="btn explore-btn mt-4"
                                onClick={handleExplore}
                            >
                                Explore Books
                                <i className="bi bi-arrow-right ms-2"></i>
                            </button>

                            {/* Statistics */}
                            <div className="hero-stats">

                                <div>
                                    <h3>{books.length}+</h3>
                                    <p>Books</p>
                                </div>

                                <div>
                                    <h3>50+</h3>
                                    <p>Categories</p>
                                </div>

                                <div>
                                    <h3>Free</h3>
                                    <p>Reading</p>
                                </div>

                            </div>

                        </div>

                        {/* Right Content */}
                        <div className="col-lg-6 text-center">

                            <div className="hero-visual">

                                <div className="floating-icon icon-one">
                                    <i className="bi bi-book"></i>
                                </div>

                                <div className="book-showcase">
                                    <i className="bi bi-book-half"></i>
                                    <h2>Read More.</h2>
                                    <h2>Learn More.</h2>
                                    <p>Every book opens a new world.</p>
                                </div>

                                <div className="floating-icon icon-two">
                                    <i className="bi bi-bookmark-star"></i>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <FeaturedBooks
                books={books}
                searchTerm={search}
                favourites={favourites}
                toggleFavourite={toggleFavourite}
            />

            {/* About Us Section */}
            <About />

            {/* Contact Us Section */}
            <Contact />

        </div>
    );
}

export default Home;
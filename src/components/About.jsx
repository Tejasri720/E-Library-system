
import React from 'react';
import './About.css';

function About() {
    return (
        <section className="about-section" id="about">

            <div className="container">

                {/* Heading */}
                <div className="about-heading text-center">
                    <span>ABOUT US</span>

                    <h2>
                        Discover More About <span>E-Library</span>
                    </h2>

                    <p>
                        Your digital destination for discovering knowledge,
                        exploring stories and enjoying the world of reading.
                    </p>
                </div>

                {/* About Content */}
                <div className="row align-items-center about-content">

                    <div className="col-lg-6">
                        <div className="about-image">
                            <i className="bi bi-book-half"></i>
                            <h2>Read More.</h2>
                            <h2>Learn More.</h2>
                            <p>Every book opens a new world.</p>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="about-text">

                            <h3>Our Mission</h3>

                            <p>
                                Our mission is to make reading more accessible
                                and enjoyable by providing a simple digital
                                platform where readers can discover books,
                                explore different genres and gain knowledge.
                            </p>

                            <h3 className="mt-4">Why Choose Us?</h3>

                            <p>
                                We provide an easy-to-use digital library
                                that helps readers discover their next
                                favourite book anytime and anywhere.
                            </p>

                        </div>
                    </div>

                </div>

                {/* Features */}
                <div className="about-features">

                    <div className="about-feature-card">
                        <i className="bi bi-book"></i>
                        <h5>Large Collection</h5>
                        <p>Explore books from different genres and categories.</p>
                    </div>

                    <div className="about-feature-card">
                        <i className="bi bi-search"></i>
                        <h5>Easy Discovery</h5>
                        <p>Find books easily using search and category filters.</p>
                    </div>

                    <div className="about-feature-card">
                        <i className="bi bi-heart"></i>
                        <h5>Personal Favourites</h5>
                        <p>Save your favourite books and access them anytime.</p>
                    </div>

                    <div className="about-feature-card">
                        <i className="bi bi-clock-history"></i>
                        <h5>Recently Viewed</h5>
                        <p>Quickly revisit books you have explored before.</p>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;

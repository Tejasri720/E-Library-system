import React from 'react';
import { Link } from 'react-router-dom';

function Favourites({ favourites, toggleFavourite }) {

    return (

        <section className="featured-section">

            <div className="container">

                {/* Heading */}
                <div className="section-heading text-center">

                    <span>YOUR COLLECTION</span>

                    <h2>
                        My <span>Favourites</span>
                    </h2>

                    <p>
                        Your favourite books, all in one place.
                    </p>

                </div>

                {/* Favourite Books */}
                <div className="row g-4">

                    {favourites.map((book) => (

                        <div className="col-lg-3 col-md-6" key={book.id}>

                            <div className="book-card">

                                <div className="book-image">

                                    <img
                                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                                        alt={book.title}
                                    />

                                </div>

                                <div className="book-info">

                                    <span className="book-category">
                                        {book.category}
                                    </span>

                                    <h5>{book.title}</h5>

                                    <p>By {book.author}</p>

                                    <div className="book-rating">
                                        <i className="bi bi-star-fill"></i>
                                        <span>{book.rating}</span>
                                    </div>

                                    <Link
                                        to={`/books/${book.id}`}
                                        className="view-btn"
                                    >
                                        View Details
                                        <i className="bi bi-arrow-right ms-2"></i>
                                    </Link>

                                   <button
                                    className="remove-favourite-btn"
                                    onClick={() => toggleFavourite(book)}
                                >
                                    <i className="bi bi-heart-fill me-2"></i>
                                    Remove Favourite
                                </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Empty Favourites */}
                {favourites.length === 0 && (

                    <div className="text-center mt-5">

                        <i className="bi bi-heart fs-1 text-danger"></i>

                        <h4 className="mt-3">
                            No Favourite Books Yet!
                        </h4>

                        <p className="text-muted">
                            Explore our collection and add your favourite books.
                        </p>

                        <Link to="/#books" className="btn btn-primary mt-3">
                            Explore Books
                        </Link>

                    </div>

                )}

            </div>

        </section>

    );
}

export default Favourites;
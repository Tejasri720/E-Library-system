import React, { useState } from "react";
import { Link } from "react-router-dom";

function FeaturedBooks({
    books = [],
    searchTerm = "",
    favourites = [],
    toggleFavourite
}) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Fiction",
        "Classic",
        "Drama",
        "Science Fiction"
    ];

    // Filter books based on category and search
    const filteredBooks = books.filter((book) => {
        const matchesCategory =
            selectedCategory === "All" ||
            book.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
            book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Check whether a book is already in favourites
    const isFavourite = (bookId) => {
        return favourites.some(
            (fav) => String(fav.id) === String(bookId)
        );
    };

    return (
        <section className="container my-5" id="featured-books">

            {/* Section Heading */}
            <div className="text-center mb-4">
                <h2 className="fw-bold">Explore Our Books</h2>

                <p className="text-muted">
                    Discover your next favourite book from our collection.
                </p>
            </div>

            {/* Category Filters */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`btn ${
                            selectedCategory === category
                                ? "btn-primary"
                                : "btn-outline-primary"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Book Count */}
            <div className="mb-3">
                <h6 className="text-muted">
                    Showing {filteredBooks.length} of {books.length} books
                </h6>
            </div>

            {/* Books Display */}
            <div className="row g-4">

                {filteredBooks.length > 0 ? (

                    filteredBooks.map((book) => (

                        <div
                            className="col-lg-3 col-md-4 col-sm-6"
                            key={book.id}
                        >

                            <div className="card h-100 shadow-sm border-0">

                                {/* Book Cover */}
                                <div
                                    className="position-relative"
                                    style={{
                                        height: "280px",
                                        overflow: "hidden"
                                    }}
                                >

                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "contain",
                                            padding: "10px"
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null;

                                            e.target.src =
                                                "data:image/svg+xml;charset=UTF-8," +
                                                encodeURIComponent(`
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="200" height="280">
                                                        <rect width="100%" height="100%"
                                                            fill="#eeeeee"/>
                                                        <text x="50%" y="50%"
                                                            dominant-baseline="middle"
                                                            text-anchor="middle"
                                                            font-size="16"
                                                            fill="#555">
                                                            No Cover
                                                        </text>
                                                    </svg>
                                                `);
                                        }}
                                    />

                                    {/* Favourite Button */}
                                    <button
                                        type="button"
                                        className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                                        onClick={() =>
                                            toggleFavourite &&
                                            toggleFavourite(book)
                                        }
                                        title={
                                            isFavourite(book.id)
                                                ? "Remove from favourites"
                                                : "Add to favourites"
                                        }
                                    >
                                        <i
                                            className={`bi ${
                                                isFavourite(book.id)
                                                    ? "bi-heart-fill text-danger"
                                                    : "bi-heart"
                                            }`}
                                        ></i>
                                    </button>

                                </div>

                                {/* Book Details */}
                                <div className="card-body d-flex flex-column">

                                    <h5 className="card-title fw-bold">
                                        {book.title}
                                    </h5>

                                    <p className="text-muted mb-2">
                                        By {book.author}
                                    </p>

                                    <span className="badge bg-secondary align-self-start mb-2">
                                        {book.category}
                                    </span>

                                    <p className="mb-3">
                                        <i className="bi bi-star-fill text-warning"></i>
                                        {" "}
                                        {book.rating || "N/A"}
                                    </p>

                                    {/* View Details */}
                                    <Link
                                        to={`/books/${book.id}`}
                                        className="btn btn-primary mt-auto"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    /* No Books Found */
                    <div className="col-12 text-center py-5">

                        <i className="bi bi-book fs-1 text-muted"></i>

                        <h4 className="mt-3">
                            No Books Found!
                        </h4>

                        <p className="text-muted">
                            Try searching with a different title,
                            author, or category.
                        </p>

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => {
                                setSelectedCategory("All");
                            }}
                        >
                            Show All Books
                        </button>

                    </div>

                )}

            </div>

        </section>
    );
}

export default FeaturedBooks;
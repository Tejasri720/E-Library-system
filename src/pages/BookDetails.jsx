
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import books from '../data/books.json';

const FALLBACK_COVER =
    'https://placehold.co/400x550?text=Book+Cover';

function BookDetails() {

    const { id } = useParams();

    const book = books.find(
        (item) => item.id === Number(id)
    );

    const [cover, setCover] = useState(FALLBACK_COVER);

    // Fetch actual book cover
    useEffect(() => {

        let isMounted = true;

        async function fetchCover() {

            if (book?.cover) {
                setCover(book.cover);
            }

            if (!book) return;

            try {

                const params = new URLSearchParams({
                    title: book.title,
                    author: book.author,
                    fields: 'cover_i',
                    limit: '1'
                });

                const response = await fetch(
                    `https://openlibrary.org/search.json?${params}`
                );

                if (!response.ok) {
                    throw new Error('Cover not found');
                }

                const data = await response.json();

                const coverId = data.docs?.find(
                    (item) => item.cover_i
                )?.cover_i;

                if (isMounted && coverId) {
                    setCover(
                        `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                    );
                }

            } catch (error) {
                console.log('Unable to fetch cover:', error);
            }
        }

        fetchCover();

        return () => {
            isMounted = false;
        };

    }, [id]);

    if (!book) {
        return (
            <div className="container text-center mt-5">

                <h2>Book Not Found!</h2>

                <Link to="/" className="btn btn-primary mt-3">
                    Back to Home
                </Link>

            </div>
        );
    }

    // Convert Google Drive sharing link into preview URL
    const getDrivePreviewUrl = (url) => {

        if (!url) return '';

        const match = url.match(/\/file\/d\/([^/]+)/);

        if (match) {
            return `https://drive.google.com/file/d/${match[1]}/preview`;
        }

        return url;
    };

    const readerUrl = getDrivePreviewUrl(book.pdfLink);

    return (

        <section className="book-details-section">

            <div className="container">

                <Link to="/#books" className="back-btn">

                    <i className="bi bi-arrow-left"></i>
                    Back to Books

                </Link>

                <div className="row align-items-center mt-4">

                    {/* Book Cover */}
                    <div className="col-lg-5 text-center">

                        <div className="details-image">

                            <img
                                src={cover}
                                alt={`${book.title} book cover`}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = FALLBACK_COVER;
                                }}
                            />

                        </div>

                    </div>

                    {/* Book Information */}
                    <div className="col-lg-7">

                        <span className="book-category">
                            {book.category}
                        </span>

                        <h1 className="details-title">
                            {book.title}
                        </h1>

                        <h5 className="details-author">
                            By {book.author}
                        </h5>

                        <div className="details-rating">

                            <i className="bi bi-star-fill"></i>
                            {book.rating}

                        </div>

                        <h4 className="mt-4">
                            About This Book
                        </h4>

                        <p className="details-description">

                            {book.description ||
                                `${book.title} is a ${book.category} book written by ${book.author}. Explore this book and discover an interesting reading experience.`}

                        </p>

                        <hr />

                        {/* Additional Information */}
                        <h4 className="mb-3">
                            Book Information
                        </h4>

                        <div className="book-extra-details">

                            <p>
                                <strong>Book Title:</strong> {book.title}
                            </p>

                            <p>
                                <strong>Author:</strong> {book.author}
                            </p>

                            <p>
                                <strong>Category:</strong> {book.category}
                            </p>

                            <p>
                                <strong>ISBN:</strong> {book.isbn || 'Not Available'}
                            </p>

                            <p>
                                <strong>Rating:</strong> {book.rating} / 5
                            </p>

                            <p>
                                <strong>Publisher:</strong> {book.publisher || 'Not Available'}
                            </p>

                            <p>
                                <strong>Publication Year:</strong> {book.publicationYear || 'Not Available'}
                            </p>

                            <p>
                                <strong>Language:</strong> {book.language || 'English'}
                            </p>

                            <p>
                                <strong>Pages:</strong> {book.pages || 'Not Available'}
                            </p>

                        </div>

                        {/* Read Online Button */}
                        {readerUrl && (

                            <a
                                href={readerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-success mt-3 me-2"
                            >

                                <i className="bi bi-book-half me-2"></i>
                                Read Online

                            </a>

                        )}

                        <Link
                            to="/#books"
                            className="btn btn-primary mt-3"
                        >

                            <i className="bi bi-arrow-left me-2"></i>
                            Explore More Books

                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default BookDetails;

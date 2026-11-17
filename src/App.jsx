
import React, { useState, useEffect } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    useParams,
    Link,
    Navigate
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ManageBooks from './pages/ManageBooks';
import ManageUsers from './pages/ManageUsers';
import ManageMessages from './pages/ManageMessages';

import Footer from './Footer.jsx';

import books from './data/books.json';

import './App.css';


// ======================================
// PROTECTED ROUTE
// ======================================

function ProtectedRoute({ loggedInUser, children }) {

    const location = useLocation();

    if (!loggedInUser) {

        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );

    }

    return children;
}


// ======================================
// AUTOMATIC SCROLLING
// ======================================

function ScrollToHash() {

    const { pathname, hash } = useLocation();

    useEffect(() => {

        if (hash) {

            const timer = setTimeout(() => {

                const element = document.getElementById(
                    hash.substring(1)
                );

                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

            }, 100);

            return () => clearTimeout(timer);
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }, [pathname, hash]);

    return null;
}


// ======================================
// RECENTLY VIEWED BOOKS
// ======================================

function RecentlyViewed({ recentlyViewed }) {

    return (

        <section className="featured-section">

            <div className="container">

                <div className="section-heading text-center">

                    <span>YOUR READING HISTORY</span>

                    <h2>
                        Recently <span>Viewed Books</span>
                    </h2>

                    <p>
                        Continue exploring the books you recently opened.
                    </p>

                </div>

                {recentlyViewed.length === 0 ? (

                    <div className="text-center mt-5">

                        <i className="bi bi-clock-history fs-1 text-primary"></i>

                        <h4 className="mt-3">
                            No Recently Viewed Books
                        </h4>

                        <p className="text-muted">
                            Open a book to see it here.
                        </p>

                        <Link to="/" className="btn btn-primary mt-3">
                            Explore Books
                        </Link>

                    </div>

                ) : (

                    <div className="row g-4">

                        {recentlyViewed.map((book) => (

                            <div
                                className="col-lg-3 col-md-6"
                                key={book.id}
                            >

                                <div className="book-card">

                                    <div className="book-image">

                                        <img
                                            src={
                                                book.cover ||
                                                'https://placehold.co/300x450?text=Book+Cover'
                                            }
                                            alt={book.title}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src =
                                                    'https://placehold.co/300x450?text=Book+Cover';
                                            }}
                                        />

                                    </div>

                                    <div className="book-info">

                                        <span className="book-category">
                                            {book.category}
                                        </span>

                                        <h5>{book.title}</h5>

                                        <p>By {book.author}</p>

                                        <Link
                                            to={`/books/${book.id}`}
                                            className="view-btn"
                                        >
                                            View Details
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}


// ======================================
// TRACK RECENTLY VIEWED BOOKS
// ======================================

function TrackBookView({ addRecentlyViewed, books }) {

    const { id } = useParams();

    useEffect(() => {

        const selectedBook = books.find(
            (book) => String(book.id) === String(id)
        );

        if (selectedBook) {
            addRecentlyViewed(selectedBook);
        }

    }, [id, books]);

    return <BookDetails books={books} />;
}


// ======================================
// MAIN APP COMPONENT
// ======================================

function App() {

    // Logged-in User State
    const [loggedInUser, setLoggedInUser] = useState(() => {

        try {

            return JSON.parse(
                localStorage.getItem('loggedInUser')
            );

        } catch {

            return null;

        }

    });


    // Login Function
    const handleLogin = (userData) => {

        localStorage.setItem(
            'loggedInUser',
            JSON.stringify(userData)
        );

        setLoggedInUser(userData);

    };


    // Logout Function
    const handleLogout = () => {

        localStorage.removeItem('loggedInUser');

        setLoggedInUser(null);

    };


    // Shared Library Books State
    const [libraryBooks, setLibraryBooks] = useState(() => {

        try {

            const savedBooks = localStorage.getItem('adminBooks');

            return savedBooks
                ? JSON.parse(savedBooks)
                : books;

        } catch {

            return books;

        }

    });


    // Save Library Books
    useEffect(() => {

        localStorage.setItem(
            'adminBooks',
            JSON.stringify(libraryBooks)
        );

    }, [libraryBooks]);


    // Favourite Books
    const [favourites, setFavourites] = useState(() => {

        try {

            return JSON.parse(
                localStorage.getItem('favourites')
            ) || [];

        } catch {

            return [];

        }

    });


    // Recently Viewed Books
    const [recentlyViewed, setRecentlyViewed] = useState(() => {

        try {

            return JSON.parse(
                localStorage.getItem('recentlyViewed')
            ) || [];

        } catch {

            return [];

        }

    });


    // Save Favourites
    useEffect(() => {

        localStorage.setItem(
            'favourites',
            JSON.stringify(favourites)
        );

    }, [favourites]);


    // Save Recently Viewed Books
    useEffect(() => {

        localStorage.setItem(
            'recentlyViewed',
            JSON.stringify(recentlyViewed)
        );

    }, [recentlyViewed]);


    // Toggle Favourite
    const toggleFavourite = (book) => {

        const exists = favourites.some(
            (item) => String(item.id) === String(book.id)
        );

        if (exists) {

            setFavourites(
                favourites.filter(
                    (item) => String(item.id) !== String(book.id)
                )
            );

        } else {

            setFavourites([...favourites, book]);

        }

    };


    // Add Recently Viewed Book
    const addRecentlyViewed = (book) => {

        setRecentlyViewed((previous) => {

            const updatedList = previous.filter(
                (item) => String(item.id) !== String(book.id)
            );

            return [book, ...updatedList].slice(0, 8);

        });

    };


    return (

        <BrowserRouter>

            <ScrollToHash />

            {/* NAVBAR */}
            <Navbar
                loggedInUser={loggedInUser}
                onLogout={handleLogout}
            />


            <Routes>


                {/* =================================
                    PUBLIC HOME PAGE
                ================================= */}

                <Route
                    path="/"
                    element={
                        <Home
                            books={libraryBooks}
                            favourites={favourites}
                            toggleFavourite={toggleFavourite}
                        />
                    }
                />


                {/* =================================
                    LOGIN PAGE
                ================================= */}

                <Route
                    path="/login"
                    element={
                        <Login
                            onLogin={handleLogin}
                        />
                    }
                />


                {/* =================================
                    SIGNUP PAGE
                ================================= */}

                <Route
                    path="/signup"
                    element={<Signup />}
                />


                {/* =================================
                    ADMIN DASHBOARD
                ================================= */}

                <Route
                    path="/admin"
                    element={
                        <AdminDashboard
                            loggedInUser={loggedInUser}
                        />
                    }
                />

                <Route
                    path="/admin-dashboard"
                    element={
                        <AdminDashboard
                            loggedInUser={loggedInUser}
                        />
                    }
                />


                {/* =================================
                    MANAGE BOOKS
                ================================= */}

                <Route
                    path="/admin/manage-books"
                    element={
                        <ManageBooks
                            books={libraryBooks}
                            setBooks={setLibraryBooks}
                        />
                    }
                />


                {/* =================================
                    MANAGE USERS
                ================================= */}

                <Route
                    path="/admin/manage-users"
                    element={<ManageUsers />}
                />


                {/* =================================
                    CONTACT MESSAGES
                ================================= */}

                <Route
                    path="/admin/contact-messages"
                    element={<ManageMessages />}
                />


                {/* =================================
                    PROTECTED BOOK DETAILS
                ================================= */}

                <Route
                    path="/books/:id"
                    element={
                        <ProtectedRoute loggedInUser={loggedInUser}>

                            <TrackBookView
                                books={libraryBooks}
                                addRecentlyViewed={addRecentlyViewed}
                            />

                        </ProtectedRoute>
                    }
                />


                {/* =================================
                    PROTECTED FAVOURITES
                ================================= */}

                <Route
                    path="/favourites"
                    element={
                        <ProtectedRoute loggedInUser={loggedInUser}>

                            <Favourites
                                favourites={favourites}
                                toggleFavourite={toggleFavourite}
                            />

                        </ProtectedRoute>
                    }
                />


                {/* =================================
                    PROTECTED RECENTLY VIEWED
                ================================= */}

                <Route
                    path="/recently-viewed"
                    element={
                        <ProtectedRoute loggedInUser={loggedInUser}>

                            <RecentlyViewed
                                recentlyViewed={recentlyViewed}
                            />

                        </ProtectedRoute>
                    }
                />


                {/* =================================
                    PAGE NOT FOUND
                ================================= */}

                <Route
                    path="*"
                    element={

                        <div className="container text-center py-5">

                            <h2>404 - Page Not Found</h2>

                            <Link
                                to="/"
                                className="btn btn-primary mt-3"
                            >
                                Back to Home
                            </Link>

                        </div>

                    }
                />

            </Routes>


            {/* FOOTER */}
            <Footer />

        </BrowserRouter>

    );

}

export default App;

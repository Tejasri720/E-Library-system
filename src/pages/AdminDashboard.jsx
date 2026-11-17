
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {

    const navigate = useNavigate();

    // Navigation Functionality
    const handleNavigation = (path) => {
        navigate(path);
    };

    // Keyboard Navigation
    const handleKeyDown = (e, path) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNavigation(path);
        }
    };

    return (
        <section className="container py-5">

            {/* Dashboard Header */}
            <div className="mb-4">

                <h2>Admin Dashboard</h2>

                <p className="text-muted">
                    Welcome to the E-Library Admin Panel!
                </p>

            </div>

            <div className="row g-4">

                {/* Manage Books */}
                <div className="col-md-4">

                    <div
                        className="card shadow-sm p-4 h-100"
                        role="button"
                        tabIndex={0}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            handleNavigation('/admin/manage-books')
                        }
                        onKeyDown={(e) =>
                            handleKeyDown(e, '/admin/manage-books')
                        }
                    >

                        <i className="bi bi-book fs-1 text-primary"></i>

                        <h4 className="mt-3">
                            Manage Books
                        </h4>

                        <p>
                            Add, edit, delete and search library books.
                        </p>

                        <span className="text-primary fw-semibold">
                            Manage Books →
                        </span>

                    </div>

                </div>

                {/* Manage Users */}
                <div className="col-md-4">

                    <div
                        className="card shadow-sm p-4 h-100"
                        role="button"
                        tabIndex={0}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            handleNavigation('/admin/manage-users')
                        }
                        onKeyDown={(e) =>
                            handleKeyDown(e, '/admin/manage-users')
                        }
                    >

                        <i className="bi bi-people fs-1 text-primary"></i>

                        <h4 className="mt-3">
                            Manage Users
                        </h4>

                        <p>
                            View, search and delete registered library users.
                        </p>

                        <span className="text-primary fw-semibold">
                            Manage Users →
                        </span>

                    </div>

                </div>

                {/* Contact Messages */}
                <div className="col-md-4">

                    <div
                        className="card shadow-sm p-4 h-100"
                        role="button"
                        tabIndex={0}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            handleNavigation('/admin/contact-messages')
                        }
                        onKeyDown={(e) =>
                            handleKeyDown(e, '/admin/contact-messages')
                        }
                    >

                        <i className="bi bi-envelope fs-1 text-primary"></i>

                        <h4 className="mt-3">
                            Contact Messages
                        </h4>

                        <p>
                            View, search, read and delete contact messages.
                        </p>

                        <span className="text-primary fw-semibold">
                            View Messages →
                        </span>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ManageUsers() {

    const [users, setUsers] = useState(() => {

        try {
            return JSON.parse(localStorage.getItem('users')) || [];
        } catch {
            return [];
        }

    });

    const [search, setSearch] = useState('');

    // Save users whenever the list changes
    useEffect(() => {

        localStorage.setItem('users', JSON.stringify(users));

    }, [users]);


    // Delete User
    const handleDelete = (email) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this user?'
        );

        if (!confirmDelete) return;

        const updatedUsers = users.filter(
            user => user.email !== email
        );

        setUsers(updatedUsers);

        alert('User deleted successfully!');

    };


    // Search Users
    const filteredUsers = users.filter(user =>

        user.fullname?.toLowerCase().includes(search.toLowerCase()) ||

        user.email?.toLowerCase().includes(search.toLowerCase()) ||

        user.phone?.includes(search)

    );


    return (

        <section className="container py-5">

            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold">
                        Manage Users
                    </h2>

                    <p className="text-muted">
                        View and manage registered E-Library users.
                    </p>
                </div>

                <Link
                    to="/admin"
                    className="btn btn-outline-primary"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Dashboard
                </Link>

            </div>


            {/* Total Users */}
            <div className="card shadow-sm border-0 mb-4 p-3">

                <div className="d-flex align-items-center">

                    <i className="bi bi-people fs-1 text-primary me-3"></i>

                    <div>
                        <h3 className="mb-0">
                            {users.length}
                        </h3>

                        <p className="text-muted mb-0">
                            Total Registered Users
                        </p>
                    </div>

                </div>

            </div>


            {/* Search */}
            <div className="mb-4">

                <div className="input-group">

                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name, email or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>


            {/* Users Table */}
            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-primary">

                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredUsers.length > 0 ? (

                                    filteredUsers.map((user, index) => (

                                        <tr key={user.email}>

                                            <td>{index + 1}</td>

                                            <td>
                                                <i className="bi bi-person-circle me-2 text-primary"></i>
                                                {user.fullname}
                                            </td>

                                            <td>{user.email}</td>

                                            <td>{user.phone}</td>

                                            <td>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(user.email)}
                                                >
                                                    <i className="bi bi-trash me-1"></i>
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td colSpan="5" className="text-center py-4">

                                            <i className="bi bi-person-x fs-1 text-muted"></i>

                                            <h5 className="mt-2">
                                                No Users Found
                                            </h5>

                                            <p className="text-muted mb-0">
                                                {search
                                                    ? 'Try another search term.'
                                                    : 'No users have registered yet.'}
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default ManageUsers;
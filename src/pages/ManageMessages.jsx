import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ManageMessages() {

    const [messages, setMessages] = useState(() => {

        try {
            return JSON.parse(
                localStorage.getItem('contactMessages')
            ) || [];
        } catch {
            return [];
        }

    });

    const [search, setSearch] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Save messages
    useEffect(() => {

        localStorage.setItem(
            'contactMessages',
            JSON.stringify(messages)
        );

    }, [messages]);


    // Mark as Read
    const markAsRead = (id) => {

        const updatedMessages = messages.map((msg) =>

            msg.id === id
                ? { ...msg, status: 'Read' }
                : msg

        );

        setMessages(updatedMessages);

    };


    // Delete Message
    const deleteMessage = (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this message?'
        );

        if (!confirmDelete) return;

        setMessages(
            messages.filter((msg) => msg.id !== id)
        );

        if (selectedMessage?.id === id) {
            setSelectedMessage(null);
        }

    };


    // Search Messages
    const filteredMessages = messages.filter((msg) =>

        msg.name?.toLowerCase().includes(search.toLowerCase()) ||
        msg.email?.toLowerCase().includes(search.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(search.toLowerCase())

    );


    const unreadCount = messages.filter(
        msg => msg.status !== 'Read'
    ).length;


    return (

        <section className="container py-5">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold">
                        Contact Messages
                    </h2>

                    <p className="text-muted">
                        View and manage messages from library visitors.
                    </p>
                </div>

                <Link to="/admin" className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Dashboard
                </Link>

            </div>


            {/* Statistics */}
            <div className="row g-3 mb-4">

                <div className="col-md-6">

                    <div className="card shadow-sm border-0 p-3">

                        <h3>{messages.length}</h3>

                        <p className="text-muted mb-0">
                            Total Messages
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow-sm border-0 p-3">

                        <h3 className="text-danger">
                            {unreadCount}
                        </h3>

                        <p className="text-muted mb-0">
                            Unread Messages
                        </p>

                    </div>

                </div>

            </div>


            {/* Search */}
            <div className="input-group mb-4">

                <span className="input-group-text">
                    <i className="bi bi-search"></i>
                </span>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email or subject..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            {/* Messages Table */}
            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-primary">

                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredMessages.length > 0 ? (

                                    filteredMessages.map((msg, index) => (

                                        <tr key={msg.id}>

                                            <td>{index + 1}</td>

                                            <td>{msg.name}</td>

                                            <td>{msg.email}</td>

                                            <td>{msg.subject}</td>

                                            <td>{msg.submittedAt}</td>

                                            <td>

                                                <span className={`badge ${
                                                    msg.status === 'Read'
                                                        ? 'bg-success'
                                                        : 'bg-warning text-dark'
                                                }`}>
                                                    {msg.status || 'Unread'}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="d-flex gap-2">

                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => {
                                                            setSelectedMessage(msg);
                                                            markAsRead(msg.id);
                                                        }}
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => deleteMessage(msg.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="7" className="text-center py-4">

                                            <i className="bi bi-envelope-open fs-1 text-muted"></i>

                                            <h5 className="mt-2">
                                                No Messages Found
                                            </h5>

                                            <p className="text-muted mb-0">
                                                Submit a message through the Contact Us form.
                                            </p>

                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* Message Details Modal */}
            {selectedMessage && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={() => setSelectedMessage(null)}
                >

                    <div
                        className="modal-dialog modal-dialog-centered"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Message Details
                                </h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setSelectedMessage(null)}
                                ></button>

                            </div>

                            <div className="modal-body">

                                <p>
                                    <strong>Name:</strong> {selectedMessage.name}
                                </p>

                                <p>
                                    <strong>Email:</strong> {selectedMessage.email}
                                </p>

                                <p>
                                    <strong>Subject:</strong> {selectedMessage.subject}
                                </p>

                                <p>
                                    <strong>Date:</strong> {selectedMessage.submittedAt}
                                </p>

                                <hr />

                                <h6>Message:</h6>

                                <p style={{ whiteSpace: 'pre-wrap' }}>
                                    {selectedMessage.message}
                                </p>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedMessage(null)}
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </section>

    );

}

export default ManageMessages;
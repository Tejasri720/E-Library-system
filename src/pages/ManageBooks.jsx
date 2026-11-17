import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import initialBooks from '../data/books.json';

function ManageBooks() {

    const [books, setBooks] = useState(() => {
        try {
            const savedBooks = localStorage.getItem('adminBooks');
            return savedBooks ? JSON.parse(savedBooks) : initialBooks;
        } catch {
            return initialBooks;
        }
    });

    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const emptyBook = {
        title: '',
        author: '',
        category: 'Fiction',
        rating: 4.5,
        description: '',
        publicationYear: '',
        language: 'English',
        cover: '',
        pdfLink: ''
    };

    const [formData, setFormData] = useState(emptyBook);

    // Save books in Local Storage
    useEffect(() => {
        localStorage.setItem('adminBooks', JSON.stringify(books));
    }, [books]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Add or Update Book
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId !== null) {

            const updatedBooks = books.map((book) =>
                book.id === editId
                    ? {
                        ...formData,
                        id: editId,
                        rating: Number(formData.rating),
                        publicationYear: Number(formData.publicationYear)
                    }
                    : book
            );

            setBooks(updatedBooks);
            alert('Book updated successfully!');

        } else {

            const newBook = {
                ...formData,
                id: books.length
                    ? Math.max(...books.map(book => Number(book.id))) + 1
                    : 1,
                rating: Number(formData.rating),
                publicationYear: Number(formData.publicationYear)
            };

            setBooks([...books, newBook]);
            alert('Book added successfully!');
        }

        setFormData(emptyBook);
        setEditId(null);
        setShowForm(false);
    };

    // Edit Book
    const handleEdit = (book) => {

        setFormData({
            ...book,
            rating: book.rating,
            publicationYear: book.publicationYear
        });

        setEditId(book.id);
        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Delete Book
    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this book?'
        );

        if (confirmDelete) {
            setBooks(books.filter(book => book.id !== id));
        }
    };

    // Search Books
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <section className="container py-5">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

                <div>
                    <h2 className="fw-bold">Manage Books</h2>

                    <p className="text-muted">
                        Add, update, search and manage library books.
                    </p>
                </div>

                <Link
                    to="/admin"
                    className="btn btn-outline-primary"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Dashboard
                </Link>

            </div>

            {/* Statistics */}
            <div className="card shadow-sm p-3 mb-4">

                <h5 className="mb-1">Total Books</h5>

                <h2 className="text-primary fw-bold">
                    {books.length}
                </h2>

            </div>

            {/* Search and Add */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: '350px' }}
                    placeholder="Search by book title or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setFormData(emptyBook);
                        setEditId(null);
                        setShowForm(!showForm);
                    }}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Book
                </button>

            </div>

            {/* Add / Edit Form */}
            {showForm && (

                <div className="card shadow-sm p-4 mb-4">

                    <h4 className="mb-4">
                        {editId !== null ? 'Edit Book' : 'Add New Book'}
                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Book Title</label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Author</label>

                                <input
                                    type="text"
                                    name="author"
                                    className="form-control"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Category</label>

                                <select
                                    name="category"
                                    className="form-select"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option>Fiction</option>
                                    <option>Classic</option>
                                    <option>Drama</option>
                                    <option>Science Fiction</option>
                                    <option>Biography</option>
                                    <option>Technology</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Rating</label>

                                <input
                                    type="number"
                                    name="rating"
                                    className="form-control"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Publication Year</label>

                                <input
                                    type="number"
                                    name="publicationYear"
                                    className="form-control"
                                    value={formData.publicationYear}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Language</label>

                                <input
                                    type="text"
                                    name="language"
                                    className="form-control"
                                    value={formData.language}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Book Cover URL</label>

                                <input
                                    type="url"
                                    name="cover"
                                    className="form-control"
                                    value={formData.cover}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Description</label>

                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">PDF / Drive Link</label>

                                <input
                                    type="url"
                                    name="pdfLink"
                                    className="form-control"
                                    value={formData.pdfLink}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="mt-4 d-flex gap-2">

                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                {editId !== null ? 'Update Book' : 'Save Book'}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditId(null);
                                    setFormData(emptyBook);
                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}

            {/* Books Table */}
            <div className="card shadow-sm">

                <div className="card-body">

                    <h4 className="mb-3">Available Books</h4>

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover align-middle">

                            <thead className="table-primary">

                                <tr>
                                    <th>ID</th>
                                    <th>Cover</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Year</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredBooks.length > 0 ? (

                                    filteredBooks.map((book) => (

                                        <tr key={book.id}>

                                            <td>{book.id}</td>

                                            <td>
                                                <img
                                                    src={book.cover || 'https://placehold.co/60x80'}
                                                    alt={book.title}
                                                    style={{
                                                        width: '50px',
                                                        height: '65px',
                                                        objectFit: 'cover'
                                                    }}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = 'https://placehold.co/60x80';
                                                    }}
                                                />
                                            </td>

                                            <td>{book.title}</td>

                                            <td>{book.author}</td>

                                            <td>{book.category}</td>

                                            <td>{book.publicationYear}</td>

                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-2 mb-1"
                                                    onClick={() => handleEdit(book)}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm mb-1"
                                                    onClick={() => handleDelete(book.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="7" className="text-center py-4">
                                            No books found.
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

export default ManageBooks;
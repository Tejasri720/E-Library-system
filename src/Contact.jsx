import React, { useState } from 'react';
import './Contact.css';

function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Submit Contact Message
    const handleSubmit = (e) => {
        e.preventDefault();

        try {

            // Get existing messages
            const existingMessages =
                JSON.parse(localStorage.getItem('contactMessages')) || [];

            // Create new message
            const newMessage = {
                id: Date.now(),
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                subject: formData.subject.trim(),
                message: formData.message.trim(),
                submittedAt: new Date().toLocaleString(),
                status: 'Unread'
            };

            // Add new message
            const updatedMessages = [
                ...existingMessages,
                newMessage
            ];

            // Save messages
            localStorage.setItem(
                'contactMessages',
                JSON.stringify(updatedMessages)
            );

            alert('Thank you! Your message has been submitted successfully.');

            // Clear form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

        } catch (error) {

            alert('Unable to submit your message. Please try again.');

            console.error('Contact form error:', error);

        }
    };

    return (

        <section className="contact-section" id="contact">

            <div className="container">

                {/* Heading */}
                <div className="contact-heading text-center">

                    <span>CONTACT US</span>

                    <h2>
                        Get In <span>Touch</span>
                    </h2>

                    <p>
                        Have questions or suggestions?
                        We'd love to hear from you!
                    </p>

                </div>

                <div className="row g-4">

                    {/* Contact Information */}
                    <div className="col-lg-5">

                        <div className="contact-info">

                            <h3>Let's Connect</h3>

                            <p>
                                Feel free to contact us for any queries,
                                suggestions or feedback about our E-Library.
                            </p>

                            <div className="contact-item">

                                <i className="bi bi-envelope-fill"></i>

                                <div>
                                    <h5>Email</h5>
                                    <p>contact@elibrary.example</p>
                                </div>

                            </div>

                            <div className="contact-item">

                                <i className="bi bi-telephone-fill"></i>

                                <div>
                                    <h5>Phone</h5>
                                    <p>Contact information coming soon</p>
                                </div>

                            </div>

                            <div className="contact-item">

                                <i className="bi bi-geo-alt-fill"></i>

                                <div>
                                    <h5>Location</h5>
                                    <p>Online Digital Library</p>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Contact Form */}
                    <div className="col-lg-7">

                        <div className="contact-form">

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label>Your Name</label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Email Address</label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="mb-3">

                                    <label>Subject</label>

                                    <input
                                        type="text"
                                        name="subject"
                                        className="form-control"
                                        placeholder="Enter subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="mb-3">

                                    <label>Your Message</label>

                                    <textarea
                                        name="message"
                                        className="form-control"
                                        rows="5"
                                        placeholder="Write your message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>

                                </div>


                                <button
                                    type="submit"
                                    className="contact-btn"
                                >
                                    Send Message
                                    <i className="bi bi-send ms-2"></i>
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Contact;
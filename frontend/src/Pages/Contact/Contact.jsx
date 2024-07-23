import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setResponseMessage(result.message);
        } catch (error) {
            setResponseMessage('Failed to send message.');
        }
    };

    return (
        <div>
            <Header />
            {/* Breadcrumb Start */}
            <div className="container-fluid" style={{ marginTop: "30vh" }}>
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                            <span className="breadcrumb-item active">Contact</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Contact Start */}
            <div className="container-fluid">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                    <span className="bg-secondary pr-3">Contact Us</span>
                </h2>
                <div className="row px-xl-5">
                    <div className="col-lg-7 mb-5">
                        <div className="contact-form bg-light p-30">
                            <div id="success"></div>
                            <form name="sentMessage" id="contactForm" noValidate="novalidate" onSubmit={handleSubmit}>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Your Name"
                                        required="required"
                                        data-validation-required-message="Please enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Your Email"
                                        required="required"
                                        data-validation-required-message="Please enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        placeholder="Subject"
                                        required="required"
                                        data-validation-required-message="Please enter a subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <textarea
                                        className="form-control"
                                        rows="8"
                                        id="message"
                                        placeholder="Message"
                                        required="required"
                                        data-validation-required-message="Please enter your message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-primary py-2 px-4"
                                        type="submit"
                                        id="sendMessageButton"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                            {responseMessage && (
                                <div className="alert alert-info mt-3">{responseMessage}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-5 mb-5">
                        <div className="bg-light p-30 mb-30">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                                frameBorder="0"
                                style={{ border: 0, width: '100%', height: '250px' }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            ></iframe>
                        </div>
                        <div className="bg-light p-30 mb-3">
                            <p className="mb-2">
                                <i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-envelope text-primary mr-3"></i>info@example.com
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
            <Footer />
        </div>
    );
}

export default Contact;

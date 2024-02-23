import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Mail() {
    const [senderEmail, setSenderEmail] = useState('');
    const [query, setQuery] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8000/mail', { senderEmail, query });
            setSubmissionStatus('success');
            setSenderEmail('');
            setQuery('');
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmissionStatus('error');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1 className="mb-4">Contact Admin</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="senderEmail">Your Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="senderEmail"
                            name="senderEmail"
                            value={senderEmail}
                            onChange={(e) => setSenderEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="query">Enter your query:</label>
                        <textarea
                            className="form-control"
                            id="query"
                            name="query"
                            rows="4"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary m-2">Submit</button>
                </form>
                {submissionStatus === 'success' && (
                    <div className="alert alert-success mt-3">Email sent successfully!</div>
                )}
                {submissionStatus === 'error' && (
                    <div className="alert alert-danger mt-3">
                        Error sending email. Please try again later.
                    </div>
                )}
            </div>
        </>
    );
}

export default Mail;

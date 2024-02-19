import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Data() {
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const [form, setForm] = useState({
        name: '',
        surname: '',
        mobile: '',
        age: '',
        city: '',
        email: '',
        profession: '',
        nickname: '',
        hobbies: '',
    });
    const [mobileNumbers, setMobileNumbers] = useState([]);

    const handleSubit = async (e) => {
        e.preventDefault();
        const { name, surname, age, mobile, city, email, profession, nickname, hobbies } = form;

        if (!/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        if (parseInt(age, 10) <= 0) {
            alert('Please enter a valid age greater than 0');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (mobileNumbers.includes(mobile)) {
            alert('Mobile number already exists');
            return;
        }

        console.log(name, surname, age, mobile, city, email, profession, nickname, hobbies);

        try {
            const response = await axios.post('http://localhost:8000/ipdata', form);
            if (response.status === 200) {
                alert('Data and file uploaded successfully');
            }
            setMobileNumbers([...mobileNumbers, mobile]);
        } catch (error) {
            console.log(error);
        }

        setForm({
            name: '',
            surname: '',
            mobile: '',
            age: '',
            city: '',
            email: '',
            profession: '',
            nickname: '',
            hobbies: '',
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (permissions.includes('N')) {
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4">Input Data</h1>
                <div className="alert alert-danger" role="alert">
                    <h3>You do not have permission to access this page.</h3>
                </div>
            </div>
        );
    }
    return (<>
        <div className="container mt-5" style={{ height: "100vh" }}>
           <div>
                <button style={{ background: "green", color: "white", width: "100px", height: "50px", borderRadius: "12px", marginLeft: "1160px" }} > <Link to="/edata" style={{ color: "white", textDecoration: "none" }}>Database</Link> </button>
                <div className="card" style={{ width: "60%", marginLeft: "10px", marginTop: "-70px" }}>
                    <div className="card-body">
                        <form onSubmit={handleSubit}>
                            <h1 className="text-center mb-4">Input Data</h1>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type='text' className="form-control" name='name' value={form.name} onChange={handleChange} style={{ background: "#280c0c08" }} />
                            </div>
                            <div className="form-group">
                                <label>Surname:</label>
                                <input type='text' className="form-control" name='surname' value={form.surname} onChange={handleChange} style={{ background: "#280c0c08" }} />
                            </div>
                            <div className="form-group">
                                <label>Moblie No:</label>
                                <input type='number' className="form-control" name='mobile' value={form.mobile} onChange={handleChange} style={{ background: "#280c0c08" }} />
                            </div>
                            <div className="form-group">
                                <label>Age:</label>
                                <input type='number' className="form-control" name='age' value={form.age} onChange={handleChange} style={{ background: "#280c0c08" }} />
                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input type='text' className="form-control" name='city' value={form.city} onChange={handleChange} style={{ background: "#280c0c08" }} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type='email' className="form-control" name='email' value={form.email} onChange={handleChange} style={{ background: "#280c0c08" }} required />
                            </div>
                            <div className="form-group">
                                <label>Profession:</label>
                                <input type='text' className="form-control" name='profession' value={form.profession} onChange={handleChange} style={{ background: "#280c0c08" }} />
                            </div>
                            <div className="form-group">
                                <label>Nickname:</label>
                                <input type='text' className="form-control" name='nickname' value={form.nickname} onChange={handleChange} style={{ background: "#280c0c08" }} />
                            </div>
                            <div className="form-group">
                                <label>Hobbies:</label>
                                <input type='text' className="form-control" name='hobbies' value={form.hobbies} onChange={handleChange} style={{ background: "#280c0c08" }} />
                            </div>
                            <button type='submit' className="btn btn-primary btn-block" style={{
                                justifyContent: "center", marginLeft: "350px",
                                marginTop: " 12px",
                                padding: "12px"
                            }}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default Data;
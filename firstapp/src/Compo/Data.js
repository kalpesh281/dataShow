import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Data() {
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

    const handleSubit = async (e) => {
        e.preventDefault();
        const { name, surname, age, mobile, city, email, profession, nickname, hobbies } = form;

        if (name === '' || surname === '' || email === '' || age === '' || mobile === '' || city === '' || profession === '' || nickname === '' || hobbies === '') {
            alert('Please enter all the data first');
            return;
        }

        console.log(name, surname, age, mobile, city, email, profession, nickname, hobbies);

        try {
            const response = await axios.post('http://localhost:8000/ipdata', form);
            if (response.status === 200) {
                alert('Data and file uploaded successfully');
            }
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

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubit}>
                        <h1 className="text-center mb-4">Input Data</h1>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type='text' className="form-control" name='name' value={form.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Surname:</label>
                            <input type='text' className="form-control" name='surname' value={form.surname} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Moblie No:</label>
                            <input type='number' className="form-control" name='mobile' value={form.mobile} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type='number' className="form-control" name='age' value={form.age} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>City:</label>
                            <input type='text' className="form-control" name='city' value={form.city} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type='email' className="form-control" name='email' value={form.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Profession:</label>
                            <input type='text' className="form-control" name='profession' value={form.profession} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Nickname:</label>
                            <input type='text' className="form-control" name='nickname' value={form.nickname} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Hobbies:</label>
                            <input type='text' className="form-control" name='hobbies' value={form.hobbies} onChange={handleChange} />
                        </div>
                        <button type='submit' className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Data;

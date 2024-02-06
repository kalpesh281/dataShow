import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Database = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/ipdata/all');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className=" mb-4">Data from Database</h1>
            <div className="shadow p-3 mb-5 bg-white rounded">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Mobile</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Email</th>
                            <th>Profession</th>
                            <th>Nickname</th>
                            <th>Hobbies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.mobile}</td>
                                <td>{item.age}</td>
                                <td>{item.city}</td>
                                <td>{item.email}</td>
                                <td>{item.profession}</td>
                                <td>{item.nickname}</td>
                                <td>{item.hobbies}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Database;

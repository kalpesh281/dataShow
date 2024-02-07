import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Database = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const [filteredData, setFilteredData] = useState([]);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const entriesPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/ipdata/all');
                setData(response.data.map((item, index) => ({ ...item, key: index + 1 })));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };


    const handleSearch = () => {
        setIsSearchPerformed(true);

        const searchTerms = searchTerm.toLowerCase().trim();

        if (searchTerms.length === 0) {
            
            setFilteredData([]);
            return;
        }
        const fieldValues = searchTerms.split(',');
        // const searchableFields = ['name', 'surname', 'mobile', 'age', 'city', 'email', 'profession', 'nickname', 'hobbies'];

        const searchObject = {};
        fieldValues.forEach((pair) => {
            const [field, value] = pair.split('=');
            if (field && value) {
                searchObject[field.trim()] = value.trim();
            }
        });
        setFilteredData(
            data.filter((item) => {
                return Object.keys(searchObject).every((field) =>
                    item[field] &&
                    item[field].toString().toLowerCase().includes(searchObject[field])
                );
            })
        )
    };

    const offset = currentPage * entriesPerPage;
    const allDataEntries = isSearchPerformed ? filteredData : data;
    const currentPageData = allDataEntries.slice(offset, offset + entriesPerPage);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Data from Database</h1>
            <div className="shadow p-3 mb-5 bg-white rounded table-responsive" style={{ maxHeight: '78vh' }}>
                <div className="mb-3" >
                    <label className="form-label">Search:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search here...."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}

                    />
                    <button className="btn btn-primary ml-2" onClick={handleSearch} style={{ margin: "8px" }}>
                        Search
                    </button>
                </div>

                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>No</th>
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
                        {currentPageData.map((item) => (
                            <tr key={item._id}>
                                <td>{item.key}</td>
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
                <div style={{ marginLeft: '500px', padding: '5px' }}>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={Math.ceil(allDataEntries.length / entriesPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageLinkClassName={'page-link'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Database;

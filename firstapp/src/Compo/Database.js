import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

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
                const indexedData = response.data.map((item, index) => ({ ...item, key: index + 1 }));
                setData(indexedData);
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

        const conditions = searchTerms.split(',');

        const searchObject = {};
        conditions.forEach((condition) => {
            const [field, operator, value] = condition.split(/([><=]+)/).map((str) => str.trim());

            if (field && operator && value) {
                if (field.toLowerCase() === 'nickname' || field.toLowerCase() === 'hobbies') {
                    const values = value.split(',').map((v) => v.trim());
                    searchObject[field] = { operator, values };
                } else {
                    searchObject[field] = { operator, value };
                }
            }
        });

        setFilteredData(
            data.filter((item) => {
                // eslint-disable-next-line array-callback-return
                return Object.keys(searchObject).every((field) => {
                    const itemValue = item[field] && item[field].toString().toLowerCase();

                    if (Array.isArray(searchObject[field].values)) {
                        return searchObject[field].values.some((val) => itemValue.includes(val));
                    } else {
                        if (searchObject[field].operator === '>') {
                            return parseFloat(itemValue) > parseFloat(searchObject[field].value);
                        } else if (searchObject[field].operator === '<') {
                            return parseFloat(itemValue) < parseFloat(searchObject[field].value);
                        } else if (searchObject[field].operator === '=') {
                            return itemValue === searchObject[field].value;
                        }
                    }
                });
            })
        );
    };

    const offset = currentPage * entriesPerPage;
    const allDataEntries = isSearchPerformed ? filteredData : data;
    const currentPageData = allDataEntries.slice(offset, offset + entriesPerPage);

    const handleExportExcel = () => {
        const excelData = allDataEntries.map((item) => [
            item.key,
            item.name,
            item.surname,
            item.mobile,
            item.age,
            item.city,
            item.email,
            item.profession,
            item.nickname,
            item.hobbies,
        ]);

        const ws = XLSX.utils.aoa_to_sheet([['No', 'Name', 'Surname', 'Mobile', 'Age', 'City', 'Email', 'Profession', 'Nickname', 'Hobbies'], ...excelData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


        XLSX.writeFile(wb, 'data-export.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['No', 'Name', 'Surname', 'Mobile', 'Age', 'City', 'Email', 'Profession', 'Nickname', 'Hobbies']],
            body: allDataEntries.map((item) => [
                item.key,
                item.name,
                item.surname,
                item.mobile,
                item.age,
                item.city,
                item.email,
                item.profession,
                item.nickname,
                item.hobbies,
            ]),
        });
        doc.save('data-export.pdf');
    };



    return (
        <div className="container mt-5">
            <div className="mb-3">
                <button className="btn btn-success" onClick={handleExportExcel} style={{ margin: '8px' }}>
                    Export to Excel
                </button>
                <button className="btn btn-danger" onClick={handleExportPDF} style={{ margin: '8px' }}>
                    Export to PDF
                </button>

            </div>
            <h1 className="mb-4">Data from Database</h1>
            <div
                className="shadow p-3 mb-5 bg-white rounded table-responsive"
                style={{ maxHeight: '78vh' }}
            >
                <div className="mb-3">
                    <label className="form-label">Search:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search here...."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="btn btn-primary ml-2"
                        onClick={handleSearch}
                        style={{ margin: '8px' }}
                    >
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

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import FileU from './FileU';

const File = () => {
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const [excelFile, setExcelFile] = useState(null);
    const [showDropdowns, setShowDropdowns] = useState(false);
    const manualDropdownLabels = ['Name', 'Surname', 'Email', 'Mobile No', 'City', 'Profession', 'Age'];
    const [dropdownOptions, setDropdownOptions] = useState(Array(7).fill([]));
    const [selectedOptions, setSelectedOptions] = useState(Array(7).fill(''));
    const [excelData, setExcelData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setExcelFile(file);
        resetState();
    };

    const resetState = () => {
        setShowDropdowns(false);
        setDropdownOptions(Array(7).fill([]));
        setSelectedOptions(Array(7).fill(''));
        setExcelData([]);
        setSearchQuery('');
        setCurrentPage(0);
    };

    const handleShowHeadings = () => {
        if (!excelFile) {
            console.error('No Excel file uploaded');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const headers = parsedData[0] || [];
            setDropdownOptions(Array(7).fill(headers));
            setShowDropdowns(true);
        };

        reader.readAsArrayBuffer(excelFile);
    };

    const handleDropdownChange = (index, event) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;
        setSelectedOptions(newSelectedOptions);
    };

    const handleShowContent = () => {
        if (!excelFile) {
            console.error('No Excel file uploaded');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const headers = parsedData[0] || [];

            const filteredDataset = parsedData.slice(1).map((row) => {
                const filteredRow = {};
                manualDropdownLabels.forEach((label, index) => {
                    const option = selectedOptions[index];
                    if (option) {
                        const columnIndex = headers.indexOf(option);
                        filteredRow[label] = row[columnIndex];
                    } else {
                        filteredRow[label] = null;
                    }
                });
                return filteredRow;
            });

            setExcelData(filteredDataset);
            setShowDropdowns(false);
        };

        reader.readAsArrayBuffer(excelFile);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filterDataBySearchQuery = () => {
        if (searchQuery.trim() === '') {
            return excelData;
        }

        const searchTerms = searchQuery.toLowerCase().split(',').map(term => term.trim());

        return excelData.filter((row) => {
            return searchTerms.every(searchTerm => {
                return Object.values(row).some((value) => {
                    if (typeof value === 'string' || typeof value === 'number') {
                        const stringValue = String(value).toLowerCase();
                        return stringValue.includes(searchTerm);
                    }
                    return false;
                });
            });
        });
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const getPaginatedData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filterDataBySearchQuery().slice(startIndex, endIndex);
    };

    const tableRef = useRef(null);

    const handleDownloadPDF = () => {
        const input = tableRef.current;

        html2pdf(input, {
            margin: 10,
            filename: 'table.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        });
    };

    const handleDownloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filterDataBySearchQuery());
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, 'table.xlsx');
    };

    if (permissions.includes('N')) {
        return (
            <div className="container mt-5">
                <h1 className="mb-4">File Upload</h1>
                <div className="alert alert-danger" role="alert">
                    <h3 className="mb-4">You do not have permission to access this page.</h3>
                </div>
            </div>
        );
    }

    return (
        <>
            {permissions.includes('RW') ? (
                <div className="container mt-5">
                    <h1 style={{ marginBottom: '20px', fontWeight: 'bold' }}>File Upload</h1>
                    <div className="p-4 border rounded">
                        <label htmlFor="excelFile">Upload Excel File:</label>
                        <input type="file" id="excelFile" accept=".xlsx, .xls" onChange={handleFileUpload} />

                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleShowHeadings}
                            disabled={!excelFile}
                        >
                            Show Headings
                        </button>

                        {showDropdowns && (
                            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Select Headings</h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => setShowDropdowns(false)}
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {dropdownOptions.map((options, index) => (
                                                <div key={index} className="mt-2">
                                                    <label>{`${manualDropdownLabels[index]}:`}</label>
                                                    <select
                                                        value={selectedOptions[index] || ''}
                                                        onChange={(event) => handleDropdownChange(index, event)}
                                                        className="form-select"
                                                    >
                                                        <option value="" disabled>
                                                            Select a heading
                                                        </option>
                                                        {options.map((heading, headingIndex) => (
                                                            <option key={headingIndex} value={heading}>
                                                                {heading}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={handleShowContent}
                                            >
                                                Show Content
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {excelFile && (
                            <p className="mt-3">{`Uploaded Excel File: ${excelFile.name}`}</p>
                        )}

                        {/* Search functionality */}
                        <div className="mt-3">
                            <label htmlFor="searchQuery">Search:</label>
                            <input
                                type="text"
                                id="searchQuery"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="form-control"
                            />
                        </div>

                        {/* Download buttons */}
                        <div className="mt-4">
                            <button className="btn btn-primary" onClick={handleDownloadPDF}>
                                Download PDF
                            </button>
                            <button className="btn btn-success ml-2" onClick={handleDownloadExcel}>
                                Download Excel
                            </button>
                        </div>

                        {/* Display paginated data */}
                        {filterDataBySearchQuery().length > 0 && (
                            <div className="mt-4" ref={tableRef}>
                                <p>Content:</p>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            {manualDropdownLabels.map((label, index) => (
                                                <th key={index}>{label}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getPaginatedData().map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {manualDropdownLabels.map((label, index) => (
                                                    <td key={index}>{row[label]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <ReactPaginate
                                    pageCount={Math.ceil(filterDataBySearchQuery().length / itemsPerPage)}
                                    onPageChange={handlePageChange}
                                    containerClassName="pagination"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    activeClassName="active"
                                    previousClassName="page-item"
                                    nextClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextLinkClassName="page-link"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <FileU />
            )}
        </>
    );
};

export default File;

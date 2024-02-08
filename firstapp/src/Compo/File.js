// Ruf.js

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const File = () => {
    const [excelFile, setExcelFile] = useState(null);
    const [showDropdowns, setShowDropdowns] = useState(false);
    const manualDropdownLabels = ['Name', 'Surname', 'Email', 'Moblie No', 'City', 'Profession', 'Age'];
    const [dropdownOptions, setDropdownOptions] = useState(Array(7).fill([]));
    const [selectedOptions, setSelectedOptions] = useState(Array(7).fill(''));
    const [excelData, setExcelData] = useState([]);

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
        if (!excelFile || selectedOptions.some((option) => !option)) {
            console.error('Please select options for all dropdowns');
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
                selectedOptions.forEach((option, index) => {
                    const columnIndex = headers.indexOf(option);
                    filteredRow[manualDropdownLabels[index]] = row[columnIndex];
                });
                return filteredRow;
            });

            setExcelData(filteredDataset);
            setShowDropdowns(false);
        };

        reader.readAsArrayBuffer(excelFile);
    };

    return (
        <div className="container mt-5">
            <div className="p-4 border rounded">
                <label htmlFor="excelFile">Upload Excel File:</label>
                <input
                    type="file"
                    id="excelFile"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                />

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
                                                <option value="" disabled>Select a heading</option>
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

                {excelFile && <p className="mt-3">{`Uploaded Excel File: ${excelFile.name}`}</p>}

                {excelData.length > 0 && (
                    <div className="mt-4">
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
                                {excelData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {manualDropdownLabels.map((label, index) => (
                                            <td key={index}>{row[label]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default File;

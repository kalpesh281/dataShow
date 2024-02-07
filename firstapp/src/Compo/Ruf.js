import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const Ruf = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});
    const [fileHeaders, setFileHeaders] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);
    const [filteredTableData, setFilteredTableData] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Please select a file.');
            return;
        }

        const fileType = file.type;

        if (
            fileType ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const data = new Uint8Array(reader.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                if (sheetData.length > 0) {
                    const headers = sheetData[0].map((header) => header.toString());
                    setFileHeaders(headers);
                    setTableData(sheetData.slice(1)); // Exclude header row
                    setSelectedOptions({});
                    setStatus('File uploaded successfully.');
                    setDisplayTable(false); // Reset table display
                    setFilteredTableData([]); // Reset filtered table data
                } else {
                    setStatus('Excel file is empty.');
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            setStatus('Unsupported file type. Only Excel files are supported.');
        }
    };

    useEffect(() => {
        // Update filtered table data based on selected options
        const filteredData = tableData.map((row) =>
            Object.entries(row).reduce((acc, [key, value]) => {
                const selectedOption = selectedOptions[key];
                if (selectedOption) {
                    acc[selectedOption] = value;
                }
                return acc;
            }, {})
        );
        setFilteredTableData(filteredData);
    }, [selectedOptions, tableData]);

    const handleOptionChange = (id, value) => {
        setSelectedOptions((prevOptions) => ({ ...prevOptions, [id]: value }));
    };

    const handleShowTable = () => {
        setDisplayTable(true);
    };

    return (
        <div>
            <div>
                <h2>Upload Excel File</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                <p>Status: {status}</p>
            </div>

            {fileHeaders.length > 0 && (
                <div>
                    <h2>Excel Headers</h2>
                    {fileHeaders.map((header) => (
                        <div key={header}>
                            <label htmlFor={header}>{header}:</label>
                            <select
                                id={header}
                                name={header}
                                value={selectedOptions[header] || ''}
                                onChange={(e) => handleOptionChange(header, e.target.value)}
                            >
                                <option value="">Select...</option>
                                {fileHeaders.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            )}

            {displayTable && filteredTableData.length > 0 && (
                <div>
                    <h2>Selected Options - Table</h2>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(selectedOptions).map((header) => (
                                    <th key={header}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTableData.map((row, index) => (
                                <tr key={index}>
                                    {Object.keys(selectedOptions).map((header) => (
                                        <td key={header}>{row[header]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {fileHeaders.length > 0 && (
                <div>
                    <button onClick={handleShowTable}>Show Table</button>
                </div>
            )}
        </div>
    );
};

export default Ruf;

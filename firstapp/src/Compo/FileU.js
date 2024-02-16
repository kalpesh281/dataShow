import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const FileU = () => {
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const [excelFile, setExcelFile] = useState(null);
    const [excelData, setExcelData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setExcelFile(file);
        resetState();
        showContent(file);
    };

    const resetState = () => {
        setExcelData([]);
    };

    const showContent = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const headers = parsedData[0] || [];
            const rows = parsedData.slice(1).map((row) => {
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[header] = row[index];
                });
                return rowData;
            });

            setExcelData(rows);
        };

        reader.readAsArrayBuffer(file);
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
        <div className="container mt-5">
            <h1 style={{ marginBottom: '20px', fontWeight: 'bold' }}>File Upload</h1>
            <div className="p-4 border rounded">
                <label htmlFor="excelFile">Upload Excel File:</label>
                <input type="file" id="excelFile" accept=".xlsx, .xls" onChange={handleFileUpload} />

                {excelFile && (
                    <div className="mt-3">
                        <p>Content:</p>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    {Object.keys(excelData[0] || {}).map((label, index) => (
                                        <th key={index}>{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {excelData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(row).map((value, index) => (
                                            <td key={index}>{value}</td>
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

export default FileU;


import React, { useState } from 'react';
import * as XLSX from 'xlsx';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [file, setFile] = useState(null);
    // const[fname,setFname]=useState(null)
    const [status, setStatus] = useState('');
    const [fileData, setFileData] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);

    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Please select a file.');
            return;
        }

        const fileType = file.type;

        if (fileType === 'text/csv' || fileType === 'application/vnd.ms-excel' || fileType === 'text/plain' || fileType === 'application/pdf' || file.type === "application/msword") {
          
            const reader = new FileReader();
            reader.onloadend = () => {
                const content = reader.result;
                
                const rows = content.split('\n').map(row => row.split(','));
                setFileData(rows);
                
                setStatus('File uploaded successfully.');
            };
            reader.readAsText(file);
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          
            const reader = new FileReader();
            reader.onloadend = () => {
                const data = new Uint8Array(reader.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                setFileData(sheetData);
                setStatus('File uploaded successfully.');
            };
            reader.readAsArrayBuffer(file);
        } else {
            setStatus('Unsupported file type. Only CSV, Excel, and text files are supported.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">File Upload</h1>
            <div className="mb-3">
                <input type="file" onChange={handleFileChange} className="form-control" />
            </div>
            <button onClick={handleUpload} className="btn btn-primary mb-3">
                Upload
            </button>
            <p className="mb-3">Status: {status}</p>

            {fileData.length > 0 && (
                <div>
                    <h2 className="mt-4">File Data</h2>
                    <table className="table table-bordered table-striped mt-2">
                        <thead className="thead-dark">
                            <tr>
                                {fileData[0].map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Home;

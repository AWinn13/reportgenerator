import React, { useState } from 'react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const [selectedReport, setSelectedReport] = useState('');
    const history = useHistory();

    const reportOptions = ['Report 1'];

    const handleReportChange = (event) => {
        setSelectedReport(event.target.value);
    };

    const handleFormFill = () => {
        // Redirect to the form page with the selected report
        history.push(`/form/${selectedReport}`);
    };

    return (
        <div>
            <h1>Report Generator</h1>
            <label htmlFor="reportSelect">Select a report:</label>
            <select id="reportSelect" value={selectedReport} onChange={handleReportChange}>
                {reportOptions.map((report, index) => (
                    <option key={index} value={report}>
                        {report}
                    </option>
                ))}
            </select>
            <button onClick={handleFormFill}>Fill out form</button>
        </div>
    );
};

export default HomePage;
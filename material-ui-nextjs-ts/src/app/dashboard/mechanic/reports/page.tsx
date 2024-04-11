import React from "react";



export default async function Reports() {
    // Fetch the data synchronously
    const data = await fetchReports();

    // Render the component
    return (
        <div>
            <h1>Reports Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Report ID</th>
                        <th>Report Type</th>
                        <th>Car ID</th>
                        <th>Sublocation ID</th>
                        <th>Report Status</th>
                        <th>Time Spent Labor</th>
                        <th>Tasks</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((report: any) => (
                        <tr key={report.reportID}>
                            <td>{report.reportID}</td>
                            <td>{report.reportType}</td>
                            <td>{report.carID}</td>
                            <td>{report.sublocationID}</td>
                            <td>{report.reportStatus}</td>
                            <td>{report.timeSpentLabor}</td>
                            <td>{report.tasks}</td>
                            <td>{report.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Function to fetch the reports synchronously
async function fetchReports() {
    try {
        const res = await fetch('http://localhost:3000/api/reports');
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

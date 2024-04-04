'use client'
import React, { useState } from "react";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Collapse } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import TableComponent from "@/components/TableComponent";
import ApplicationsTable from "@/components/Dashboard Components/AppTable";

const Applications = () => {
    
    const [rows, setRows] = useState([
        {name: "Albert Flores", email: "flores61@gmail.com", numb: "+1 (211)234-5678", stat: "Inactive", address1: "123 Main St", address2: "", city: "New York", state: "NY", licenseID: "AB123456789", submittedDate: "03/15/2023"},
        {name: "Maria Rodriguez", email: "mrodriguez@gmail.com", numb: "+1 (222)345-6789", stat: "Active", address1: "456 Elm St", address2: "Apt 101", city: "Los Angeles", state: "CA", licenseID: "CD987654321", submittedDate: "02/23/2023"},
        {name: "John Smith", email: "jsmith@gmail.com", numb: "+1 (233)456-7890", stat: "Active", address1: "789 Oak St", address2: "Suite 200", city: "Chicago", state: "IL", licenseID: "EF456789012", submittedDate: "01/20/2023"},
        {name: "Emily Johnson", email: "ejohnson@gmail.com", numb: "+1 (244)567-8901", stat: "Inactive", address1: "321 Pine St", address2: "", city: "San Francisco", state: "CA", licenseID: "GH345678901", submittedDate: "12/18/2022"},
        {name: "Michael Brown", email: "mbrown@gmail.com", numb: "+1 (255)678-9012", stat: "Active", address1: "1010 Maple Ave", address2: "", city: "Houston", state: "TX", licenseID: "IJ234567890", submittedDate: "11/12/2022"},
        {name: "Jennifer Martinez", email: "jmartinez@gmail.com", numb: "+1 (266)789-0123", stat: "Inactive", address1: "555 Cedar St", address2: "", city: "Miami", state: "FL", licenseID: "KL123456789", submittedDate: "10/06/2022"},
        {name: "David Wilson", email: "dwilson@gmail.com", numb: "+1 (277)890-1234", stat: "Active", address1: "777 Elmwood Dr", address2: "", city: "Seattle", state: "WA", licenseID: "MN234567890", submittedDate: "09/02/2022"},
        {name: "Jessica Taylor", email: "jtaylor@gmail.com", numb: "+1 (288)901-2345", stat: "Active", address1: "888 Oakwood Blvd", address2: "", city: "Atlanta", state: "GA", licenseID: "OP345678901", submittedDate: "08/25/2022"},
        {name: "Daniel Anderson", email: "danderson@gmail.com", numb: "+1 (299)012-3456", stat: "Inactive", address1: "999 Pinecone Ln", address2: "", city: "Dallas", state: "TX", licenseID: "QR456789012", submittedDate: "07/17/2022"},
        {name: "Sarah Thomas", email: "sthomas@gmail.com", numb: "+1 (200)123-4567", stat: "Active", address1: "111 Birch St", address2: "", city: "Denver", state: "CO", licenseID: "ST567890123", submittedDate: "06/09/2022"},
        {name: "Christopher Lee", email: "clee@gmail.com", numb: "+1 (211)234-5678", stat: "Inactive", address1: "222 Maplewood Ave", address2: "", city: "Boston", state: "MA", licenseID: "UV678901234", submittedDate: "05/01/2022"},
        {name: "Amanda Harris", email: "aharris@gmail.com", numb: "+1 (222)345-6789", stat: "Active", address1: "333 Cedarwood Dr", address2: "", city: "Phoenix", state: "AZ", licenseID: "WX789012345", submittedDate: "04/15/2022"},
        {name: "Matthew Clark", email: "mclark@gmail.com", numb: "+1 (233)456-7890", stat: "Active", address1: "444 Oak Ave", address2: "", city: "Las Vegas", state: "NV", licenseID: "YZ890123456", submittedDate: "03/28/2022"},
    ]);

    // Define your applyAction function here
    const applyAction = (rowIndex, action) => {
        // Create a copy of the rows array
        const updatedRows = [...rows];
        // Update the status of the row at the given index
        updatedRows[rowIndex].stat = action;
        // Update the state with the modified rows
        setRows(updatedRows);
    };

    return (
        <div>
            <h1>Application Approvals</h1>
            <ApplicationsTable rows={rows} applyAction={applyAction} />
        </div>
    );
};

export default Applications;
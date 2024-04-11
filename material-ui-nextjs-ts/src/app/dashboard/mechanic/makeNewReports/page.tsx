"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Box, Grid, Typography, Fade, Modal } from "@mui/material";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0"; Might be needed later
// import { getSession } from "@auth0/nextjs-auth0";

// This enum guarantees that you can only select these options.
// Pairing this with a database Enum so nothing else can be entered.
// Can be useful at other places on the site.
enum ReportTypeEnum {
    serviceReport = 'Service Report',
    statusReport = 'Status Report',
    damageReport = 'Damage Report',
    miscReport = 'Miscellaneous',
}

// Interface so that only these fields can be entered. Nothing else on the form.
interface IFormInput {
    reportType: ReportTypeEnum
    carID: string;
    locationID: string;
    reportStatus: string;
    timeSpentLabor: string;
    tasks: string;
    notes: string;
}

const Reports: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {

            console.log("Hello" + data);
            const res = await fetch("http://localhost:3000/api/makeReport", {
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: JSON.stringify(data),
            });
    
            if (!res.ok) {
                throw new Error(`Failed to submit report: ${res.statusText}`);
            }
    
            const json = await res.json();
            console.log("Report submitted successfully:", json);
        
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid item xs={12} sm={2} md={5}>
                <Box
                    sx={{
                        my: 2,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Make A New Report
                    </Typography>
                    <Box
                        component="form"
                        // noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            style={{
                                borderRadius: 10,
                                color: "#000180",
                            }}
                            {...register("reportType")}
                            margin="normal"
                            required
                            fullWidth
                            id="reportType"
                            label="Report Type"
                            autoComplete="reportType"
                            autoFocus
                        />
                        <TextField
                            {...register("carID")}
                            margin="normal"
                            required
                            fullWidth
                            id="carID"
                            label="Car ID"
                            autoComplete="carID"
                        />
                        <TextField
                            {...register("locationID")}
                            margin="normal"
                            fullWidth
                            id="location"
                            label="Location"
                            autoComplete="location"
                        />
                        <TextField
                            {...register("reportStatus")}
                            margin="normal"
                            required
                            fullWidth
                            id="status"
                            label="Status"
                            autoComplete="status"
                        />
                        <TextField
                            {...register("timeSpentLabor")}
                            margin="normal"
                            required
                            fullWidth
                            id="timeSpentLabor"
                            label="Labor"
                            autoComplete="timeSpentLabor"
                        />
                        <TextField
                            {...register("tasks")}
                            margin="normal"
                            required
                            fullWidth
                            id="tasks"
                            label="Tasks"
                            autoComplete="tasks"
                        />
                        <TextField
                            {...register("notes")}
                            margin="normal"
                            required
                            fullWidth
                            id="notes"
                            label="Notes"
                            autoComplete="notes"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                borderRadius: 10,
                                backgroundColor: "#000180",
                                color: "#ffffff",
                                "&:hover": { backgroundColor: "#33adad" },
                            }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Submit
                        </Button>
                        <Button // After I do some testing I can convert 
                            // this to its actual function and instantly start a new report
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                borderRadius: 10,
                                backgroundColor: "#33adad",
                                color: "#ffffff",
                                "&:hover": { backgroundColor: "#000180" },
                            }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Make Another Report
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Reports;
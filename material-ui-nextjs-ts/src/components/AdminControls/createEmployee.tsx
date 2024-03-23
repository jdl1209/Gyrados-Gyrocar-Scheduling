"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";

interface IFormInput {
  username: string;
  fullname: string;
  office?: string;
  roleID: number;
}

const CreateEmployee: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await fetch("http://localhost:3001/api/createEmployee", { method: "POST", body: JSON.stringify(data)});
    console.log(data); // You can replace this with your actual function call
  };

  return (
    <div style={{ width: "300px", height: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("username")}
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          {...register("fullname")}
          margin="normal"
          required
          fullWidth
          id="fullname"
          label="Full Name"
          autoComplete="name"
        />
        <TextField
          {...register("office")}
          margin="normal"
          fullWidth
          id="office"
          label="Office"
          autoComplete="office"
        />
        <TextField
          {...register("roleID")}
          margin="normal"
          required
          fullWidth
          id="roleID"
          label="Role ID"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateEmployee;



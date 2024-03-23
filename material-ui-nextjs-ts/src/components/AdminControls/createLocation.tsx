import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";

interface IFormInput {
  sublocationName: string;
  address: string;
  cityName: string;
  zip: string;
}

const CreateLocation: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await fetch("http://localhost:3001/api/createLocation", { method: "POST", body: JSON.stringify(data)});
      console.log("API response:", res); // You can replace this with your actual function call
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div style={{ width: "300px", height: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("sublocationName")}
          margin="normal"
          required
          fullWidth
          id="sublocationName"
          label="Sublocation Name"
          autoComplete="sublocationName"
          autoFocus
        />
        <TextField
          {...register("address")}
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          autoComplete="address"
        />
        <TextField
          {...register("cityName")}
          margin="normal"
          required
          fullWidth
          id="cityName"
          label="City Name"
          autoComplete="cityName"
        />
        <TextField
          {...register("zip")}
          margin="normal"
          required
          fullWidth
          id="zip"
          label="ZIP Code"
          autoComplete="zip"
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

export default CreateLocation;

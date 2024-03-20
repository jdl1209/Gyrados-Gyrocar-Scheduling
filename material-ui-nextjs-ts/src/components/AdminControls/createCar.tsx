import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";

interface IFormInput {
  carType: string;
  battery: number;
  status?: string;
  reserved: number;
  sublocationID: number;
}

const CreateCar: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form data:", data); // Log form data
    try {
      const res = await fetch("http://localhost:3001/api/createCar", { method: "POST", body: JSON.stringify(data)});
      console.log("API response:", res); // Log API response
    } catch (error) {
      console.error("API error:", error); // Log API error
    }
  };

  console.log("Rendering CreateCar component"); // Log component rendering

  return (
    <div style={{ width: "300px", height: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("carType")}
          margin="normal"
          required
          fullWidth
          id="carType"
          label="Car Type"
          autoComplete="carType"
          autoFocus
        />
        {/* Add more form fields here */}
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

export default CreateCar;


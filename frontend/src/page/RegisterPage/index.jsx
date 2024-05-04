import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const fields = [
  { id: "email", label: "Email", type: "email" },
  { id: "name", label: "Name", type: "text" },
  { id: "password", label: "Password", type: "password" },
  { id: "confirmPassword", label: "Confirm Password", type: "password" },
];

function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleValidation = () => {
    let valid = true;
    const newErrors = {};

    fields.forEach((field) => {
      if (!inputs[field.id]) {
        newErrors[field.id] = `Please enter ${field.label.toLowerCase()}`;
        valid = false;
      }
    });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    // Validate name format
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(inputs.name)) {
      newErrors.name = "Name must contain only letters and spaces";
      valid = false;
    }

    if (inputs.password !== inputs.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) handleSignUp();
  };

  const handleSignUp = () => {
    setErrors({});
    console.log("Sign Up successful");
    console.log(inputs);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          height: "100%",
          backgroundImage: `url(${require("../../asset/images/shoesBackground.jpg")})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
      <form>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "40px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "400px",
            border: "2px solid #ff7d1b",
            backgroundColor: "transparent",
            backdropFilter: "blur(20px)",
          }}
          elevation={3}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              SignUp
            </Typography>
            <Typography
              onClick={navigateHome}
              variant="h5"
              sx={{ fontWeight: "bold", color: "white", cursor: "pointer" }}
            >
              PhgStore
            </Typography>
          </Box>
          <Divider variant="center" sx={{ border: "1px solid", mb: 4 }} />
          {fields.map((field) => (
            <TextField
              key={field.id}
              required
              onChange={(e) => handleChange(e.target.value, field.id)}
              InputProps={{
                style: {
                  borderRadius: 20,
                },
              }}
              error={errors[field.id] ? true : false}
              fullWidth={true}
              id={field.id}
              label={field.label}
              type={field.type}
              defaultValue=""
              helperText={errors[field.id] ? errors[field.id] : ""}
              color="success"
            />
          ))}
          <Button
            onClick={handleValidation}
            variant="contained"
            sx={{
              borderRadius: 10,
              width: "150px",
              fontWeight: "bold",
              margin: "0 auto",
              display: "flex",
              backgroundColor: "#ff7d1b",
              "&:hover": {
                backgroundColor: "rgba(255,125,27, 0.7)",
              },
            }}
          >
            Sign Up
          </Button>
          <Typography variant="caption" display={"flex"} justifyContent={"end"}>
            Already have an account?
            <Typography
              onClick={navigateToLogin}
              variant="caption"
              sx={{
                color: "white",
                fontWeight: "500",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Login
            </Typography>
          </Typography>
        </Paper>
      </form>
    </Box>
  );
}

export default Register;

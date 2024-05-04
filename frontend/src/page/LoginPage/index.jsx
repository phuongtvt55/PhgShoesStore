import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const hanldeOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
    console.log(inputs);
  };

  const handleError = (errorMess, input) => {
    setError((prevState) => ({ ...prevState, [input]: errorMess }));
  };
  const validate = () => {
    let valid = true;
    if (!inputs.email) {
      handleError("Please enter email", "email");
      valid = false;
    }
    if (!inputs.password) {
      handleError("Please enter password");
      valid = false;
    }

    if (valid) handleLogin();
  };

  const handleLogin = () => {
    console.log("Login succes");
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
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
          Login
        </Typography>
        <Divider variant="center" sx={{ border: "1px solid", mb: 4 }} />
        <TextField
          onChange={(e) => hanldeOnchange(e.target.value, "email")}
          InputProps={{
            style: {
              borderRadius: 20,
              "& .MuiInputBase-root": {
                color: "white !important",
              },
            },
          }}
          error={false}
          fullWidth={true}
          type="email"
          id="outlined-error-helper-text"
          label="Email"
          defaultValue=""
          helperText=""
          color="success"
        />
        <TextField
          onChange={(e) => hanldeOnchange(e.target.value, "password")}
          InputProps={{
            style: {
              borderRadius: 20,
            },
          }}
          error={false}
          fullWidth={true}
          id="outlined-error-helper-text"
          label="Password"
          type="password"
          defaultValue=""
          helperText=""
          color="success"
        />
        <Box sx={{ textAlign: "end", color: "white" }}>
          <Typography
            variant="caption"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Forgot Password?
          </Typography>
        </Box>
        <Button
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
          Login
        </Button>

        <Typography variant="caption" display={"flex"} justifyContent={"end"}>
          Don't have an account?
          <Typography
            variant="caption"
            sx={{
              color: "white",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;

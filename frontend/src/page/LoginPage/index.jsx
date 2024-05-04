import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const hanldeOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMess, input) => {
    setError((prevState) => ({ ...prevState, [input]: errorMess }));
  };
  const validate = () => {
    let valid = true;
    setError({});
    if (!inputs.email) {
      handleError("Please enter email", "email");
      valid = false;
    }
    if (!inputs.password) {
      handleError("Please enter password", "password");
      valid = false;
    }

    if (valid) handleLogin();
  };

  const handleLogin = () => {
    setError({});
    console.log("Login succes");
    console.log(inputs);
  };

  const navigateToRegister = () => {
    navigate("/register");
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
              Login
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
          <TextField
            required
            onChange={(e) => hanldeOnchange(e.target.value, "email")}
            InputProps={{
              style: {
                borderRadius: 20,
              },
            }}
            error={error.email ? true : false}
            fullWidth={true}
            type="email"
            id="email"
            label="Email"
            defaultValue=""
            helperText={error.email ? error.email : ""}
            color="success"
          />
          <TextField
            required
            onChange={(e) => hanldeOnchange(e.target.value, "password")}
            InputProps={{
              style: {
                borderRadius: 20,
              },
            }}
            error={error.password ? true : false}
            fullWidth={true}
            id="pass"
            label="Password"
            type="password"
            defaultValue=""
            helperText={error.password ? error.password : ""}
            color="success"
            autoComplete="true"
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
            onClick={validate}
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
              onClick={navigateToRegister}
              variant="caption"
              sx={{
                color: "white",
                fontWeight: "500",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Sign Up
            </Typography>
          </Typography>
        </Paper>
      </form>
    </Box>
  );
}

export default Login;

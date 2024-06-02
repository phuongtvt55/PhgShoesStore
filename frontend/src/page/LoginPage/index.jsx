import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../rest/api/auth";
import { useMutationHook } from "../../hooks/useMutationHook";
import { toast } from "react-toastify";
import { getUserById } from "../../rest/api/user";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slice/userSlice";
import { decodeJwt } from "../../untils/jwtDecode";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errorMess, setError] = useState({});

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

  const handleLogin = async () => {
    setError({});
    mutation.mutate(inputs);
  };

  const mutation = useMutationHook(async (data) => await login(data));
  const { data, error, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access_token", data?.data.access_token);
      const decode = decodeJwt(data?.data.access_token);
      getUser(decode?.payload.id, data?.data.access_token);
      if (location.state) navigate(location?.state);
      else navigateHome();
    }
    if (isError) {
      toast.dismiss();
      error?.response &&
        toast.error(error?.response.data.messages, {
          position: "bottom-center",
          closeOnClick: true,
          autoClose: 2000,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const getUser = async (id, access_token) => {
    const res = await getUserById(id);
    dispatch(updateUser({ ...res.data, access_token }));
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
            error={errorMess.email}
            fullWidth={true}
            type="email"
            id="email"
            label="Email"
            defaultValue=""
            helperText={errorMess.email ? errorMess.email : ""}
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
            error={errorMess.password}
            fullWidth={true}
            id="pass"
            label="Password"
            type="password"
            defaultValue=""
            helperText={errorMess.password ? errorMess.password : ""}
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

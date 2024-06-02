import {
  Avatar,
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { imageToBase64 } from "../../untils/index";
import { toast } from "react-toastify";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateUser } from "../../rest/api/user";
import LoadingButton from "@mui/lab/LoadingButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function EditProfile({ user }) {
  const [avatar, setAvatar] = useState(user.image || "");
  const [isCurrentState, setIsCurrentState] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    phone: user.phone || "",
    image: user.image || "",
  });
  const [errorMess, setErrorMess] = useState({});

  const hanldeChangeAvatar = (event) => {
    const files = event.target.files;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    try {
      const isInclude = allowedTypes.includes(files[0].type);
      if (files.length > 0 && isInclude) {
        imageToBase64(files[0], (result) => {
          setAvatar(result);
          setInputs((prev) => ({
            ...prev,
            image: result,
          }));
        });
        setIsCurrentState(false);
      } else {
        toast.error("Wrong type of image", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validate = () => {
    let valid = true;
    if (!inputs.name) {
      handleError("Name not null", "name");
      valid = false;
    }

    if (valid) handleUpdateUser();
  };

  const handleChangeText = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
    setIsCurrentState(false);
  };

  const handleError = (text, input) => {
    setErrorMess((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleUpdateUser = async () => {
    setErrorMess({});
    setIsLoading(true);
    setIsCurrentState(true);
    mutation.mutate(inputs);
  };

  const mutation = useMutationHook(
    async (data) => await updateUser(user._id, data)
  );
  const { error, isSuccess, isError } = mutation;

  useEffect(() => {
    toast.dismiss();
    if (isSuccess) {
      toast.success("Update successfully");
      setIsLoading(false);
      setIsCurrentState(true);
    }
    if (isError) {
      toast.error("Lỗi");
      error?.response &&
        toast.error(error?.response.data.messages, {
          position: "bottom-center",
          closeOnClick: true,
          autoClose: 2000,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Your profile
      </Typography>
      <Typography variant="body1" color={"gray"} mb={2}>
        Manage profile information to secure your account
      </Typography>
      <Divider />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        p={5}
        alignItems={"center"}
        flex={1}
      >
        <Box display={"flex"} gap={5} flexDirection={"column"} flex={1}>
          <Box display={"flex"} gap={3} alignItems={"center"}>
            <Typography sx={{ width: "100px", textAlign: "right" }}>
              User name
            </Typography>
            <TextField
              onChange={(e) => handleChangeText(e.target.value, "name")}
              error={errorMess.name ? true : false}
              helperText={errorMess.name ? errorMess.name : ""}
              fullWidth
              required={true}
              hiddenLabel
              size="small"
              defaultValue={user.name}
              variant="filled"
            />
          </Box>
          <Box display={"flex"} gap={3} alignItems={"center"}>
            <Typography sx={{ width: "100px", textAlign: "right" }}>
              Email
            </Typography>
            <TextField
              fullWidth
              disabled
              hiddenLabel
              size="small"
              defaultValue={`${user.email.substring(0, 3)}***`}
              variant="filled"
            />
          </Box>
          <Box display={"flex"} gap={3} alignItems={"center"}>
            <Typography sx={{ width: "100px", textAlign: "right" }}>
              Phone
            </Typography>
            <TextField
              fullWidth
              onChange={(e) => handleChangeText(e.target.value, "phone")}
              error={errorMess.phone}
              helperText={errorMess.phone || ""}
              type="number"
              hiddenLabel
              size="small"
              defaultValue={user.phone ? user.phone : ""}
              variant="filled"
            />
          </Box>
          <Box display={"flex"} flex={1} justifyContent={"center"}>
            <LoadingButton
              disabled={isCurrentState}
              onClick={validate}
              loading={loading}
              sx={{
                backgroundColor: "#ff7d1b",
                "&:hover": {
                  backgroundColor: "rgba(255,125,27, 0.7)",
                },
                width: "100px",
              }}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "0px 50px 100px 50px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={
              avatar.length !== 0
                ? `data:image/png;base64,${avatar}`
                : "/static/images/avatar/1.jpg"
            }
            sx={{ width: 100, height: 100, marginBottom: "20px" }}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: "#ff7d1b",
              "&:hover": {
                backgroundColor: "rgba(255,125,27, 0.7)",
              },
            }}
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={hanldeChangeAvatar} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditProfile;

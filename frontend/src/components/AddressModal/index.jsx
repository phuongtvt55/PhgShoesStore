import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControlLabel, TextField } from "@mui/material";
import SelectAddress from "../SelectAddress";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useMutationHook } from "../../hooks/useMutationHook";
import { createAddress } from "../../rest/api/address";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddressModal({ open, setOpen, user, getAddress }) {
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    specificAddress: "",
    default: false,
  });
  const data = {
    addressItems: [],
    user: user._id,
  };
  const [errorMess, setErrorMess] = useState({});
  const [checked, setChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeInput = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (text, input) => {
    setErrorMess((prevState) => ({ ...prevState, [input]: text }));
  };

  const validate = () => {
    let flag = true;
    setErrorMess({});
    if (!inputs.name) {
      handleError("Name can't be null", "name");
      flag = false;
    }

    if (!inputs.phone) {
      handleError("Phone can't be null", "phone");
      flag = false;
    }
    if (!inputs.specificAddress) {
      handleError("Specific address can't be null", "specific");
      flag = false;
    }
    if (selectedAddress === undefined) {
      handleError("Please fill all infomation", "address");
      flag = false;
    }
    if (flag) handleCreateAddress();
  };

  const handleCreateAddress = () => {
    data.addressItems.push({
      ...inputs,
      localAddress: selectedAddress,
      default: checked,
    });
    mutation.mutate(data);
  };

  const mutation = useMutationHook(async (data) => await createAddress(data));
  const { error, isSuccess, isError } = mutation;
  React.useEffect(() => {
    toast.dismiss();
    if (isSuccess) {
      toast.success("Add new address successfully");
      handleClose();
      getAddress();
    }
    if (isError) {
      toast.error("Error");
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
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New address
          </Typography>
          <Box display={"flex"} mt={2} gap={2} mb={2}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={(e) => handleChangeInput(e.target.value, "name")}
              error={errorMess.name}
              helperText={errorMess.name || ""}
              inputProps={{ maxLength: 30 }}
            />
            <TextField
              id="phone"
              label="Phone"
              variant="outlined"
              onChange={(e) => handleChangeInput(e.target.value, "phone")}
              error={errorMess.phone}
              helperText={errorMess.phone || ""}
              inputProps={{ maxLength: 12 }}
            />
          </Box>
          <SelectAddress
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            errorMess={errorMess}
          />
          <TextField
            sx={{ marginTop: "20px" }}
            id="outlined-multiline-flexible"
            label="Specific address"
            onChange={(e) =>
              handleChangeInput(e.target.value, "specificAddress")
            }
            error={errorMess.specificAddress}
            helperText={errorMess.specificAddress || ""}
            multiline
            maxRows={4}
            fullWidth
            inputProps={{ maxLength: 100 }}
          />
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={handleChange}
                />
              }
              sx={{ color: "gray" }}
              label="Set as default address"
            />
          </Box>
          <Box display={"flex"} flex={1} justifyContent={"end"} gap={2}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff7d1b",
                "&:hover": {
                  backgroundColor: "rgba(255,125,27, 0.7)",
                },
              }}
              onClick={validate}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default AddressModal;

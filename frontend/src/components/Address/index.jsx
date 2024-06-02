import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAll } from "../../rest/api/address";
import AddressModal from "../AddressModal";
import ListAddress from "../ListAddress";

function Address({ user }) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState();
  const handleOpenModal = () => {
    setOpen(true);
  };

  const getAddress = async () => {
    try {
      const res = await getAll();
      if (res.data === null) {
        return;
      }
      res.data.addressItems.sort((x) => (x.default ? -1 : 1));
      setAddress(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      <AddressModal
        open={open}
        setOpen={setOpen}
        user={user}
        getAddress={getAddress}
      />
      <Box p={3}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mb={2}
          alignItems={"center"}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            My address
          </Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            variant="contained"
            sx={{
              backgroundColor: "#ff7d1b",
              "&:hover": {
                backgroundColor: "rgba(255,125,27, 0.7)",
              },
            }}
          >
            Add new address
          </Button>
        </Box>
        <Divider />
        {address ? (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} mt={3} mb={2}>
              Address
            </Typography>
            {address?.addressItems.map((data) => (
              <Box key={data._id}>
                <ListAddress
                  data={data}
                  getAddress={getAddress}
                  type="profile"
                />
              </Box>
            ))}
          </>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"200px"}
          >
            <Typography>You don't have any address</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Address;

import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAll } from "../../rest/api/address";
import ChangeAddress from "../ChangeAddress";
import { Link } from "react-router-dom";

function DeliveryAddress({ defaultDelivery, setDefaultDelivery }) {
  const [address, setAddress] = useState();
  const [open, setOpen] = useState(false);

  const getAddress = async () => {
    try {
      const res = await getAll();
      if (res.data !== null) {
        res.data.addressItems.sort((x) => (x.default ? -1 : 1));
        setAddress(res.data);
        setDefaultDelivery(res.data.addressItems[0]);
        //console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeDelivery = (data) => {
    setDefaultDelivery(data);
    setOpen(false);
  };

  useEffect(() => {
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
      {address ? (
        <>
          <Typography mb={2} color={"red"} fontSize={"20px"}>
            Delivery address
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography fontWeight={"bold"}>
                {defaultDelivery?.name} (+84)
              </Typography>
              <Typography fontWeight={"bold"}>
                {defaultDelivery?.phone}
              </Typography>
            </Box>
            <Box>
              {defaultDelivery?.specificAddress}, <br />
              {defaultDelivery?.localAddress}
            </Box>
            {defaultDelivery?.default && (
              <Typography
                color={"red"}
                p={0.5}
                border={"1px solid red"}
                variant="caption"
              >
                Default
              </Typography>
            )}
            <Button onClick={() => setOpen(true)}>Change</Button>
          </Box>
          <ChangeAddress
            defaultDelivery={defaultDelivery}
            open={open}
            setOpen={setOpen}
            address={address}
            getAddress={getAddress}
            changeDelivery={changeDelivery}
          />
        </>
      ) : (
        <Box display={"flex"} gap={3}>
          <Typography color={"red"} variant="body1">
            You must be add your address to continue checkout
          </Typography>
          <Link to={"/profile"}>Go to add address</Link>
        </Box>
      )}
    </Paper>
  );
}

export default DeliveryAddress;

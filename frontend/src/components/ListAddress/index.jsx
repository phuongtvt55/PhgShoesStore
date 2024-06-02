import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { deleteAddress, setDefault } from "../../rest/api/address";
import AlertDialog from "../AlertDialog";
import { toast } from "react-toastify";

function ListAddress({
  data,
  getAddress,
  type,
  changeDelivery,
  defaultDelivery,
}) {
  const [open, setOpen] = useState(false);
  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(data._id);
      toast.dismiss();
      toast.success("Delete address successfully");
      getAddress();
    } catch (e) {
      console.log(e);
    }
  };

  const setDefaultAddress = async () => {
    try {
      await setDefault(data._id);
      toast.dismiss();
      toast.success("Change default address successfully");
      getAddress();
    } catch (e) {
      toast.errorr("Err");
      console.log(e);
    }
  };

  const callBack = () => {
    changeDelivery(data);
  };
  return (
    <>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        title={"Delete Address"}
        content={"Are you sure you want to delete this address?"}
        acceptCallback={handleDeleteAddress}
      />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
        mt={3}
      >
        <Box>
          <Box display={"flex"} gap={1} alignItems={"center"} mb={1}>
            <Typography>{data.name}</Typography>|
            <Typography color={"gray"}>(+84) {data.phone}</Typography>
          </Box>
          <Typography variant="subtitle2" color={"gray"}>
            {data.specificAddress}
          </Typography>
          <Typography variant="subtitle2" color={"gray"}>
            {data.localAddress}
          </Typography>
          {data.default && (
            <Typography
              variant="subtitle2"
              color={"red"}
              sx={{
                border: "1px solid red",
                display: "inline-block",
                padding: "2px",
                marginTop: "5px",
              }}
            >
              Default address
            </Typography>
          )}
        </Box>
        <Box textAlign={"center"} display={"flex"} flexDirection={"column"}>
          {type === "profile" ? (
            <>
              <Box>
                <Button
                  variant="text"
                  sx={{
                    marginBottom: "5px",
                    textTransform: "none",
                    justifyContent: "flex-end",
                  }}
                >
                  Update
                </Button>
                <Button
                  disabled={data.default}
                  variant="text"
                  sx={{
                    marginBottom: "5px",
                    textTransform: "none",
                    justifyContent: "flex-end",
                  }}
                  onClick={() => setOpen(true)}
                >
                  Delete
                </Button>
              </Box>
              <Button
                disabled={data.default}
                variant="outlined"
                onClick={setDefaultAddress}
              >
                Set as default
              </Button>
            </>
          ) : (
            <Button
              disabled={data._id === defaultDelivery._id}
              variant="outlined"
              onClick={() => callBack(data)}
            >
              Select address
            </Button>
          )}
        </Box>
      </Box>
      <Divider />
    </>
  );
}

export default ListAddress;

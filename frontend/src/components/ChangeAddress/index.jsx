import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import ListAddress from "../ListAddress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  overflowX: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function ChangeAddress({
  open,
  setOpen,
  address,
  getAddress,
  changeDelivery,
  defaultDelivery,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {address?.addressItems.map((data) => (
            <Box key={data._id}>
              <ListAddress
                defaultDelivery={defaultDelivery}
                data={data}
                getAddress={getAddress}
                type="order"
                changeDelivery={changeDelivery}
              />
            </Box>
          ))}
        </Box>
      </Modal>
    </div>
  );
}

export default ChangeAddress;

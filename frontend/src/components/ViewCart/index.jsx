import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrder } from "../../rest/api/order";
import { useNavigate } from "react-router-dom";

function ViewCart({ user }) {
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getUserOrder();
  }, []);

  const getUserOrder = async () => {
    try {
      const res = await getOrder();
      setOrder(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const navigateToDetail = (id) => {
    navigate(`../detail/${id}`);
  };
  return (
    <Box sx={{ padding: "20px" }}>
      {order?.map((data) => (
        <Box key={data._id}>
          <Box width={"100%"} mt={2}>
            {data.orderItems.map((data) => (
              <Box
                key={data._id}
                sx={{ cursor: "pointer" }}
                onClick={() => navigateToDetail(data.product._id)}
              >
                <Box display={"flex"} gap={2} flex={1}>
                  <Box
                    component="img"
                    src={data.product.images[0]}
                    sx={{ width: "100px", height: "100px" }}
                  ></Box>
                  <Box flex={1}>
                    <Typography>{data.name}</Typography>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Typography color={"gray"}>Size : {data.size}</Typography>
                      <Typography color={"red"}>
                        ${data.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography color={"gray"}>x{data.amount}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ margin: "20px 0" }} />
              </Box>
            ))}
          </Box>
          <Typography color={"gray"}>
            {data.shippingAddress.name} (+84) {data.shippingAddress.phone}
          </Typography>
          <Typography color={"gray"} width={"70%"}>
            {data.shippingAddress.address}
          </Typography>
          <Box
            sx={{
              width: "100%",
              justifyContent: "end",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "600" }}>Total: </Typography>
            <Typography color={"red"} variant="h5">
              ${data.totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ marginTop: "50px" }} />
        </Box>
      ))}
    </Box>
  );
}

export default ViewCart;

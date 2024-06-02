import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeliveryAddress from "../../components/DeliveryAddress";
import {
  addOrder,
  removeOrder,
  clearOrder,
} from "../../redux/slice/orderSlice";
import { getPriceProducts } from "../../rest/api/product";
import { toast } from "react-toastify";
import { createOrder } from "../../rest/api/order";
import LoadingButton from "@mui/lab/LoadingButton";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderItems = useSelector((state) => state.order.orderItems);
  const [proIds, setProIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productOrder, setProductOrder] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [priceMapping, setPriceMapping] = useState({});
  const [defaultDelivery, setDefaultDelivery] = useState();
  const [selectPaymentIndex, setSelectPaymentIndex] = useState();
  const typeOfPaymentObj = [
    {
      title: "Payment on delivery",
      type: "delivery",
    },
    {
      title: "Paypal",
      type: "paypal",
    },
  ];

  const changePayment = (data) => {
    setSelectPaymentIndex(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (orderItems) {
      const productIds = orderItems.map((item) => item.productId);
      setProIds(productIds);
    }
  }, [orderItems]);

  useEffect(() => {
    if (proIds.length > 0) {
      getPriceProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proIds]);

  useEffect(() => {
    getTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceMapping]);

  const getPriceProduct = async () => {
    try {
      const res = await getPriceProducts({ ids: proIds });
      setProductOrder(res.data);

      const newPriceMapping = {};
      res.data.forEach((item) => {
        newPriceMapping[item.name] = item.discountedPrice;
      });
      setPriceMapping(newPriceMapping);
      //console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeOrder = (data, sign) => {
    try {
      if (data.quantity <= 1 && sign === -1) {
        handleRemoveOrder(data);
        return;
      }
      const newQuantity = { ...data, quantity: data.quantity * sign };
      if (Math.abs(newQuantity.quantity) >= newQuantity.available && sign > 0) {
        toast.dismiss();
        toast.error("Out of stock");
        return;
      }
      dispatch(addOrder({ orderItem: newQuantity }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveOrder = (data) => {
    try {
      dispatch(removeOrder({ orderItem: data }));
    } catch (e) {
      console.log(e);
    }
  };

  const getTotalPrice = () => {
    let total = 0;
    orderItems.forEach((product) => {
      const name = product.name;
      const quantity = product.quantity;

      //console.log(priceMapping);
      if (priceMapping[name] !== undefined) {
        total += priceMapping[name] * quantity;
      }
    });
    setTotalPrice(total);
  };

  const validateCheckout = () => {
    if (!defaultDelivery) {
      toast.dismiss();
      toast.error("You must be add your address to continue checkout");
      return;
    }
    if (!selectPaymentIndex) {
      toast.dismiss();
      toast.error("You must be choose payment method");
      return;
    }
    processCheckout();
  };

  const payloadOrder = {
    orderItems: [],
    shippingAddress: {
      name: "",
      address: "",
      phone: "",
    },
    paymentMethod: "",
    shippingPrice: "",
    //taxPrice: { type: Number, required: true },
    totalPrice: "",
  };

  const processCheckout = () => {
    //Add all product into payloadOrder
    orderItems.forEach((item) => {
      payloadOrder.orderItems.push({
        name: item.name,
        amount: item.quantity,
        price: priceMapping[item.name],
        size: item.size,
        product: item.productId,
      });
    });
    //Add address
    const { name, specificAddress, localAddress, phone } = defaultDelivery;
    payloadOrder.shippingAddress = {
      name,
      address: `${specificAddress} ${localAddress}`,
      phone,
    };

    //other
    payloadOrder.paymentMethod = selectPaymentIndex.type;
    payloadOrder.shippingPrice = 0;
    payloadOrder.totalPrice = totalPrice;
    handleCreateOrder(payloadOrder);
  };

  const handleCreateOrder = async (payloadOrder) => {
    try {
      setLoading(true);
      const res = await createOrder(payloadOrder);
      if (res.data.status === "Ok") {
        setLoading(false);
        toast.dismiss();
        toast.success("Order successfully");
        dispatch(clearOrder());
      }
    } catch (e) {
      toast.dismiss();
      toast.error(
        "Order error, perhaps the product is out of stock, please check again the product in shop"
      );
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return orderItems.length > 0 ? (
    <Box
      sx={{
        marginTop: "150px",
        padding: "0px 200px",
      }}
    >
      <DeliveryAddress
        defaultDelivery={defaultDelivery}
        setDefaultDelivery={setDefaultDelivery}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "40px" }}
      >
        <Box width={"100%"}>
          <Typography sx={{ fontWeight: "500" }} variant="h5">
            Bag
          </Typography>
          {orderItems?.map((data, index) => (
            <Box key={index}>
              <Box
                display={"flex"}
                margin={"20px 0"}
                gap={2}
                width={"90%"}
                flex={"1"}
              >
                <Box
                  component="img"
                  src={data.image}
                  sx={{ width: "150px", height: "150px" }}
                ></Box>
                <Box>
                  <Typography sx={{ fontWeight: "600" }} variant="h6">
                    {data.name}
                  </Typography>
                  <Typography color={"gray"}>Size: {data.size}</Typography>
                  <Box
                    mt={3}
                    display={"flex"}
                    gap={2}
                    alignItems={"center"}
                    flex={1}
                  >
                    <IconButton
                      onClick={() => handleChangeOrder(data, -1)}
                      size="small"
                      sx={{
                        backgroundColor: "lightgray",
                        borderRadius: 3,
                        height: "100%",
                      }}
                    >
                      <RemoveIcon sx={{ color: "#ff7d1b" }} />
                    </IconButton>
                    <Typography>{data.quantity}</Typography>
                    <IconButton
                      onClick={() => handleChangeOrder(data, 1)}
                      size="small"
                      sx={{
                        backgroundColor: "lightgray",
                        borderRadius: 3,
                        height: "100%",
                      }}
                    >
                      <AddIcon sx={{ color: "#ff7d1b" }} />
                    </IconButton>

                    <Typography ml={3}>
                      {data.available} product available
                    </Typography>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"end"} flex={1}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    <Typography sx={{ fontWeight: "600" }}>
                      $
                      {(
                        productOrder?.find(
                          (discount) => discount.name === data.name
                        ).discountedPrice * data.quantity
                      ).toFixed(2)}
                    </Typography>
                    <IconButton
                      onClick={() => handleRemoveOrder(data)}
                      size="small"
                      sx={{
                        backgroundColor: "lightgray",
                        borderRadius: 3,
                      }}
                    >
                      <DeleteOutlineIcon sx={{ color: "#ff7d1b" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "500" }} variant="h5">
            Summary
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mt={2}
            gap={10}
          >
            <Typography>Subtotal</Typography>
            <Typography>${totalPrice?.toFixed(2)}</Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mt={2}
            gap={10}
          >
            <Typography>Estimated Delivery & Handling</Typography>
            <Typography>Free</Typography>
          </Box>
          <Divider sx={{ marginTop: "20px  " }} />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mt={2}
            gap={10}
          >
            <Typography>Total</Typography>
            <Typography>${totalPrice?.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ marginTop: "20px" }} />
        </Box>
      </Box>
      <Paper sx={{ marginTop: "50px", padding: "20px" }}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography>Payment method</Typography>
          {typeOfPaymentObj.map((data, index) => (
            <Box
              key={index}
              onClick={() => changePayment(data)}
              sx={{
                padding: "10px",
                marginLeft: "20px",
                border:
                  data.type !== selectPaymentIndex?.type
                    ? "1px solid black"
                    : "1px solid #ff7d1b",
              }}
            >
              <Typography
                sx={{
                  color: data.type === selectPaymentIndex?.type && "#ff7d1b",
                }}
              >
                {data.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider sx={{ margin: "50px 0" }} />
        <Typography>{selectPaymentIndex?.title}</Typography>
        <Divider sx={{ marginTop: "50px" }} />
        <Box
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
          mt={4}
        >
          <Typography>Total:</Typography>
          <Typography color={"#ff7d1b"} variant="h5" ml={1}>
            ${totalPrice?.toFixed(2)}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <Typography>
            Clicking "Check out" means you agree to Add to the Shop Terms
          </Typography>
          <LoadingButton
            variant="text"
            loading={loading}
            onClick={validateCheckout}
            sx={{
              marginTop: "20px",
              padding: "7px 30px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#ff7d1b",
              "&:hover": {
                backgroundColor: "rgba(255,125,27, 0.7)",
              },
            }}
          >
            <span>Check out</span>
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  ) : (
    <Typography
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Your have not any product in your cart
    </Typography>
  );
}

export default Order;

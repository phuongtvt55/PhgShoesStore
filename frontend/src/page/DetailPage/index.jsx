import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getById } from "../../rest/api/product";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/slice/orderSlice";

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const [product, setProduct] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [imageActive, setImageActive] = useState();
  const [sizeShoes, setSizeShoes] = useState();
  const [indexActive, setIndexActive] = useState(0);
  const [countItem, setCountItem] = useState(1);
  const [countInStock, setCountInStock] = useState();
  const handleChangeActive = (index, data) => {
    setIndexActive(index);
    setImageActive(data);
  };
  const user = useSelector((state) => state.user);
  const orderItem = useSelector((state) => state.order.orderItems);

  useEffect(() => {
    //Get detail here
    //console.log(user)
    getDetail(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hanldeChangeItem = (type) => {
    if (!checkSizeNull()) return;

    if (type === "remove") {
      if (countItem === 1) return;
      setCountItem(countItem - 1);
    } else {
      //Count item higher than stock
      if (countItem >= countInStock) return;
      setCountItem(countItem + 1);
    }
  };

  const checkSizeNull = () => {
    if (sizeShoes === undefined) {
      toast.dismiss();
      toast.info("Please choose size");
      return false;
    }
    return true;
  };

  const checkOutOfStock = () => {
    const outOfOrder = orderItem?.find(
      (item) => item.name === product.name && item.size === sizeShoes.size
    );
    if (outOfOrder && countItem + outOfOrder.quantity > countInStock) {
      toast.dismiss();
      toast.error(
        `You already have ${outOfOrder.quantity} products in your cart. The selected quantity cannot be added to the cart as it would exceed your purchase limit.`
      );
      return false;
    }
    return true;
  };

  const handleChangeSize = (event, newAlignment) => {
    if (newAlignment === null) return;
    setCountItem(1);
    setCountInStock(newAlignment.countInStock);
    setSizeShoes(newAlignment);
  };

  const handleAddToCart = () => {
    if (!user.email) {
      navigate("/login", { state: location.pathname });
      return;
    }
    if (!checkSizeNull()) return;
    if (!checkOutOfStock()) return;
    toast.dismiss();
    toast.success("Add to cart successfully");

    const available = product?.sizes.find(
      (item) => item.size === sizeShoes.size
    ).countInStock;
    dispatch(
      addOrder({
        orderItem: {
          name: product?.name,
          image: product.images[0],
          size: sizeShoes.size,
          quantity: countItem,
          available: available,
          productId: product._id,
        },
      })
    );
  };

  const getDetail = async (id) => {
    try {
      const res = await getById(id);
      setProduct(res.data);
      setDiscountPrice(res.data.price * (1 - res.data.discount / 100));
      setImageActive(res.data.images[0]);
      //console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        paddingTop: "70px",
      }}
    >
      <Box
        sx={{
          maxWidth: "1024px",
          margin: "0 auto",
          height: "100%",
          mt: 5,
        }}
      >
        {product && (
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "400px" }}>
              <Box
                component="img"
                alt="shoes"
                src={imageActive}
                sx={{
                  height: "400px",
                  width: "100%",
                  borderRadius: 5,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                {product.images?.map((data, index) => {
                  return (
                    <Box
                      onClick={() => handleChangeActive(index, data)}
                      key={index}
                      component="img"
                      alt="shoes"
                      src={data}
                      sx={{
                        marginTop: "20px",
                        height: "90px",
                        width: "90px",
                        borderRadius: 5,
                        maxHeight: { xs: "50px", md: "100px" },
                        maxWidth: { xs: "50px", md: "100px" },
                        overflow: "hidden",
                        border: indexActive === index && "2px solid red",
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
            <Box sx={{ padding: "30px 100px" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {product?.name}
              </Typography>
              <Typography color="gray" mt={3}>
                {product?.description}
              </Typography>
              <Box mt={3}>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                  <Typography variant="h5" fontWeight={600}>
                    ${discountPrice.toFixed(2)}
                  </Typography>
                  <Box
                    sx={{
                      padding: "5px 10px",
                      backgroundColor: "lightgray",
                      borderRadius: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "darkorange",
                      }}
                    >
                      {product?.discount}%
                    </Typography>
                  </Box>
                </Box>
                <Box position={"relative"} width={"70px"}>
                  <Typography textAlign={"center"} variant="body1" color="gray">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Divider
                    component={"hr"}
                    sx={{
                      position: "absolute",
                      top: "11px",
                      width: "100%",
                      border: "1px solid",
                      color: "gray",
                    }}
                  />
                </Box>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                sx={{ marginTop: "20px" }}
              >
                <Typography>Size: </Typography>
                <ToggleButtonGroup
                  value={sizeShoes}
                  color="error"
                  exclusive
                  onChange={handleChangeSize}
                  aria-label="size"
                >
                  {product?.sizes.map((item) => (
                    <ToggleButton
                      disabled={item.countInStock === 0}
                      key={item._id}
                      value={item}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        {item.size}
                      </Typography>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
              <Box
                mt={3}
                height={"50px"}
                display={"flex"}
                alignItems={"center"}
              >
                <IconButton
                  onClick={() => hanldeChangeItem("remove")}
                  size="large"
                  sx={{
                    backgroundColor: "lightgray",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <RemoveIcon sx={{ color: "#ff7d1b" }} />
                </IconButton>
                <Typography sx={{ margin: "0 30px" }}>{countItem}</Typography>
                <IconButton
                  onClick={() => hanldeChangeItem("add")}
                  size="large"
                  sx={{
                    backgroundColor: "lightgray",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <AddIcon sx={{ color: "#ff7d1b" }} />
                </IconButton>
                {countInStock && (
                  <Typography ml={3}>
                    {countInStock} product available
                  </Typography>
                )}
              </Box>
              <Button
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  marginTop: "30px",
                  height: "45px",
                  backgroundColor: "#ff7d1b",
                  borderRadius: 3,
                  padding: "0 20px",
                  "&:hover": {
                    backgroundColor: "rgba(255,125,27, 0.7)",
                  },
                }}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Detail;

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const params = useParams();
  const [indexActive, setIndexActive] = useState(0);
  const [countItem, setCountItem] = useState(1);
  const handleChangeActive = (index) => {
    setIndexActive(index);
  };

  useEffect(() => {
    //Get detail here
    console.log(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hanldeChangeItem = (type) => {
    if (type === "remove") {
      if (countItem === 1) return;
      setCountItem(countItem - 1);
    } else {
      //Count item higher than stock
      setCountItem(countItem + 1);
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
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "400px" }}>
            <Box
              component="img"
              alt="shoes"
              src={require("../../asset/images/shoes.jpg")}
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
              {Array.from(Array(4)).map((_, index) => {
                return (
                  <Box
                    onClick={() => handleChangeActive(index)}
                    key={index}
                    component="img"
                    alt="shoes"
                    src={require("../../asset/images/shoes.jpg")}
                    sx={{
                      marginTop: "20px",
                      height: "90px",
                      width: "90px",
                      borderRadius: 5,
                      maxHeight: { xs: "50px", md: "100px" },
                      maxWidth: { xs: "50px", md: "100px" },
                      border: indexActive === index && "2px solid red",
                    }}
                  />
                );
              })}
            </Box>
          </Box>
          <Box sx={{ padding: "30px 100px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Sneakers
            </Typography>
            <Typography color="gray" mt={3}>
              Next out similar people product recent sink spent vowel arm
              arrangement moving cream rose trouble piece tip win grain burst
              learn war canal thee porch command finally cloud around nearest
              tin tie from grandmother husband our percent electricity world
              trip essential play union name pain even may brass remove anybody.
            </Typography>
            <Box mt={3}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography variant="h5" fontWeight={600}>
                  $125.00
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
                    50%
                  </Typography>
                </Box>
              </Box>
              <Box position={"relative"} width={"70px"}>
                <Typography textAlign={"center"} variant="body1" color="gray">
                  $250.00
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
            <Box mt={3} height={"50px"} display={"flex"} alignItems={"center"}>
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
              <Button
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                sx={{
                  height: "100%",
                  ml: 3,
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
        </Box>
      </Box>
    </Box>
  );
}

export default Detail;

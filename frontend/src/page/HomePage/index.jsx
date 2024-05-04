import {
  Box,
  Grid
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ListProduct from "../../components/ListProduct";

function HomePage() {
  const navigate = useNavigate();
  const navigateToDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  const handleWishlist = (id) => {
    //e.preventDefault();
    console.log(`Wish ${id}`);
  };

  const handleAddToCart = (id) => {
    console.log(`Add ${id}`);
  };
  return (
    <Box sx={{ p: 10 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(16)).map((_, index) => (
          <Grid item xs={4} sm={4} md={3} key={index} position={"relative"}>
            <ListProduct
              navigateToDetail={navigateToDetail}
              handleWishlist={handleWishlist}
              handleAddToCart={handleAddToCart}
              index={index}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;

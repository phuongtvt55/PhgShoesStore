import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, CardActionArea, CardActions, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

function ListProduct({
  navigateToDetail,
  handleWishlist,
  handleAddToCart,
  index,
}) {
  return (
    <Card>
      <CardActionArea onClick={() => navigateToDetail(index)}>
        <CardMedia
          component="img"
          height="250"
          image={require("../../asset/images/shoes.jpg")}
          alt="shoes"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Nike
          </Typography>
          <Typography variant="body2" color="gray">
            Đã bán 1000+
          </Typography>
          <Typography variant="h6" color="red" sx={{ fontWeight: "bold" }}>
            $120.00
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ position: "absolute", top: 20 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton
            onClick={() => handleWishlist(index)}
            size="large"
            aria-label="show new mails"
            color="inherit"
          >
            <FavoriteBorderIcon color="error" />
          </IconButton>
          <IconButton
            onClick={() => handleAddToCart(index)}
            size="large"
            aria-label="show new mails"
            color="inherit"
          >
            <ShoppingCartIcon color="success" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ListProduct;

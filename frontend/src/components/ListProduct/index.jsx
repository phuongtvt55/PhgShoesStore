import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CardActionArea, CardActions, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

function ListProduct({ navigateToDetail, handleWishlist, data, wishList }) {
  //Get wishList from user
  const check = wishList?.includes(data._id);
  const discountPrice = data.price - (data.price * data.discount) / 100;
  return (
    <Card>
      <CardActionArea onClick={() => navigateToDetail(data._id)}>
        <CardMedia
          component="img"
          height="250"
          image={
            data.images.length > 0
              ? data.images[0]
              : require("../../asset/images/shoes.jpg")
          }
          alt="shoes"
        />
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            backgroundColor: "#ff7d1b",
          }}
        >
          <Typography color={"gray"} sx={{ padding: "5px 10px" }}>
            -{data.discount}%
          </Typography>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="gray">
            Selled {data.selled}
          </Typography>
          <Typography variant="h6" color="red" sx={{ fontWeight: "bold" }}>
            ${discountPrice.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ position: "absolute", top: 20 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {check ? (
            <IconButton
              onClick={() => handleWishlist(data._id, "remove")}
              size="large"
              aria-label="show new mails"
              color="inherit"
            >
              <FavoriteIcon color="error" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleWishlist(data._id, "add")}
              size="large"
              aria-label="show new mails"
              color="inherit"
            >
              <FavoriteBorderIcon color="error" />
            </IconButton>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}

export default ListProduct;

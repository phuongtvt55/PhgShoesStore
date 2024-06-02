import { Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListProduct from "../../components/ListProduct";
import { getAll } from "../../rest/api/product";
import { getWishList, removeWishList, addWishList } from "../../rest/api/user";
import { toast } from "react-toastify";
function HomePage() {
  const navigate = useNavigate();
  const [wishList, setWishList] = useState();
  const user = useSelector((state) => state.user);
  //const search = useSelector((state) => state.product.search);
  //console.log("Search", search);
  const navigateToDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  const handleWishlist = async (id, type) => {
    //e.preventDefault();
    if (!user.email) {
      toast.error("Please login to add wishlist");
      return;
    }
    try {
      type === "add" ? await addWishList({ id }) : await removeWishList({ id });
      hanldeGetWishList();
    } catch (e) {
      console.log(e);
    }
  };

  const hanldeGetWishList = async () => {
    try {
      const res = await getWishList();
      setWishList(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    hanldeGetWishList();
  }, []);

  const getProducts = async () => {
    try {
      const res = await getAll();
      //setProduct(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const query = useQuery({ queryKey: ["product"], queryFn: getProducts });
  //console.log("query", query);

  return (
    <Box sx={{ p: 10 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {query.data?.map((data) => (
          <Grid item xs={4} sm={4} md={3} key={data._id} position={"relative"}>
            <ListProduct
              navigateToDetail={navigateToDetail}
              handleWishlist={handleWishlist}
              data={data}
              wishList={wishList}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;

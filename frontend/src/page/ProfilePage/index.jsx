import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditProfile from "../../components/EditProfile";
import ProfileLeftBar from "../../components/ProfileLeftBar";
import { getUserById } from "../../rest/api/user";
import { decodeJwt } from "../../untils/jwtDecode";
import Address from "../../components/Address";
import ViewCart from "../../components/ViewCart";

function Profile() {
  const [user, setUser] = useState();
  const [type, setType] = useState("profile");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decode = decodeJwt(token);
    getUser(decode?.payload.id);
  }, []);

  const getUser = async (id) => {
    try {
      const res = await getUserById(id);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const componentFragment = {
    profile: <EditProfile user={user} />,
    address: <Address user={user} />,
    cart: <ViewCart user={user} />,
  };

  const handleChangeType = (text) => {
    setType(text);
  };
  return (
    <Box
      sx={{
        marginTop: "100px",
        padding: "0px 150px",
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ paddingTop: "20px", width: "250px" }}>
        <ProfileLeftBar handleChangeType={handleChangeType} />
      </Box>
      <Paper elevation={3} sx={{ width: "80%", marginLeft: "50px" }}>
        {user && componentFragment[type]}
      </Paper>
    </Box>
  );
}

export default Profile;

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Button, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/slice/userSlice";
import { searchProduct } from "../../redux/slice/productSlice";
import { logout } from "../../rest/api/auth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  borderColor: theme.palette.common.black,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
      "&:focus": {
        width: "55ch",
      },
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const orderCart = useSelector((state) => state.order.orderItems);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const navigateProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const navigateOrder = () => {
    navigate("/order");
  };
  const hanldeLogout = async () => {
    dispatch(clearUser());
    localStorage.clear("access_token");
    await logout();
    navigate("/login");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const user = useSelector((state) => state.user);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={navigateProfile}>Profile</MenuItem>
      <MenuItem onClick={hanldeLogout}>LogOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user.name ? (
        <Box>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={navigateOrder}
            >
              <Badge badgeContent={orderCart?.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p>Cart</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Box>
      ) : (
        <Link to="/login">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button color="inherit">Login</Button>
          </Box>
        </Link>
      )}
    </Menu>
  );

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  const handleSearch = (text) => {
    setSearch(text);
    dispatch(searchProduct(text));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ background: "transparent", backdropFilter: "blur(15px)" }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Typography
              onClick={handleNavigate}
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            >
              PhgStore
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Search>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {user.name ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="show new order"
                    color="inherit"
                    onClick={navigateOrder}
                  >
                    <Badge badgeContent={orderCart?.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Tooltip
                    sx={{
                      textAlign: "center",
                      alignItems: "center",
                      display: "flex",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    title="Open settings"
                  >
                    <Typography onClick={handleProfileMenuOpen}>
                      {user.name}
                    </Typography>
                  </Tooltip>
                </>
              ) : (
                <Link to="/login">
                  <Button
                    sx={{
                      fontWeight: "bold",
                      marginLeft: "20px",
                      color: "gray",
                    }}
                    color="inherit"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;

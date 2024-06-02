import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import React from "react";
function ProfileLeftBar({ handleChangeType }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          phuongtvt11
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PersonOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Your account" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleChangeType("profile")}
          >
            <ListItemText primary="Profile" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleChangeType("address")}
          >
            <ListItemText primary="Address" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleChangeType("cart")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Cart" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <NotificationsNoneIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
    </List>
  );
}

export default ProfileLeftBar;

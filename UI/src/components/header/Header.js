import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import React, { useEffect, useState } from "react";
import "./Header.css";

function Header({ selectType, setType }) {
  const drawerWidth = 340;

  const [mobileOpen, setMobileOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            CompanyUser
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem key="user" disablePadding>
              <ListItemButton
                selected={selectType === "usr"}
                onClick={() => {
                  setType("usr");
                }}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users List" />
              </ListItemButton>
            </ListItem>
            <ListItem key="company" disablePadding>
              <ListItemButton
                selected={selectType === "comp"}
                onClick={() => {
                  setType("comp");
                }}
              >
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Company List" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
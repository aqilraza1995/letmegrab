import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { Logout } from "@mui/icons-material";

import CustomButton from "../CustomButton";

const Navbar = () => {
  const navigate = useNavigate()
  const authUser = localStorage.getItem("authUser") !== null ? JSON.parse(localStorage.getItem("authUser")) : "";
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [open, setOpen] = useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setOpen(true)
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser")
    navigate("/")
  }

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xxl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
            <img src="./images/logo.png" alt="logo" style={{ cursor: "pointer", height: "50px", width: "100px" }} onClick={() => navigate("/")} />
          </Box>
          {authUser &&
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} justifyContent={"center"} >
                <img src="./images/logo.png" alt="logo" style={{ cursor: "pointer", height: "50px", width: "100px" }} onClick={() => navigate("/")} />
              </Box>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >

                <MenuItem onClick={() => navigate("/product")}>
                  <Typography sx={{ textAlign: 'center' }}>Product</Typography>
                </MenuItem>
              </Menu>
            </Box>
          }
          {authUser &&
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate("/product")}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Product
              </Button>
            </Box>
          }
          <Box >
            {!authUser ?
              <Stack direction={"row"} gap={2}>
                <CustomButton
                  label={"Login"}
                  onClick={() => navigate("/login")}
                />
                <CustomButton
                  label={"Register"}
                  onClick={() => navigate("/register")}
                />
              </Stack>
              :
              <Stack direction={"row"} gap={2}>
                <Typography variant="body1">{authUser?.username}</Typography>

                <Tooltip title="LogOut">
                  <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                    <Logout />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
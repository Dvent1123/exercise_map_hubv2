import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import useToggle from "../helpers/Toggle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const Nav = () => {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl" sx={{ backgroundColor: "white" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            color="black"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Exercise Map Hub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Home
                  </Link>
                </Typography>
              </MenuItem>

              {!isAuth() && (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/signup"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/signin"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Sign In
                      </Link>
                    </Typography>
                  </MenuItem>
                </div>
              )}

              {isAuth() && isAuth().role === "admin" && (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/home"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {isAuth().name}
                      </Link>
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/admin"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Settings
                      </Link>
                    </Typography>
                  </MenuItem>
                </div>
              )}

              {isAuth() && isAuth().role === "subscriber" && (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/home"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {isAuth().name}
                      </Link>
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/private"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Settings
                      </Link>
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/athlete_type"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Athlete Settings
                      </Link>
                    </Typography>
                  </MenuItem>
                </div>
              )}

              {isAuth() && (
                <MenuItem
                  onClick={() => {
                    signout(() => {
                      navigate("/", { replace: true });
                      // history.push("/");
                    });
                  }}
                >
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h4"
            noWrap
            component="div"
            color="black"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Exercise Map Hub
          </Typography>
          {!isAuth() && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Sign In
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, backgroundColor: "#126a75", display: "block",':hover': {
                  bgcolor: '#418891',
                }, }}
              >
                {" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Sign Up
                </Link>
              </Button>
            </Box>
          )}

          {isAuth() && isAuth().role === "admin" && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {" "}
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {isAuth().name}
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {" "}
                <Link
                  to="/admin"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Settings
                </Link>
              </Button>
              <Button
                onClick={() => {
                  signout(() => {
                    navigate("/", { replace: true });
                    // history.push("/");
                  });
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Sign Out
              </Button>
            </Box>
          )}

          {isAuth() && isAuth().role === "subscriber" && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {" "}
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {isAuth().name}
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {" "}
                <Link
                  to="/private"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Settings
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {" "}
                <Link
                  to="/athlete_type"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Athlete Settings
                </Link>
              </Button>
              <Button
                onClick={() => {
                  signout(() => {
                    navigate("/", { replace: true });
                    // history.push("/");
                  });
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Sign Out
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Layout = ({ children, match, history }) => {

  return (
    <Fragment>
      {Nav()}
      <div className="wrapper">
        <div className="container">{children}</div>
      </div>
    </Fragment>
  );
};

export default Layout;

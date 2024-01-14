import { Logout } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Roles, logout } from "../../store/slice/auth.slice";
import style from "./header.module.scss";
import { Logo } from "../logo/logo";
import animation from "./logo_HiSchool.json";
import Lottie from "lottie-react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function Header({ handleToggleMenu }) {
  const { image, role, fullName } = useSelector((store) => store.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const handleEditProfile = () => {
    navigate(`/${role}/editProfile`);
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const headerColor = useMemo(() => {
    switch (role) {
      case Roles.MANAGER:
        return "#581c87";
      case Roles.PARENT:
        return "#0d72ac";
      case Roles.TEACHER:
        return "#0c4a6e";
    }
  }, [role]);

  return (
    <AppBar
      className={style.header}
      style={{ backgroundColor: headerColor }}
      position="static"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleToggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <div variant="h6" component="div" style={{ flexGrow: 1 }}>
          <Lottie
            animationData={animation}
            style={{
              position: "relative",
              width: "50px",
              // height: "5vw",
              // marginTop: "-15px",
              // marginLeft: "-20px",
            }}
          />
        </div>
        {/* <AccountCircle/> */}
        <Typography className={style.username}>
          {fullName} - {role}
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar src={image}></Avatar>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEditProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

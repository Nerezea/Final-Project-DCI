import { useTheme } from "@emotion/react";
import {
  CalendarMonth,
  Chat,
  People,
  Class,
  Event,
  Feed,
  Forum,
  Menu,
  School,
  Sick,
  Draw,
  SchoolTwoTone,
} from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Roles } from "../../store/slice/auth.slice";
import style from "./sidebar.module.scss";
import { Card, useMediaQuery } from "@mui/material";
import { StudentsApi } from "../../api/studentApi";
import { toast } from "react-toastify";
import { AuthApi } from "../../api/authApi";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

const drawerWidth = 240;

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const superAdminMenus = [
  {
    label: "Schools",
    link: "/admin/schools",
    icon: <School />,
  },
];

const managerMenus = [
  {
    label: "Class List",
    link: "/manager/classes",
    icon: <Class />,
  },
  {
    label: "Teachers",
    link: "/manager/teachers",
    icon: <HistoryEduIcon />,
  },
  {
    label: "Students",
    link: "/manager/students",
    icon: <People />,
  },
  {
    label: "News Feed",
    link: "/manager/feed",
    icon: <Feed />,
  },
  {
    label: "Events",
    link: "/manager/events",
    icon: <Event />,
  },
  {
    label: "Forum",
    link: "/manager/forum",
    icon: <Forum />,
  },
  {
    label: "Sick Rest",
    link: "/manager/sickRest",
    icon: <Sick />,
  },
];

const Sidebar = ({ open, setOpen }) => {
  const theme = useTheme();
  const role = useSelector((store) => store.auth.role);
  const [myTeacher, setMyTeacher] = useState();
  const [isFreeTeacher, setIsFreeTeacher] = useState(false);
  const desktopSize = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    if (role === Roles.PARENT) {
      StudentsApi.getMyTeacher()
        .then((res) => {
          setMyTeacher(res.data);
        })
        .catch((err) => toast.error(err));
    } else if (role === Roles.TEACHER) {
      AuthApi.getProfile().then((res) => {
        if (res.data.freeTeacher) {
          setIsFreeTeacher(true);
        } else setIsFreeTeacher(false);
      });
    }
  }, []);

  const parentMenus = useMemo(
    () => [
      {
        label: "News Feed",
        link: "/parent/feed",
        icon: <Feed />,
      },
      {
        label: "Events",
        link: "/parent/events",
        icon: <Event />,
      },
      {
        label: "Calendar",
        link: "/parent/calendar",
        icon: <CalendarMonth />,
      },
      {
        label: "Forum",
        link: "/parent/forum",
        icon: <Forum />,
      },
      {
        label: "Private Message",
        link: `/pv/${myTeacher?._id}`,
        icon: <Chat />,
      },
      {
        label: "Sick Rest",
        link: "/parent/sickRest",
        icon: <Sick />,
      },
    ],
    [myTeacher]
  );

  const teacherMenus = [
    {
      label: "News Feed",
      link: "/teacher/feed",
      icon: <Feed />,
    },
    {
      label: "Events",
      link: "/teacher/events",
      icon: <Event />,
    },
    {
      label: "Students",
      link: "/teacher/students",
      icon: <Forum />,
    },
    {
      label: "Forum",
      link: "/teacher/forum",
      icon: <Forum />,
    },
    {
      label: "Sick Rest",
      link: "/teacher/sick",
      icon: <Sick />,
    },
  ];

  const menus = useMemo(() => {
    switch (role) {
      case Roles.SUPER_ADMIN:
        return superAdminMenus;
      case Roles.MANAGER:
        return managerMenus;
      case Roles.TEACHER:
        if (!isFreeTeacher) return teacherMenus;
        else return teacherMenus.slice(0, teacherMenus.length - 1);
      case Roles.PARENT:
        return parentMenus;
    }
  }, [role, parentMenus, isFreeTeacher]);

  const handleDrawerToggle = () => {
    setOpen((open) => !open);
  };

  const handleMenuClick = () => {
    if (!desktopSize) setOpen(false);
  };

  const renderSidebarContent = () => {
    return (
      <>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <NavLink
              className={style.link}
              style={({ isActive }) => ({
                color: isActive ? "#4db5ff" : "gray",
              })}
              key={menu.link}
              to={menu.link}
              onClick={handleMenuClick}
            >
              <ListItem key={menu} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Card></Card>
      </>
    );
  };

  if (desktopSize)
    return (
      <Drawer variant="permanent" style={{ zIndex: 1 }} open={open}>
        {renderSidebarContent()}
      </Drawer>
    );

  return (
    <div>
      <MuiDrawer
        style={{ zIndex: 1 }}
        anchor="left"
        variant={"temporary"}
        onClose={() => setOpen(false)}
        open={open}
      >
        {renderSidebarContent()}
      </MuiDrawer>
    </div>
  );
};

export default Sidebar;

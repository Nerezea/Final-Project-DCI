import { useTheme } from "@emotion/react";
import {
  AccountCircle,
  ChildFriendly,
  Class,
  Event,
  Feed,
  Forum,
  Menu,
  School,
  Sick,
  CalendarMonth,
  Chat,
} from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Roles } from "../../store/slice/auth.slice";
import { Link } from "react-router-dom";
import style from "./sidebar.module.scss";

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
    label: "Teachers",
    link: "/manager/teachers",
    icon: <Menu />,
  },
  {
    label: "Class List",
    link: "/manager/class",
    icon: <Class />,
  },
  {
    label: "Students",
    link: "/manager/students",
    icon: <ChildFriendly />,
  },
  {
    label: "Events",
    link: "/manager/events",
    icon: <Event />,
  },
  {
    label: "News Feed",
    link: "/manager/feed",
    icon: <Feed />,
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

const teacherMenus = [
  {
    label: "News Feed",
    link: "/teacher/feed",
    icon: <Feed />,
  },
  {
    label: "Forum",
    link: "/teacher/forum",
    icon: <Forum />,
  },
  {
    label: "Parents",
    link: "/teacher/parents",
    icon: <Forum />,
  },
  {
    label: "Sick Rest",
    link: "/teacher/sick",
    icon: <Sick />,
  },
  {
    label: "Events",
    link: "/teacher/events",
    icon: <Event />,
  },
];

const parentMenus = [
  {
    label: "News Feed",
    link: "/parent/feed",
    icon: <Feed />,
  },
  {
    label: "Forum",
    link: "/parent/parent",
    icon: <Forum />,
  },
  {
    label: "Calendar",
    link: "/parent/calendar",
    icon: <CalendarMonth />,
  },
  {
    label: "Teacher PV",
    link: "/parent/teacherPV",
    icon: <Chat />,
  },
  {
    label: "Sick Rest",
    link: "/parent/sick",
    icon: <Sick />,
  },
  {
    label: "Events",
    link: "/parent/events",
    icon: <Event />,
  },
];

const Sidebar = () => {
  const theme = useTheme();
  const role = useSelector((store) => store.auth.role);
  const [open, setOpen] = React.useState(true);

  const menus = useMemo(() => {
    switch (role) {
      case Roles.SUPER_ADMIN:
        return superAdminMenus;
      case Roles.MANAGER:
        return managerMenus;
      case Roles.TEACHER:
        return teacherMenus;
      case Roles.PARENT:
        return parentMenus;
    }
  }, [role]);

  const handleDrawerToggle = () => {
    setOpen((open) => !open);
  };

  return (
    <Drawer style={{zIndex:1}} variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menus.map((menu, index) => (
          <Link className={style.link} key={menu.link} to={menu.link}>
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
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

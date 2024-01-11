import React, { useEffect } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";
import style from "./layout.module.scss";
import { useMediaQuery } from "@mui/material";

const Layout = () => {
  const desktopSize = useMediaQuery("(min-width:900px)");
  const [open, setOpen] = React.useState(desktopSize);

  useEffect(() => {
    if (desktopSize) setOpen(true);
    else setOpen(false);
  }, [desktopSize]);

  const handleToggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div
      className={style.layout}
      style={{ gridTemplateColumns: "max-content 1fr" }}
    >
      <Header handleToggleMenu={handleToggleMenu}></Header>
      <Sidebar open={open} setOpen={setOpen}></Sidebar>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;

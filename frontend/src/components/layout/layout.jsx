import React from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";
import style from "./layout.module.scss";
// import HeaderL from "../headerLili/headerLili";

const Layout = () => {
  return (
    <div className={style.layout}>
      <Header></Header>
      {/* <HeaderL /> */}
      <Sidebar></Sidebar>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;

import React from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";
import style from "./adminLayout.module.scss";

const Layout = () => {
  return (
    <div className={style.layout}>
      <Header></Header>
      <Sidebar></Sidebar>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;

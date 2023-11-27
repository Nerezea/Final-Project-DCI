
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header></Header>
      <Sidebar></Sidebar>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;

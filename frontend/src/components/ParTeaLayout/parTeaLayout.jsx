import HeaderL from "../headerLili/headerLili";
import FooterL from "../footerLili/footerLili";
import { Outlet, useLocation } from "react-router-dom";
import "./parTeaLayout.scss";
import Navbar from "../navbarLili/navbar";

const parTeaLayout = () => {
  const Location = useLocation();

  const showFooter = () => {
    return location.pathname === "/";
  };

  return (
    <div className="parTeaLayout">
      <HeaderL />
      <Navbar />
      <main className="container-main">
        <Outlet />
      </main>
      {showFooter() && <FooterL />}
    </div>
  );
};

export default parTeaLayout;

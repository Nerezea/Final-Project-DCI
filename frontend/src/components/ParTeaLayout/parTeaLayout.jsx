import HeaderL from "../headerLili/headerLili";
import FooterL from "../footerLili/footerLili";
import { Outlet } from "react-router-dom";

const parTeaLayout = () => {
  return (
    <div>
      <HeaderL />
      <Outlet />
      <FooterL />
    </div>
  );
};

export default parTeaLayout;

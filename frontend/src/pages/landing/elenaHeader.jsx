import { NavLink } from "react-router-dom";
import "./elenaHeader.scss";

const header = () => {
  return (
    <nav className="header-wrapper">
      <iframe src="https://lottie.host/embed/46e1efc7-148b-4537-92d0-1054c1188603/dGAswJ2qhq.json"></iframe>
      <div className="nav-wrapper">
        <div className="navigation">
          <NavLink to="/login" className="activeClass">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default header;

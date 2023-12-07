import { NavLink } from "react-router-dom";
import { FcCollaboration } from "react-icons/fc";
const header = () => {
  return (
    <nav className="header-wrapper">
      <div className="logo">
        <NavLink to="/" className="brand">
          <FcCollaboration /> Name APP
        </NavLink>
      </div>
      <div className="nav-wrapper">
        <div className="navigation">
          <NavLink to="/about" className="activeClass">
            BlaBla
          </NavLink>
          <NavLink to="/contact" className="activeClass">
            BlaBla
          </NavLink>
          <NavLink to="/users" className="activeClass">
            BlaBla
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default header;

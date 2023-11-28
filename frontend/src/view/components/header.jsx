import { NavLink } from "react-router-dom";

const header = () => {
  return (
    <nav className="header-wrapper">
      <div className="logo">
        <NavLink to="/" className="brand">
          Name APP
        </NavLink>
      </div>
      <div className="nav-wrapper">
        <div className="navigation">
          <NavLink to="/about" activeClassName="activeClass">
            BlaBla
          </NavLink>
          <NavLink to="/contact" activeClassName="activeClass">
            BlaBla
          </NavLink>
          <NavLink to="/users" activeClassName="activeClass">
            BlaBla
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default header;

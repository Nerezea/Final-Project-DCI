import { GrUserSettings } from "react-icons/gr";
import { CiLogin } from "react-icons/ci";
import * as mockup from "../../pages/mockupData.js";
import "./navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Roles } from "../../store/slice/auth.slice";

const Navbar = () => {
  const role = useSelector((store) => store.auth.role);
  // const [open, setOpen] = useState(true);

  const menus = useMemo(() => {
    switch (role) {
      case Roles.TEACHER:
        return mockup.menuTeachers;
      case Roles.PARENT:
        return mockup.menuParents;
    }
  }, [role]);

  return (
    <nav className="navbar-top">
      <div className="loggedInAs">
        <Link to="/parent/profile">
          <GrUserSettings title="profile settings" />
        </Link>
        <p className="person-textwrapper">Klasse 1B - Albin</p>
      </div>
      <ul>
        {menus.map((item, index) => (
          <li key={index}>
            <NavLink
              className="navlink"
              to={item.to}
              style={({ isActive }) => ({
                color: isActive ? "#4db5ff" : "gray",
              })}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="logOut">
        <Link to="/">
          <CiLogin title="log out" className="loggOut-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

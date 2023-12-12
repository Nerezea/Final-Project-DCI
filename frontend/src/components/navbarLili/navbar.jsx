import { GrUserSettings } from "react-icons/gr";
import { CiLogin } from "react-icons/ci";
import * as mockup from "../../pages/mockupData.js";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar-top">
      <div className="loggedInAs">
        <Link to="/parent/profile">
          <GrUserSettings title="profile settings" />
        </Link>
        <p className="person-textwrapper">Klasse 1B - Albin</p>
      </div>
      <ul>
        {mockup.menuTeachers.map((item, index) => (
          <li key={index}>
            <a href="#">{item}</a>
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

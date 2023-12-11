import { GrUserSettings } from "react-icons/gr";
import { CiLogin } from "react-icons/ci";
import * as mockup from "../../mockupData.js";
import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar-top">
      <div className="loggedInAs">
        <GrUserSettings />
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
        <CiLogin className="loggOut-icon" />
      </div>
    </nav>
  );
};

export default Navbar;

import { NavLink, useNavigate } from "react-router-dom";
import "./headerElena.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slice/auth.slice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  function handleContact() {
    navigate("/FormContact");
  }

  return (
    <nav className="header-wrapper">
      <iframe className="lofoframe" src="https://lottie.host/embed/46e1efc7-148b-4537-92d0-1054c1188603/dGAswJ2qhq.json"></iframe>
      App Name
      <div className="nav-wrapper">
        <div className="navigation">
          <NavLink to="/login" className="activeClass">
            Login
          </NavLink>
          <button onClick={handleLogout} className="logoutButton">
            Logout
          </button>
          <button onClick={handleContact} className="logoutButton">
            concant
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

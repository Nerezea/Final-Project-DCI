import React from "react";
import "./headerLili.scss";
import { useLocation } from "react-router-dom";
import Logo from "./logo.jsx";

const HeaderL = () => {
  const location = useLocation();

  let title;
  switch (location.pathname) {
    case "/parent/feed":
      title = "Newsfeed";
      break;
    case "/parent/calendar":
      title = "Kalendar";
      break;
    case "/parent/krankmeldung":
      title = "Krankmeldung";
      break;

    case "/parent/profile":
      title = "Profil";
      break;
    case "/*":
      title = "Error";
      break;
    default:
      title = "HiSchool";
  }

  return (
    <>
      <header className="header-desktop">
        <Logo />
        <h1 className="title-path">{title}</h1>
      </header>
    </>
  );
};

export default HeaderL;

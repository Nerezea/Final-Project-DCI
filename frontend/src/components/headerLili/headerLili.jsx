import React from "react";
import "./headerLili.scss";
import { useLocation } from "react-router-dom";
import Logo from "./logo.jsx";

const HeaderL = () => {
  const location = useLocation();

  let title;
  switch (location.pathname) {
    case "/newsfeed":
      title = "Newsfeed";
      break;
    case "/forum":
      title = "Forum";
      break;
    case "/krankmeldung":
      title = "Krankmeldung";
      break;
    case "/lehrerchat":
      title = "Lehrerchat";
      break;
    case "/wichtiges":
      title = "Wichtiges";
      break;
    case "/kalendar":
      title = "Kalendar";
      break;
    case "/profil":
      title = "Profil";
      break;
    case "/*":
      title = "Error";
      break;
    default:
      title = "HiSchool";
  }

  return (
    <div className="header-desktop">
      <Logo />
      <h1 className="title-path">{title}</h1>
    </div>
  );
};

export default HeaderL;

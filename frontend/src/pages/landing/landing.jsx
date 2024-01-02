import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./landing.module.scss";
import landingImage from "../../image/Mathematics-rafiki.png";  

const Landing = () => {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }
  function handleContact() {
    navigate("/FormContact");
  }
  return (
    <div className={style.landing_page}>
      <header>
        <div className={style.container}>
          
          <iframe className={style.logo}
            
            src="https://lottie.host/embed/46e1efc7-148b-4537-92d0-1054c1188603/dGAswJ2qhq.json"
          ></iframe>
          <ul className={style.links}>
            <li>Home</li>
            <li>About Us</li>
            <li>Work</li>
            <li onClick={handleContact}>contact</li>
            <li onClick={handleLogin}>Get Started</li>
          </ul>
        </div>
      </header>
      <div className={style.content}>
        <div className={style.container}>
          <div className={style.info}>
            <h1>Looking For Inspiration</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus odit nihil ullam nesciunt quidem iste, Repellendus
              odit nihil
            </p>
            <button>Button name</button>
          </div>
          <div className={style.image_landing}>
            <img src={landingImage} alt="Landing" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

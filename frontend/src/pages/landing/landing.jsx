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
  return (import Header from "../../components/headerElena/headerElena.jsx";
  import Footer from "../../components/footerElena/footerElena.jsx";
  import ".././landing/landing.scss";
  import { useRef } from "react";
  import { useInView } from "framer-motion";
  import PropTypes from "prop-types";
  
  function Section({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <section ref={ref}>
        <span
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          {" "}
          {children}
        </span>
      </section>
    );
  }
  Section.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  const Landing = () => {
    return (
      <div className="landing-container">
        <Header />
        <div className="videoLanding">
          <video
            className="videoLanding"
            autoPlay
            loop
            playsInline
            muted
            src="/video-landingPage.webm"
            type="video/webm"
            alt="video school animation"
          />
        </div>
        <div className="div-section">
        <Section>
          <div>
            <h2>Community</h2>
            <iframe
              className="landing-iframe"
              src="https://lottie.host/embed/2aa8f473-b04c-42a4-986a-537cf8086e3b/9OOAQMSn9o.json"
            ></iframe>
          </div>
        </Section>
        <Section>
        
          <div>
          <h2>Calendar/Events</h2>
            <iframe
              className="landing-iframe"
              src="https://lottie.host/embed/63171e11-c350-4204-9c28-c2869be12022/v0qaapMcrA.json"
            ></iframe>
          </div>
        </Section>
        <Section>
          <div>
          <h2>News</h2>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/1db40ced-002a-4658-b958-9a22e1ba855d/sfM9T8HIQy.json"
          ></iframe>
          </div>
          
        </Section>
        <Section>
          <div>
          <h2>Sickness time register</h2>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/186232cc-4dad-4012-a454-3374a589bed0/UKiQ5VRrUd.json"
          ></iframe>
          </div>
          
        </Section>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Landing;
  
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

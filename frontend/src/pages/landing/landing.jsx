import { useEffect } from "react";
import Header from "../../components/headerElena/headerElena.jsx";
import Footer from "../../components/footerElena/footerElena.jsx";
import ".././landing/landing.scss";

const Landing = () => {
  // useEffect(() => {
  //   const section = document.querySelector("section");

  //   let currentPos = window.scrollY;

  //   const update = () => {
  //     const newPos = window.scrollY;
  //     const diff = newPos - currentPos;
  //     const speed = diff * 0.25;

  //     section.style.transform = `skewY(${speed}deg)`;

  //     currentPos = newPos;

  //     requestAnimationFrame(update);
  //   };

  //   update();
  // }, []);

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
      <section>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;

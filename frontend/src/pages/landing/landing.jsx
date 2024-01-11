//import Header from "../../components/headerElena/headerElena.jsx";
//import Footer from "../../components/";
import "./landing.module.scss";
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
        Animate
        <div>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/2aa8f473-b04c-42a4-986a-537cf8086e3b/9OOAQMSn9o.json"
          ></iframe>
        </div>
      </Section>
      <Section>
        when
        <div>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/63171e11-c350-4204-9c28-c2869be12022/v0qaapMcrA.json"
          ></iframe>
        </div>
      </Section>
      <Section>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1db40ced-002a-4658-b958-9a22e1ba855d/sfM9T8HIQy.json"
        ></iframe>
      </Section>
      <Section>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/186232cc-4dad-4012-a454-3374a589bed0/UKiQ5VRrUd.json"
        ></iframe>
      </Section>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;

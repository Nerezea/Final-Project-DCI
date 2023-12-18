import Header from "../../components/headerElena/headerElena.jsx";
import Footer from "../../components/footerElena/footerElena.jsx";
import ".././landing/landing.scss";

const Landing = () => {
  return (
    <div className="landing-container">
      <Header />
      <section>
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
        <div>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
          ></iframe>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
          ></iframe>
        </div>
        <div>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
          ></iframe>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
          ></iframe>
        </div>
        <div>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
          ></iframe>
          <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
          ></iframe>
        </div>
        <div>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        <iframe
          className="landing-iframe"
          src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
        ></iframe>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;

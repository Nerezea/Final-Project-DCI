import Header from "../../components/headerElena/headerElena.jsx";
import Footer from "../../components/footerElena/footerElena.jsx";
const Landing = () => {
  return (
    <>
      <Header />
      <div className="landing-container">
      <iframe
            className="landing-iframe"
            src="https://lottie.host/embed/1e259dd8-5932-4b4c-8678-15373ebf470f/4qlzSmlRgy.json"
          ></iframe>
      </div>
      <Footer />
    </>
  );
};

export default Landing;

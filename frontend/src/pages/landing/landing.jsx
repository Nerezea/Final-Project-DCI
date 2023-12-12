import style from "./landing.module.scss";
import Header from "../../components/headerElena/headerElena.jsx";
import Footer from "../../components/footerElena/footerElena.jsx";
const Landing = () => {
  return (
    <>
      <Header />
      <div className={style.landing}>
        <h1>Landing</h1>
      </div>
      <Footer />
    </>
  );
};

export default Landing;

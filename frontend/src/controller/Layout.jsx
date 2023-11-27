import Header from "../view/components/header.jsx";
import Footer from "../view/components/footer.jsx";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <>
      <div className="flexbox-container">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;

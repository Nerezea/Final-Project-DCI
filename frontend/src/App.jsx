import AppRoutes from "./routes";
import { useLocation } from "react-router-dom";
import Loader from "./components/loader/loader.jsx";
import { useEffect, useState } from "react";

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, []);

  const renderLoader = () => {
    const { pathname } = location;

    if (showLoader && pathname === "/") {
      return <Loader />;
    }
    return null;
  };

  return (
    <div className="App">
      {renderLoader()}
      {!showLoader && <AppRoutes />}
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import "../loader/loader.scss";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(true), 3500);
  }, []);

  const renderLetters = () => {
    const letters = ["H", "i", " S", "c", "h", "o", "o", "l"];
    return letters.map((letter, index) => (
      <span key={index} style={{ animationDelay: `${index * 0.4}s` }}>
        {letter}
      </span>
    ));
  };

  return (
    <div>
      {loading === false ? (
        <div className="loader-container">
          <iframe
            className="loader-iframe"
            src="https://lottie.host/embed/46e1efc7-148b-4537-92d0-1054c1188603/dGAswJ2qhq.json"
          ></iframe>
          <h1 className="loader-title">{renderLetters()}</h1>
        </div>
      ) : (
        <div className={`main-content ${loading ? "loaded" : ""}`}>
          <h1>Hello!</h1>
        </div>
      )}
    </div>
  );
};

export default Loader;

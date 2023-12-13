<<<<<<< HEAD
import React from "react";

const Feed = () => {
  return <div >manage feeds</div>;
=======
import { useEffect, useState } from "react";
import * as mockup from "../../mockupData.js";
import NewsfeedCards from "./newsfeedCards.jsx";
import "./feed.scss";

const feed = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 200 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <div className="marquee-text-wrapper">
        <p className="marquee-text">{mockup.marqueeTxt}</p>{" "}
        <p className="marquee-text">{mockup.marqueeTxt}</p>{" "}
        <p className="marquee-text">{mockup.marqueeTxt}</p>{" "}
        <p className="marquee-text">{mockup.marqueeTxt}</p>{" "}
        <p className="marquee-text">{mockup.marqueeTxt}</p>{" "}
        <p className="marquee-text">{mockup.marqueeTxt}</p>{" "}
      </div>

      <div className="container-newsfeed">
        <aside className="button-menu">
          <ul>
            {mockup.teacherButtonsNewsfeed.map((item, index) => (
              <li key={index}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="newsfeed-grid">
          <NewsfeedCards />
        </div>
      </div>

      {showButton && (
        <button className="back-to-top" onClick={handleScrollToTop}>
          <img src="/back-to-top.svg" alt="back to home button, arrow up" />
        </button>
      )}
    </div>
  );
>>>>>>> newdev
};

export default feed;

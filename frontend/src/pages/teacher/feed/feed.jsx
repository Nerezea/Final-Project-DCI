<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";

const Feed = () => {
  return <div >manage feeds</div>;
=======
import { useEffect, useState } from "react";
=======
>>>>>>> newdev
import * as mockup from "../../mockupData.js";
import NewsfeedCards from "./newsfeedCards.jsx";
import "./feed.scss";
import ScrollToTop from "../../../components/scrollToTop.jsx";

const feed = () => {
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
                <a href={item.to}>{item.label}</a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="newsfeed-grid">
          <NewsfeedCards />
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
>>>>>>> newdev
};

export default feed;

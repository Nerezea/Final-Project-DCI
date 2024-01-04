// import * as mockup from "../../mockupData.js";
import "./newsfeed-cards.scss";
import { FiEye } from "react-icons/fi";
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewsfeedCards = ({ feed }) => {
  const [liked, setLiked] = useState(new Array(feed.length).fill(false));
  const toggleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };
  console.log(feed);
  console.log(typeof feed);
  return (
    <>
      {feed.map((feed, index) => {
        const rowNum = Math.ceil((index + 1) / 2);
        const className = rowNum % 2 === 0 ? "even-item" : "odd-item";
        return (
          <div key={index} className={`newsfeed-grid-item ${className}`}>
            <div className="content">
              <p>{feed.date}</p>
              <h3>{feed.title}</h3>
              <p>{feed.description}</p>
              {/* <a href={feed.link}>{feed.link}</a> */}
              <Link to={`/parent/feed/${feed._id}`}>
                <button>view</button>{" "}
              </Link>

              <FiEye className="eye-icon" />
              {liked[index] ? (
                <RiHeartFill
                  className="heart-icon"
                  onClick={() => toggleLike(index)}
                />
              ) : (
                <RiHeartLine
                  className="heart-icon"
                  onClick={() => toggleLike(index)}
                />
              )}
            </div>

            <div
              className="newsfeed-card-img"
              style={{ backgroundImage: `url(${feed.image})` }}
            >
              <div className="overlay"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NewsfeedCards;

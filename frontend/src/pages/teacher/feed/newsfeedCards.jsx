import * as mockup from "../../mockupData.js";
import "./newsfeed-cards.scss";
import { FiEye } from "react-icons/fi";
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import { useState } from "react";

const NewsfeedCards = () => {
  const [liked, setLiked] = useState(
    new Array(mockup.events.length).fill(false)
  );
  const toggleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  return (
    <>
      {mockup.events.map((event, index) => {
        const rowNum = Math.ceil((index + 1) / 2);
        const className = rowNum % 2 === 0 ? "even-item" : "odd-item";

        return (
          <div key={index} className={`newsfeed-grid-item ${className}`}>
            <div className="content">
              <p>{event.date}</p>
              <h3>{event.title}</h3>
              <p>{event.info}</p>
              <a href={event.link}>{event.link}</a>
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
              style={{ backgroundImage: `url(${event.img})` }}
            >
              <div className="overlay"></div>
            </div>
          </div>
        );
      })}
      ;
    </>
  );
};

export default NewsfeedCards;

import React, { useEffect, useState } from "react";
import style from "./newsFeed.module.scss";
import { FeedApi } from "../../../api/feeApi";
import { toast } from "react-toastify";
import NewsFeedItem from "./newsFeedItem/newsFeedItem";
import NewsfeedCards from "./newsfeedCards";

const NewsFeed = () => {
  const [classFeeds, setClassFeeds] = useState([]);
  const [schoolFeeds, setSchoolFeeds] = useState([]);

  useEffect(() => {
    FeedApi.getFeeds()
      .then((res) => {
        setClassFeeds(res.data.filter((feed) => feed.class !== undefined));
        setSchoolFeeds(res.data.filter((feed) => !feed.class));
      })
      .catch((err) => toast.error(err));
  }, []);

  return (
    <div>
      <div>
        <h3>School Feed</h3>
        <div className={style.cards}>
          {/* {schoolFeeds.map((item) => ( */}
          {/* <NewsFeedItem feed={item} /> */}
          <NewsfeedCards feed={schoolFeeds} />
          {/* ))} */}
        </div>
      </div>
      <div>
        <h3>Class Feed</h3>
        <div className={style.cards}>
          {/* {classFeeds.map((item) => ( */}
          {/* <NewsFeedItem feed={item} /> */}
          <NewsfeedCards feed={classFeeds} />
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;

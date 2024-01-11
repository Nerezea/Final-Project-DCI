import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./newsFeed.module.scss";
import { FeedApi } from "../../../api/feeApi";
import { toast } from "react-toastify";
import { summarize } from "../../../utils/string.util";
import NewsFeedItem from "./newsFeedItem/newsFeedItem";

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
          {schoolFeeds.length === 0 && <span className={style.noData}>No School Feed 📪</span>}
          {schoolFeeds.map((item) => (
            <NewsFeedItem feed={item} />
          ))}
        </div>
      </div>
      <div>
        <h3>Class Feed</h3>
        <div className={style.cards}>
          {classFeeds.length === 0 && <span className={style.noData}>No Class Feed 📪</span>}
          {classFeeds.map((item) => (
            <NewsFeedItem feed={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;

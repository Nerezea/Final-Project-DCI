import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeedApi } from "../../../../api/feeApi";
import { toast } from "react-toastify";
import { Card, LinearProgress } from "@mui/material";
import style from "./newsFeedDetail.module.scss";
import dayjs from "dayjs";

const NewsFeedDetail = () => {
  const [feed, setFeed] = useState();
  const { id } = useParams();

  useEffect(() => {
    FeedApi.getFeed(id)
      .then((res) => {
        setFeed(res.data);
      })
      .catch((err) => toast.error(err));
  }, [id]);

  if (!feed) return <LinearProgress />;

  return (
    <Card className={style.container}>
      <img className={style.image} src={feed.image} alt="" />
      <header  className={style.header}>
        <h1 className={style.title}>{feed.title}</h1>
        <span>{dayjs(feed.date).format("D MMMM")}</span>
      </header>
      <p className={style.description}>{feed.description}</p>
    </Card>
  );
};

export default NewsFeedDetail;

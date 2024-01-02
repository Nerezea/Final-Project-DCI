import React from "react";
import style from "../newsFeed.module.scss";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { summarize } from "../../../../utils/string.util";
import { Link } from "react-router-dom";

const NewsFeedItem = ({ feed }) => {
  return (
    <div className={style.card}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: 300,
        }}
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image={feed.image}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {feed.title}
          </Typography>
          <Typography>{summarize(feed.description, 20)}</Typography>
        </CardContent>
        <CardActions>
          <Link to={`/parent/feed/${feed._id}`}>
            <Button size="small">View</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewsFeedItem;

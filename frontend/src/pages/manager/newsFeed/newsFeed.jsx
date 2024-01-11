import { Card, CardMedia, IconButton, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { FeedApi } from "../../../api/feeApi";
import { toast } from "react-toastify";
import Calendar from "../../../components/calendar/calendar";
import ModalFeed from "./components/modalFeed";
import style from "./newsFeed.module.scss";
import { Delete } from "@mui/icons-material";
import { summarize } from "../../../utils/string.util";
import { useSelector } from "react-redux";
import { Roles } from "../../../store/slice/auth.slice";
import WeekCalendar from "../../../components/weekCalendar/weekCalendar";

function NewsFeed() {
  const [openModalFeed, setOpenModalFeed] = useState(false);
  const [month, setMonth] = useState(dayjs().month());
  const [date, setDate] = useState(dayjs());
  const [feeds, setFeeds] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedFeed, setSelectedFeed] = useState();
  const { role, userId } = useSelector((store) => store.auth);
  const mobileSize = useMediaQuery("(max-width:600px)");

  function handleAddFeed(day) {
    setSelectedDate(dayjs().set("month", month).set("date", day).toISOString());
    setOpenModalFeed(true);
  }

  function handleAddWeekFeed(date) {
    setSelectedDate(dayjs(date).toISOString());
    setOpenModalFeed(true);
  }

  function handleSelectFeed(feed) {
    setOpenModalFeed(true);
    setSelectedFeed(feed);
  }

  useEffect(() => {
    updateFeeds();
  }, [month]);

  function handleDelete(e, id) {
    e.stopPropagation();
    FeedApi.deleteFeed(id)
      .then((res) => {
        updateFeeds();
      })
      .catch((err) => toast.error(err));
  }

  function updateFeeds() {
    const start = dayjs().set("month", month).startOf("month").toISOString();
    const end = dayjs().set("month", month).endOf("month").toISOString();
    FeedApi.getFeeds(start, end)
      .then((res) => {
        setFeeds(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function checkFeedIsEditable(feed) {
    if (role === Roles.MANAGER) return true;
    else if (role === Roles.TEACHER && feed.creator === userId) return true;
    return false;
  }

  const renderFeed = (feed) => {
    const feedIsEditable = checkFeedIsEditable(feed);
    return (
      <Card onClick={ () => feedIsEditable && handleSelectFeed(feed)} className={style.feed}>
        <img className={style.image} src={feed.image} />
        <span className={style.title}>Feed - {feed.title}</span>
        <span>{summarize(feed.description, 10)}</span>
        {feedIsEditable && <IconButton
          onClick={(e) => handleDelete(e, feed._id)}
          className={style.deleteBtn}
        >
          <Delete></Delete>
        </IconButton>}
      </Card>
    );
  };
  const handleCloseModal = () => {
    setOpenModalFeed(false);
    setSelectedFeed(undefined);
  };
  return (
    <div>
      {mobileSize ? (
        <WeekCalendar
          data={feeds}
          date={date}
          setDate={setDate}
          handleAddEvent={handleAddWeekFeed}
          renderEvent={renderFeed}
          title="News Feed"
        ></WeekCalendar>
      ) : (
        <Calendar
        title="News Feed"
        month={month}
        data={feeds}
        handleAddEvent={handleAddFeed}
        renderEvent={renderFeed}
        setMonth={setMonth}
      ></Calendar>
      )}
     
      <ModalFeed
        open={openModalFeed}
        onClose={handleCloseModal}
        date={selectedDate}
        updateFeeds={updateFeeds}
        feed={selectedFeed}
      />
    </div>
  );
}
export default NewsFeed;

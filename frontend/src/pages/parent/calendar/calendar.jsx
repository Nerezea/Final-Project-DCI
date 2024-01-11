import { Card, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FeedApi } from "../../../api/feeApi";
import Calendar from "../../../components/calendar/calendar";
import style from "./calendar.module.scss";
import { EventApi } from "../../../api/eventApi";
import WeekCalendar from "../../../components/weekCalendar/weekCalendar";

function ParentCalendar() {
  const [month, setMonth] = useState(dayjs().month());
  const [feeds, setFeeds] = useState([]);
  const [events, setEvents] = useState([]);
  const mobileSize = useMediaQuery("(max-width:600px)");
  const [date, setDate] = useState(dayjs());

  // function handleSelectFeed(feed) {
  //   setOpenModalFeed(true);
  //   setSelectedFeed(feed);
  // }

  useEffect(() => {
    updateFeeds();
    updateEvents();
  }, [month]);

  function updateFeeds() {
    const start = dayjs().set("month", month).startOf("month").toISOString();
    const end = dayjs().set("month", month).endOf("month").toISOString();
    FeedApi.getFeeds(start, end)
      .then((res) => {
        setFeeds(res.data.map((item) => ({ ...item, type: "feed" })));
      })
      .catch((err) => toast.error(err));
  }

  function updateEvents() {
    const start = dayjs().set("month", month).startOf("month").toISOString();
    const end = dayjs().set("month", month).endOf("month").toISOString();
    EventApi.getEvents(start, end)
      .then((res) => {
        setEvents(res.data.map((item) => ({ ...item, type: "event" })));
      })
      .catch((err) => toast.error(err));
  }
  const renderItem = (item) => {
    return (
      <Card //onClick={() => handleSelectFeed(feed)}
        className={style.item}
      >
        <img className={style.image} src={item.image} />
        <span className={style.title}>
          {item.type === "feed" ? "Feed" : "Event"} - {item.title}
        </span>
        <span>{item.description}</span>
        <span className={style.creatorRole}>{item.creator.role}</span>
      </Card>
    );
  };
  return (
    <div>
      {mobileSize ? (
        <WeekCalendar
          data={[...feeds, ...events]}
          date={date}
          setDate={setDate}
          renderEvent={renderItem}
          title="Calendar"
        ></WeekCalendar>
      ) : (
        <Calendar
          title="Calendar"
          month={month}
          data={[...feeds, ...events]}
          renderEvent={renderItem}
          setMonth={setMonth}
        ></Calendar>
      )}
    </div>
  );
}

export default ParentCalendar;

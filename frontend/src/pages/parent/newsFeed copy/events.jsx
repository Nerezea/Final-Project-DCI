import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EventApi } from "../../../api/eventApi";
import style from "./events.module.scss";
import EventItem from "./eventItem/eventItem";

const Events = () => {
  const [classEvents, setClassEvents] = useState([]);
  const [schoolEvents, setSchoolEvents] = useState([]);

  useEffect(() => {
    EventApi.getEvents()
      .then((res) => {
        setClassEvents(res.data.filter((event) => event.class !== undefined));
        setSchoolEvents(res.data.filter((event) => !event.class));
      })
      .catch((err) => toast.error(err));
  }, []);

  return (
    <div>
      <div>
        <h3>School Event</h3>
        <div className={style.cards}>
          {schoolEvents.length === 0 && (
            <span className={style.noData}>No School Event 📪</span>
          )}
          {schoolEvents.map((item) => (
            <EventItem event={item} />
          ))}
        </div>
      </div>
      <div>
        <h3>Class Event</h3>
        <div className={style.cards}>
          {classEvents.length === 0 && (
            <span className={style.noData}>No Class Event 📪</span>
          )}
          {classEvents.map((item) => (
            <EventItem event={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

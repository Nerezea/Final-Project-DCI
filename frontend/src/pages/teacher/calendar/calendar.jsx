import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as mockup from "../../mockupData.js";
import { useEffect, useState } from "react";
import "./calendar.scss";

const Kalendar = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 200 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formattedEvents = mockup.events.map((event, index) => {
    return {
      title: event.title,
      start: event.date.split(".").reverse().join("-"),
      url: event.link,
      id: `event-${index}`,
      end: event.endDate
        ? event.endDate.split(".").reverse().join("-")
        : undefined,
      allDay: true,
      color: "#721fdc",
      textColor: "white",
      className: "event-calendar",
      editable: true,
      newsfeedId: event.newsfeedId,
    };
  });

  const handleEventClick = (clickinfo) => {};

  return (
    <>
      <div className="container">
        <div className="container-calendar">
          <aside className="button-menu">
            <ul>
              {mockup.teacherButtonsCalendar.map((item, index) => (
                <li key={index}>
                  <a className="parent-buttons" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="calendar-div">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: "title",
                center: "dayGridMonth,timeGridWeek,timeGridDay",
                end: "today prev,next",
                height: "70vh",
              }}
              events={formattedEvents}
              // eventClick={handleEventClick}
            />
          </div>
        </div>
        {showButton && (
          <button className="back-to-top" onClick={handleScrollToTop}>
            <img src="/back-to-top.svg" alt="back to home button, arrow up" />
          </button>
        )}
      </div>
    </>
  );
};

export default Kalendar;

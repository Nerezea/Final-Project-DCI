import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "../feed/navbar.jsx";
import * as mockup from "../../mockupData.js";
import { useEffect, useState } from "react";

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

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/...");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-main">
        <div className="container-calendar">
          <aside className="button-menu">
            <ul>
              {mockup.teacherButtons.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
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
              className="fullcalendar"
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

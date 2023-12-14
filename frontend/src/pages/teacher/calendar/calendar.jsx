import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as mockup from "../../mockupData.js";
import { useEffect, useState, useMemo } from "react";
import { Roles } from "../../../store/slice/auth.slice.js";
import { useSelector } from "react-redux";
import { EventApi } from "../../../api/eventApi.js";
import EventModal from "./eventModal.jsx";
import ScrollToTop from "../../../components/scrollToTop.jsx";

const Kalendar = () => {
  // Events State
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Which Userrole?
  const role = useSelector((store) => store.auth.role);

  const menus = useMemo(() => {
    switch (role) {
      case Roles.TEACHER:
        return mockup.teacherButtonsCalendar;
      case Roles.PARENT:
        return mockup.parentButtonsCalendar;
    }
  }, [role]);

  // Fetch events in certain time
  const fetchEvents = (start, end) => {
    EventApi.getEvents(start, end)
      .then((res) => {
        const formattedEvents = res.data.map((event, index) => {
          return {
            title: event.title,
            start: event.date.split(".").reverse().join("-"),
            description: event.description,
            url: event.link,
            // id: `event-${index}`,
            end: event.endDate
              ? event.endDate.split(".").reverse().join("-")
              : undefined,
            // allDay: true,
            color: "#721fdc",
            textColor: "white",
            className: "event-calendar",
            editable: true,
            newsfeedId: event.newsfeedId,
          };
        });
        setEvents(formattedEvents);
      })
      .catch((err) => console.error(err));
  };

  // Create newEvent
  const handleCreateEvent = (eventData) => {
    Event.Api.createEvent(eventData)
      .then(() => {
        fetchEvents();
      })
      .catch((err) => console.error(err));
  };

  const handleEventClick = (clickinfo) => {
    setSelectedEvent(clickInfo.event);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <div className="container-calendar">
          <aside className="button-menu">
            <ul>
              {menus.map((item, index) => (
                <li key={index}>
                  <a
                    className="parent-buttons"
                    onClick={() => handleMenuItemClick(item.action)}
                  >
                    {item.label}
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
              events={events}
              eventClick={handleEventClick}
              datesSet={({ start, end }) => fetchEvents(start, end)}
            />
          </div>
        </div>
        <ScrollToTop />
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      </div>
    </>
  );
};

export default Kalendar;

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as mockup from "../../mockupData.js";
import { useEffect, useState, useMemo } from "react";
import { Roles } from "../../../store/slice/auth.slice.js";
import "./calendar.scss";
import { useSelector } from "react-redux";
import { EventApi } from "../../../api/eventApi.js";
import EventModal from "./eventModal.jsx";
import ScrollToTop from "../../../components/scrollToTop.jsx";

const handleMenuItemClick = (action) => {
  switch (action) {
    case "createEvent":
      // Open a form/modal to get event details, then call EventApi.createEvent
      break;
    case "updateEvent":
      // Show a list of events to select which to edit, then call EventApi.updateEvent
      break;
    case "deleteEvent":
      // Show a list of events to select which to delete, then call EventApi.deleteEvent
      break;
    // ... handle other actions
  }
};
const Kalendar = () => {
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
  const handleDateClick = (arg) => {
    // Open a modal or form to create a new event
    // arg.date will have the clicked date information
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleMenuItemClick = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      // Depending on modalAction, call the appropriate API method
      // Example: EventApi.createEvent(eventData)
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
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
              events={formattedEvents}
              // eventClick={handleEventClick}
              dateClick={handleDateClick}
            />
          </div>
        </div>
        <ScrollToTop />
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveEvent}
      />
    </>
  );
};

export default Kalendar;

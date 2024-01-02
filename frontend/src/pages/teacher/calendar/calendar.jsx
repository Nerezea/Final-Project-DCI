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
import EventsDetails from "./eventsDetails.jsx";
import ScrollToTop from "../../../components/scrollToTop.jsx";

const Kalendar = () => {
  // Events State
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    class: "",
    hasConsent: false,
  });

  // Events State
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showEventDetails, setShowEventDetails] = useState(false);

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

  // Using mockup Data (static like holidays etc)
  const formattedMockupData = mockup.eventsC.map((event, index) => ({
    title: event.title,
    start: event.start.split(".").reverse().join("-"),
    end: event.end ? event.end.split(".").reverse().join("-") : undefined,
    description: event.description,
    url: event.url,
    // id: `event-${index}`,
    editable: event.editable,
    color: event.color,
    textColor: event.textColor,
  }));

  // hard-coded date for schoolyear
  const startDate = `2023-08-01`;
  const endDate = `2024-08-01`;

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  // Fetch events in certain time
  const fetchEventsSchoolYear = (start, end) => {
    EventApi.getEvents(start, end)
      .then((res) => {
        const formattedEvents = res.data.map((event, index) => {
          return {
            title: event.title,
            start: formatDate(event.start),
            end: event.end ? formatDate(event.end) : undefined,
            description: event.description,
            url: event.url,
            id: `event-${index}`,
            editable: event.editable,
            color: event.color,
            textColor: event.textColor,
          };
        });
        setEvents([...formattedMockupData, ...formattedEvents]);
      })
      .catch((err) => console.error("error", err));
    // Set mockup data even if there is an error
    setEvents([...formattedMockupData]);
  };

  useEffect(() => {
    fetchEventsSchoolYear(startDate, endDate);
  }, [startDate, endDate]);

  const handleEventClick = (clickinfo) => {
    clickinfo.jsEvent.preventDefault();

    // Populate eventData for editing
    setEventData({
      title: clickinfo.event.title,
      description: clickinfo.event.extendedProps.description,
      start: clickinfo.event.start.toISOString().split("T")[0],
      end: clickinfo.event.end
        ? clickinfo.event.end.toISOString().split("T")[0]
        : "",
      class: clickinfo.event.extendedProps.classId,
      hasConsent: clickinfo.event.extendedProps.hasConsent,
    });
    setShowEventDetails(true);
    setIsModalOpen(true);
  };

  const handleDateClick = ({ dateStr }) => {
    setEventData({
      title: "",
      description: "",
      start: dateStr,
      end: dateStr,
      class: "",
      hasConsent: false,
    });
    setIsModalOpen(true);
  };

  const handleMenuItemClick = () => {
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
              dateClick={handleDateClick}
              // datesSet={({ start, end }) =>  {  fetchEventsSchoolYear(start.toISOString(), end.toISOString());}}
            />
          </div>
        </div>
        <ScrollToTop />
        <EventsDetails
          isOpen={showEventDetails}
          onClose={() => setShowEventDetails(false)}
          eventData={eventData}
          role={role}
        />
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          eventData={eventData}
          setEventData={setEventData}
        />
      </div>
    </>
  );
};
export default Kalendar;

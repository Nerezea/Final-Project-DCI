import { Card, IconButton } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { EventApi } from "../../../api/eventApi";
import Calendar from "../../../components/calendar/calendar";
import ModalEvent from "./modalEvent/modalEvent";
import style from "./events.module.scss";
import { Delete } from "@mui/icons-material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ModalAgreement from "./modalAgreement/modalAgreement";

const Events = () => {
  const [openModalEvent, setOpenModalEvent] = useState(false);
  const [openModalAgreement, setOpenModalAgreement] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [month, setMonth] = useState(dayjs().month());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [selectedEventForShowAgreements, setSelectedEventForShowAgreements] =
    useState();

  useEffect(() => {
    updateEvents();
  }, [month]);

  function updateEvents() {
    const start = dayjs().set("month", month).startOf("month").toISOString();
    const end = dayjs().set("month", month).endOf("month").toISOString();
    EventApi.getEvents(start, end)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function handleAddEvent(day) {
    setSelectedDate(dayjs().set("month", month).set("date", day).toISOString());
    setOpenModalEvent(true);
  }

  function handleSelectEvent(event) {
    setOpenModalEvent(true);
    setSelectedEvent(event);
  }

  function handleDelete(e, id) {
    e.stopPropagation();
    EventApi.deleteEvent(id)
      .then((res) => {
        updateEvents();
      })
      .catch((err) => toast.error(err));
  }

  function handleShowAgreement(eventId,e) {
    e.stopPropagation();
    setOpenModalAgreement(true);
    setSelectedEventForShowAgreements(eventId);
  }

  const renderEvent = (event) => {
    return (
      <Card onClick={() => handleSelectEvent(event)} className={style.event}>
        <span>Event - {event.title}</span>
        <span>{event.description}</span>
        <span>
          {event.hasConsent && (
            <IconButton onClick={(e) => handleShowAgreement(event._id,e)}>
              <AssignmentTurnedInIcon />
            </IconButton>
          )}
        </span>
        <IconButton
          onClick={(e) => handleDelete(e, event._id)}
          className={style.deleteBtn}
        >
          <Delete></Delete>
        </IconButton>
      </Card>
    );
  };

  const handleCloseModal = () => {
    setOpenModalEvent(false);
    setSelectedEvent(undefined);
  };
  return (
    <div>
      <Calendar
        title="Events"
        month={month}
        data={events}
        handleAddEvent={handleAddEvent}
        renderEvent={renderEvent}
        setMonth={setMonth}
      ></Calendar>

      <ModalEvent
        date={selectedDate}
        open={openModalEvent}
        onClose={handleCloseModal}
        updateEvents={updateEvents}
        event={selectedEvent}
      ></ModalEvent>

      <ModalAgreement
        open={openModalAgreement}
        onClose={() => setOpenModalAgreement(false)}
        eventId={selectedEventForShowAgreements}
      ></ModalAgreement>
    </div>
  );
};

export default Events;

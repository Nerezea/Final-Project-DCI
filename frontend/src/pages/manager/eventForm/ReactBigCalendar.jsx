import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { EventApi } from "../../../api/eventApi"; // Passe den Pfad an

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const ReactBigCalendar = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    // Lade die Ereignisse beim Mounten der Komponente
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await EventApi.getEvents();
      setEventsData(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Ereignisse:", error);
    }
  };

  const handleSelect = async ({ start, end }) => {
    const title = window.prompt("Neuer Ereignisname");
    if (title) {
      try {
        // Erstellen Sie ein neues Ereignis
        await EventApi.createEvent({
          title,
          description: "Beispielbeschreibung", // Fügen Sie eine Beispielbeschreibung hinzu oder erhalten Sie sie vom Benutzer
          start,
          end,
        });
        // Aktualisieren Sie die Ereignisse
        loadEvents();
      } catch (error) {
        console.error("Fehler beim Erstellen des Ereignisses:", error);
      }
    }
  };
  

  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default ReactBigCalendar;

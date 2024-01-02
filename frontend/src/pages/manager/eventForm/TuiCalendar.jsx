// TuiCalendar.jsx
import React, { useCallback, useRef } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule } from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import "./styles.css";
import myAxios from "./api";
import { EventApi } from "../../../api/eventApi"; 

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
const schedules = [
  {
    calendarId: "1",
    category: "time",
    isVisible: true,
    title: "Study",
    id: "1",
    body: "Test",
    start,
    end
  },
  {
    calendarId: "2",
    category: "time",
    isVisible: true,
    title: "Meeting",
    id: "2",
    body: "Description",
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  }
];

const calendars = [
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
    bgColor: "#9e5fff",
    dragBgColor: "#9e5fff",
    borderColor: "#9e5fff"
  },
  {
    id: "2",
    name: "Company",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  }
];

export default function TuiCalendar() {
  const cal = useRef(null);

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    console.log(scheduleData);

    const schedule = {
      id: String(Math.random()),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw["class"]
      },
      state: scheduleData.state
    };

    EventApi.createEvent(schedule)
      .then(response => {
        const updatedSchedules = [...schedules, response.data];
        cal.current.calendarInst.createSchedules(updatedSchedules);
      })
      .catch(error => console.error("Error creating event:", error));
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(res);

    const { id, calendarId } = res.schedule;

    EventApi.deleteEvent(id)
      .then(() => {
        const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
        cal.current.calendarInst.createSchedules(updatedSchedules);
      })
      .catch(error => console.error("Error deleting event:", error));
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(e);

    const { schedule, changes } = e;

    EventApi.updateEvent(schedule.id, changes)
      .then(response => {
        const updatedSchedules = schedules.map(s => (s.id === schedule.id ? response.data : s));
        cal.current.calendarInst.createSchedules(updatedSchedules);
      })
      .catch(error => console.error("Error updating event:", error));
  }, []);

  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];

    if (!isAllDay) {
      html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  const templates = {
    time: function (schedule) {
      console.log(schedule);
      return _getTimeTemplate(schedule, false);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to TOAST Ui Calendar</h1>

      <TUICalendar
        ref={cal}
        height="1000px"
        view="week"
        useCreationPopup={true}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </div>
  );
}

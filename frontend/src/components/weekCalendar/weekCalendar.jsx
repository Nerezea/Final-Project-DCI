import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ButtonBase, IconButton } from "@mui/material";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import style from "./calendar.module.scss";

const WeekCalendar = ({
  data,
  date,
  setDate,
  handleAddEvent,
  renderEvent,
  title,
}) => {
  const { monthLabel } = useMemo(() => {
    const firstDayOfWeek = dayjs(date).startOf("week");
    const monthLabel = firstDayOfWeek.format("MMMM YYYY");
    return {
      monthLabel,
    };
  }, [date]);

  const days = useMemo(() => {
    const days = [];
    const startDate = dayjs(date)
      .startOf("week")
      .add(dayjs().utcOffset(), "minutes");
    for (let index = 0; index < 7; index++) {
      const newDate = dayjs(startDate).add(index, "day");
      days.push({
        dateShow: newDate.format("D"),
        date: newDate,
        events: data.filter((event) =>
          dayjs(event.date).isSame(newDate, "date")
        ),
      });
    }
    return days;
  }, [data, date]);

  function handlePrevWeek() {
    setDate(dayjs(date).add(-7, "day"));
  }
  function handleNextWeek() {
    setDate(dayjs(date).add(7, "day"));
  }

  return (
    <div>
      <div className={style.pageHeader}>
        <h1>
          {title} - {monthLabel}
        </h1>
        <IconButton onClick={handlePrevWeek}>
          <ChevronLeft></ChevronLeft>
        </IconButton>
        <IconButton onClick={handleNextWeek}>
          <ChevronRight></ChevronRight>
        </IconButton>
      </div>
      <div className={style.container}>
        {days.map((item, index) => {
          return (
            <div key={index} className={style.day}>
              <span>{item.dateShow}</span>
              {item.events.map((event) => renderEvent(event))}
              {handleAddEvent && (
                <IconButton
                  onClick={() => handleAddEvent(item.date)}
                  className={style.add}
                >
                  <Add></Add>
                </IconButton>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendar;

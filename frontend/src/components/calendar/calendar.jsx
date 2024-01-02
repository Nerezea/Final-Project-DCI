import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ButtonBase, IconButton } from "@mui/material";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import style from "./calendar.module.scss";

const Calendar = ({  data, month,setMonth, handleAddEvent, renderEvent,title }) => {
  const { daysInMonth, monthLabel, dayOfWeek } = useMemo(() => {
    const date = dayjs().set("month", month).startOf("month");
    const daysInMonth = date.daysInMonth();
    const monthLabel = date.format("MMMM YYYY");
    const dayOfWeek = Math.max(0, date.day() - 1);
    return {
      daysInMonth,
      monthLabel,
      dayOfWeek,
    };
  }, [month]);

  const days = useMemo(() => {
    const days = [];
    const date = dayjs()
      .set("month", month)
      .startOf("month")
      .add(dayjs().utcOffset(), "minutes");
    for (let index = 0; index < daysInMonth; index++) {
      const newDate = dayjs(date).add(index, "day");
      days.push({
        date: newDate.toISOString(),
        events: data.filter((event) =>
          dayjs(event.date).isSame(newDate, "date")
        ),
      });
    }
    return days;
  }, [daysInMonth, data, month]);

  function handlePrevMonth() {
    setMonth(month - 1);
  }
  function handleNextMonth() {
    setMonth(month + 1);
  }


  return (
    <div>
      <div className={style.pageHeader}>
        <h1>{title} - {monthLabel}</h1>
        <IconButton onClick={handlePrevMonth}>
          <ChevronLeft></ChevronLeft>
        </IconButton>
        <IconButton onClick={handleNextMonth}>
          <ChevronRight></ChevronRight>
        </IconButton>
      </div>
      <div className={style.container}>
        <header className={style.header}>
          <span className={style.headerDay}>MON</span>
          <span className={style.headerDay}>TUE</span>
          <span className={style.headerDay}>WED</span>
          <span className={style.headerDay}>THU</span>
          <span className={style.headerDay}>FRI</span>
          <span className={style.headerDay}>SAT</span>
          <span className={style.headerDay}>SUN</span>
        </header>
        <div className={style.grid}>
          {new Array(dayOfWeek).fill("").map((item) => (
            <div className={style.grayDay}></div>
          ))}
          {days.map((item, index) => {
            return (
              <div key={index} className={style.day}>
                <span>{index + 1}</span>
                {item.events.map((event) => renderEvent(event))}
                {handleAddEvent && (
                  <ButtonBase
                    onClick={() => handleAddEvent(index + 1)}
                    className={style.add}
                  >
                    <Add></Add>
                  </ButtonBase>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

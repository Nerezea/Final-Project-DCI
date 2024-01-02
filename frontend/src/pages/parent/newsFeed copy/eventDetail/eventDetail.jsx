import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventApi } from "../../../../api/eventApi";
import { toast } from "react-toastify";
import {
  Card,
  Checkbox,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import style from "./eventDetail.module.scss";
import dayjs from "dayjs";
import { EventAgreementApi } from "../../../../api/eventAgreementApi";

const EventDetail = () => {
  const [event, setEvent] = useState();
  const { id } = useParams();
  const [isAgree, setIsAgree] = useState(false);

  function handleChangeAgree(e) {
    const checked = e.target.checked;
    if (checked)
      EventAgreementApi.ImAgree(id)
        .then(() => {
          setIsAgree(true);
        })
        .catch((err) => {
          return toast.error(err);
        });
    else
      EventAgreementApi.ImNotAgree(id)
        .then(() => {
          setIsAgree(false);
        })
        .catch((err) => toast.error(err));
  }

  useEffect(() => {
    EventApi.getEvent(id)
      .then((res) => {
        setEvent(res.data);
        // setIsAgree(res.data.)
      })
      .catch((err) => toast.error(err));
    EventAgreementApi.getAgreementStatus(id)
      .then((res) => {
        setIsAgree(res.data.agree);
      })
      .catch((err) => toast.error(err));
      
  }, [id]);

  if (!event) return <LinearProgress />;

  return (
    <Card className={style.container}>
      <header className={style.header}>
        <h1 className={style.title}>{event.title}</h1>
        <span>{dayjs(event.date).format("D MMMM")}</span>
      </header>
      <p className={style.description}>{event.description}</p>

      {event.hasConsent && (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAgree}
                onChange={handleChangeAgree}
              ></Checkbox>
            }
            label="I'm Agree!"
          ></FormControlLabel>
        </div>
      )}
    </Card>
  );
};

export default EventDetail;

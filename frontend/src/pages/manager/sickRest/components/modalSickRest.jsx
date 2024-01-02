import { Modal } from "@mui/material";
import React from "react";
import style from "./modalSickRest.module.scss";
import dayjs from "dayjs";

const ModalSickRest = ({ open, onClose, sickRest }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={style.modal}>
        <header>
          <h3>{sickRest.title}</h3>
          <span>{dayjs(sickRest.from).format("D MMM")}</span> -{" "}
          <span>{dayjs(sickRest.to).format("D MMM")}</span>
        </header>
        <p>{sickRest.description}</p>
        {sickRest.image && (
          <a target="_blank" href={sickRest.image}>
            Download File
          </a>
        )}
      </div>
    </Modal>
  );
};

export default ModalSickRest;

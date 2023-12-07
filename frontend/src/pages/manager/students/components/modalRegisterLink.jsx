import { Button, Modal } from "@mui/material";
import React, { useRef } from "react";
import style from "./modalRegisterLink.module.scss";
// https://www.npmjs.com/package/react-qr-code
import QrCode from "react-qr-code";
//https://www.npmjs.com/package/react-to-print
import ReactToPrint from "react-to-print";

const ModalRegisterLink = ({ open, onClose, classId, className }) => {
  const link = `http://localhost:5175/preRegister?class=${classId}`;

  const container = useRef();

  return (
    <Modal open={open} onClose={onClose}>
      <div className={style.modal}>
        <div className={style.contentPrint} ref={container}>
          <h1>{className}</h1>
          <p>please scan QR Code Create Account in Class A</p>
          <QrCode className={style.qrCode} value={link} />
          <pre>{link}</pre>
        </div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <Button variant="contained">Print</Button>;
          }}
          content={() => container.current}
        />
      </div>
    </Modal>
  );
};

export default ModalRegisterLink;

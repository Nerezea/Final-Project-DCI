import { AttachFile, Delete } from "@mui/icons-material";
import { Avatar, ButtonBase } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { summarizeFileName } from "../../../utils/string.util";
import style from "./message.module.scss";

const Message = ({
  text,
  userId,
  username,
  userImage,
  isSender,
  date,
  type,
  handleDelete,
}) => {
  return (
    <div
      className={style.message}
      style={{ flexDirection: isSender ? "row-reverse" : "row" }}
    >
      <Link to={`/pv/${userId}`}>
        <Avatar src={userImage}></Avatar>
      </Link>
      <div
        className={style.bubble}
        style={{ background: isSender ? "#fbf98c90" : "#dee8f452" }}
      >
        <Link to={`/pv/${userId}`}>
          <span
            className={style.sender}
            style={{ left: !isSender && "5px", right: isSender && "5px" }}
          >
            {username}
          </span>
        </Link>
        {type === "file" ? (
          <a
            target={"_blank"}
            href={text}
            download={text.substring(text.lastIndexOf("/") + 1)}
          >
            <ButtonBase className={style.file}>
              <AttachFile className={style.fileIcon}></AttachFile>
              <span className={style.fileName}>
                {summarizeFileName(
                  text.substring(text.lastIndexOf("/") + 1),
                  10
                )}
              </span>
            </ButtonBase>
          </a>
        ) : (
          <>
            <div
              className={style.text}
              style={{ textAlign: isSender ? "right" : "left" }}
            >
              {text}
            </div>
          </>
        )}
        <span className={style.date}>
          {dayjs(date).format("MMM D , HH:mm")}
        </span>
      </div>
      {handleDelete && (
        <Delete onClick={handleDelete} className={style.delete}></Delete>
      )}
    </div>
  );
};

export default Message;

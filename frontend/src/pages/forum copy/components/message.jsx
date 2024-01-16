import { Avatar, ButtonBase, IconButton } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import style from "./message.module.scss";
import { AttachFile, Delete } from "@mui/icons-material";

const Message = ({
  text,
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
      <Avatar src={userImage}></Avatar>
      <div
        className={style.bubble}
        style={{ background: isSender ? "#fbf98c" : "#f0f5fc" }}
      >
        <span
          className={style.sender}
          style={{ left: !isSender && "5px", right: isSender && "5px" }}
        >
          {username}
        </span>
        {type === "file" ? (
          <a
            target={"_blank"}
            href={text}
            download={text.substring(text.lastIndexOf("/") + 1)}
          >
            <ButtonBase className={style.file}>
              <AttachFile className={style.fileIcon}></AttachFile>
              <span className={style.fileName}>
                {text.substring(text.lastIndexOf("/") + 1)}
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

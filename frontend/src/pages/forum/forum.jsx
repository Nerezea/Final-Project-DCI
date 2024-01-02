import { AttachFile, Send } from "@mui/icons-material";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Message from "./components/message";
import style from "./forum.module.scss";
import { ForumApi } from "../../api/forumApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Roles } from "../../store/slice/auth.slice";
import { UploadApi } from "../../api/uploadApi";

const Forum = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const container = useRef();
  const inputFile = useRef();
  const { role, userId } = useSelector((store) => store.auth);
  const [forumTypeForParent, setForumTypeForParent] = useState("class");

  useEffect(() => {
    getMessages();
    scrollToBottom();
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [forumTypeForParent]);

  function getMessages() {
    ForumApi.getMessages(role === Roles.PARENT ? forumTypeForParent : undefined)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function handleSend() {
    if (text)
      ForumApi.createMessage(
        { text },
        role === Roles.PARENT ? forumTypeForParent : undefined
      )
        .then((res) => {
          messages.push(res.data);
          setMessages([...messages]);
          setText("");
          scrollToBottom();
        })
        .catch((err) => toast.error(err));
  }

  function handleKeyDown(e) {
    if (e.code === "Enter" && !e.shiftKey) handleSend();
  }

  function handleUploadFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    UploadApi.upload(formData)
      .then((res) => {
        const fileLink = res.data.link;
        ForumApi.createMessage(
          { text: fileLink, messageType: "file" },
          role === Roles.PARENT ? forumTypeForParent : undefined
        )
          .then((res) => {
            messages.push(res.data);
            setMessages([...messages]);
            setText("");
            scrollToBottom();
          })
          .catch((err) => toast.error(err));
      })
      .catch((err) => toast.error(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function handleDelete(id) {
    ForumApi.deleteMessage(id)
      .then(() => {
        setMessages(messages.filter((item) => item._id !== id));
      })
      .catch((err) => toast.error(err));
  }

  function scrollToBottom() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
    setTimeout(() => {
      container.current.scrollTo({
        left: 0,
        // scroll to bottom list
        top: container.current.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  }

  return (
    <div className={style.forum}>
      <header className={style.header}>
        <h1>Forum</h1>
        {role === Roles.PARENT && (
          <FormControl style={{ minWidth: "10rem" }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={forumTypeForParent}
              label="Type"
              onChange={(e) => setForumTypeForParent(e.target.value)}
            >
              <MenuItem value="class">Class</MenuItem>
              <MenuItem value="school">School</MenuItem>
            </Select>
          </FormControl>
        )}
      </header>
      <main className={style.messages} ref={container}>
        {messages.map((message, index) => {
          const isSender = message.user._id === userId;
          return (
            <Message
              userId={message.user._id}
              type={message.type}
              isSender={isSender}
              text={message.text}
              date={message.createdAt}
              username={
                message.user.fullName +
                " - " +
                (message.user.class?.name || message.user.role.toUpperCase())
              }
              userImage={message.user.image}
              handleDelete={
                !(role === Roles.PARENT && !isSender) &&
                (() => handleDelete(message._id))
              }
            ></Message>
          );
        })}
      </main>
      <footer className={style.footer}>
        <TextField
          className={style.input}
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
          minRows={3}
          placeholder="Type a message 🖊"
          onKeyDown={handleKeyDown}
        ></TextField>
        <div className={style.btns}>
          <IconButton className={style.sendBtn} onClick={handleSend}>
            <Send className={style.sendIcon}></Send>
          </IconButton>
          {!(role === Roles.PARENT && forumTypeForParent == "school") && (
            <IconButton
              disabled={loading}
              onClick={() => inputFile.current.click()}
            >
              {loading ? (
                <CircularProgress ></CircularProgress>
              ) : (
                <AttachFile></AttachFile>
              )}
              <input
                onChange={handleUploadFile}
                ref={inputFile}
                type="file"
                style={{ display: "none" }}
              />
            </IconButton>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Forum;

// !(a && !b )
// (!a ||  b)
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./modalEvent.module.scss";
import { EventApi } from "../../../../api/eventApi";
import { ClassesApi } from "../../../../api/classesApi";
import { toast } from "react-toastify";
import { Roles } from "../../../../store/slice/auth.slice";
import { useSelector } from "react-redux";

const ModalEvent = ({ open, onClose, date, updateEvents, event }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    hasConsent: false,
    class: "all",
  });
  const [classes, setClasses] = useState([]);
  // get role from redux
  const { role } = useSelector((store) => store.auth);

  useEffect(() => {
    // get class list data only for manager
    if (open && role === Roles.MANAGER) getAllData();
  }, [open]);

  useEffect(() => {
    if (event) setForm({ ...event, class: event.class || "all" });
  }, [event]);

  function getAllData() {
    ClassesApi.getClasses()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => toast.error(err));
  }

  const handleChangeForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    form[name] = value;
    setForm({ ...form });
  };

  const handleChangeConsent = (e) => {
    const value = e.target.checked;
    const name = e.target.name;
    form[name] = value;
    setForm({ ...form });
  };

  const handleSubmit = () => {
    const body = { ...form };
    body.date = date;
    if (body.class === "all") delete body.class;

    if (event) {
      EventApi.updateEvent(event._id, body)
        .then((res) => {
          onClose();
          setForm({
            title: "",
            description: "",
            hasConsent: false,
            class: "all",
          });
          updateEvents();
        })
        .catch((err) => toast.error(err));
    } else {
      EventApi.createEvent(body)
        .then((res) => {
          onClose();
          setForm({
            title: "",
            description: "",
            hasConsent: false,
            class: "all",
          });
          updateEvents();
        })
        .catch((err) => toast.error(err));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={style.modal}>
        <h3>{event ? "Update Event" : "Create Event"}</h3>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChangeForm}
          placeholder="title"
        ></TextField>
        <TextField
          value={form.description}
          minRows={3}
          name="description"
          label="Description"
          onChange={handleChangeForm}
          multiline
          placeholder="description"
        ></TextField>
        {/* show class input only for manager  */}
        {role === Roles.MANAGER && (
          <FormControl fullWidth>
            <InputLabel>Class (optional)</InputLabel>
            <Select
              value={form.class}
              label="Class (optional)"
              name="class"
              onChange={handleChangeForm}
            >
              <MenuItem value={"all"}>All</MenuItem>
              {classes.map((item) => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControlLabel
          label="requires approval"
          control={
            <Checkbox
              name="hasConsent"
              checked={form.hasConsent}
              onChange={handleChangeConsent}
            ></Checkbox>
          }
        ></FormControlLabel>

        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </Modal>
  );
};

export default ModalEvent;

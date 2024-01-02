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
import style from "./modalFeed.module.scss";
import { FeedApi } from "../../../../api/feeApi";
import { ClassesApi } from "../../../../api/classesApi";
import { toast } from "react-toastify";
import InputImage from "../../../../components/inputImage/inputImage";
import { Roles } from "../../../../store/slice/auth.slice";
import { useSelector } from "react-redux";

const ModalFeed = ({ open, onClose, date, updateFeeds, feed }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    class: "all",
  });
  // get role from redux 
  const { role } = useSelector((store) => store.auth);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // get class list data only for manager 
    if (open && role === Roles.MANAGER) getAllData();
  }, [open]);

  useEffect(() => {
    if (feed) setForm({ ...feed, class: feed.class || "all" });
  }, [feed]);

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

  const handleChangeImage = (image) => {
    form.image = image;
    setForm({ ...form });
  };

  const handleSubmit = () => {
    const body = { ...form };
    body.date = date;
    if (body.class === "all") delete body.class;
    if (feed) {
      FeedApi.updateFeed(feed._id, body)
        .then((res) => {
          onClose();
          setForm({
            title: "",
            description: "",
            image: "",
            class: "all",
          });
          updateFeeds();
        })
        .catch((err) => toast.error(err));
    } else {
      FeedApi.createFeed(body)
        .then((res) => {
          onClose();
          setForm({
            title: "",
            description: "",
            image: "",
            class: "all",
          });
          updateFeeds();
        })
        .catch((err) => toast.error(err));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={style.modal}>
        <h3>{feed ? "Update Feed" : "Create Feed"}</h3>
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
          maxRows={6}
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
        <InputImage value={form.image} setValue={handleChangeImage} />
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </Modal>
  );
};

export default ModalFeed;

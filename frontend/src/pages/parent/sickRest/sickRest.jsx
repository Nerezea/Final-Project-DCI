import { Button, Card, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputImage from "../../../components/inputImage/inputImage";
import style from "./sickRest.module.scss";
import { SickRestApi } from "../../../api/sickApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const SickRest = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
    image: "",
  });
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    SickRestApi.getSickRests()
      .then((res) => {
        setData(res.data);
        
      })
      .catch((err) => toast.error(err));
  }

  function handleChangeImage(image) {
    form.image = image;
    setForm({ ...form });
  }

  function handleChange(e) {
    form[e.target.name] = e.target.value;
    setForm({ ...form });
  }

  function handleSubmit(e) {
    e.preventDefault();
    SickRestApi.createSickRest(form)
      .then((res) => {
        getData();
        setForm({
            title: "",
            description: "",
            from: "",
            to: "",
            image: "",
        })
      })
      .catch((err) => toast.error(err));
  }

  return (
    <div>
      <Card>
        <form className={style.form} onSubmit={handleSubmit}>
          <h3>Create New Sick Rest</h3>
          <div className={style.inputs}>
            <TextField
              name="title"
              onChange={handleChange}
              value={form.title}
              placeholder="Title"
            ></TextField>
            <TextField
              name="from"
              onChange={handleChange}
              value={form.from}
              placeholder="From"
              type="date"
            ></TextField>
            <TextField
              name="to"
              onChange={handleChange}
              value={form.to}
              placeholder="To"
              type="date"
            ></TextField>
          </div>
          <TextField
            value={form.description}
            name="description"
            onChange={handleChange}
            placeholder="Description"
            multiline
            minRows={3}
          ></TextField>
          <InputImage value={form.image} setValue={handleChangeImage} />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
      <Divider></Divider>
      <div className={style.history}>
        <h3>History</h3>
        {data.length === 0 && <p>No Data Exists</p>}
        {data.map((item) => (
          <Card className={style.historyCard}>
            <div className={style.historyCardHeader}>
              <span className={style.title}>{item.title}</span>
              <div>

              <span>{dayjs(item.from).format("D MMM")}</span> - <span>{dayjs(item.to).format("D MMM")}</span>
              </div>
            </div>
            <div>
              <p>{item.description}</p>
            </div>
            {item.image && (
              <a target="_blank" href={item.image}>
                Download File
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SickRest;

import { Button, Card, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TeachersApi } from "../../../api/teachersApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";
import { UploadApi } from "../../../api/uploadApi";

const TeacherForm = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();

  // read more : https://reactrouter.com/en/main/hooks/use-params
  const { teacherId } = useParams();

  useEffect(() => {
    if (teacherId)
      TeachersApi.getTeacherById(teacherId).then((res) => {
        setEmail(res.data.email);
        setFullName(res.data.fullName);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teacherId) {
      const body = {
        email,
        fullName,
        image
      };
      if (password) body.password = password;
      TeachersApi.updateTeacher(teacherId, body)
        .then(() => {
          toast.success("teacher edited");
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    } else {
      TeachersApi.addTeacher({
        email,
        password,
        fullName,
        image
      })
        .then(() => {
          toast.success("teacher added");
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    UploadApi.upload(formData)
      .then((res) => {
        setImage(res.data.link);
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Card className={style.card}>
      <header>
        <h1>{teacherId ? "Edit Teacher" : "Add Teacher"}</h1>
      </header>
      <form>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="email"
        ></TextField>
        <TextField
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="FullName"
          placeholder="fullName"
        ></TextField>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          placeholder="password"
        ></TextField>

        <input type="file" onChange={handleChangeFile} />
        {image && <img src={image} width={100} />}
        <Button onClick={handleSubmit} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default TeacherForm;
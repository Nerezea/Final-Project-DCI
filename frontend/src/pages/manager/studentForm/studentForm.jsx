import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StudentsApi } from "../../../api/studentApi";
import { UploadApi } from "../../../api/uploadApi";
import style from "./style.module.scss";
import { ClassesApi } from "../../../api/classesApi";

const StudentForm = () => {
  const [classList, setClassList] = useState([]);
  const [form, setForm] = useState({
    email: "jack@gmail.com",
    fullName: "jack",
    password: "123456",
    phone: "065632586",
    image: "",
    birthDay: "2000/01/01",
    address: "some address",
    class: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // read more : https://reactrouter.com/en/main/hooks/use-params
  const { studentId } = useParams();

  useEffect(() => {
    if (studentId)
      StudentsApi.getStudentById(studentId).then((res) => {
        setForm({...form,...res.data});
      });
    ClassesApi.getClasses()
      .then((res) => {
        setClassList(res.data);
      })
      .catch((err) => toast.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId) {
      StudentsApi.updateStudent(studentId, form)
        .then(() => {
          toast.success("student edited");
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    } else {
      StudentsApi.addStudent(form)
        .then(() => {
          toast.success("student added");
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    UploadApi.upload(formData)
      .then((res) => {
        form.image = res.data.link;
        setForm({ ...form });
      })
      .catch((err) => toast.error(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    form[name] = value;
    setForm({ ...form });
  };

  return (
    <Card className={style.card}>
      <header>
        <h1>{studentId ? "Edit Student" : "Add Student"}</h1>
      </header>
      <form>
        <TextField
          value={form.email}
          name="email"
          onChange={handleChangeForm}
          label="Email"
          placeholder="email"
        ></TextField>
        <TextField
          value={form.fullName}
          onChange={handleChangeForm}
          name="fullName"
          label="FullName"
          placeholder="fullName"
        ></TextField>
        <TextField
          value={form.phone}
          onChange={handleChangeForm}
          name="phone"
          label="Phone"
          placeholder="phone"
        ></TextField>
        <TextField
          value={form.password}
          name="password"
          onChange={handleChangeForm}
          label="Password"
          type="password"
          placeholder="password"
        ></TextField>
        <TextField
          value={form.address}
          name="address"
          onChange={handleChangeForm}
          label="Address"
          placeholder="Address"
        ></TextField>
        <TextField
          value={form.birthDay}
          name="birthDay"
          onChange={handleChangeForm}
          label="BirthDay"
          placeholder="BirthDay"
        ></TextField>

        <FormControl fullWidth>
          <InputLabel>Class</InputLabel>
          <Select
            value={form.class}
            name="class"
            label="Teacher"
            onChange={handleChangeForm}
          >
            {classList.map((item) => (
              <MenuItem value={item._id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={handleChangeFile} />
        {loading && <CircularProgress></CircularProgress>}
        {form.image && <img src={form.image} width={100} />}
        <Button onClick={handleSubmit} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default StudentForm;

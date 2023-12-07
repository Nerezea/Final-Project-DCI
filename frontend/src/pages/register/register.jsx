import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import style from './register.module.scss'

const Register = () => {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    password: "",
    phone: "",
    image: "",
    birthDay: "",
    address: "",
    class: searchParams.get("class"),
  });
  const [loading, setLoading] = useState(false);

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
  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (studentId) {
    //   StudentsApi.updateStudent(studentId, form)
    //     .then(() => {
    //       toast.success("student edited");
    //       navigate(-1);
    //     })
    //     .catch((err) => toast.error(err));
    // } else {
    //   StudentsApi.addStudent(form)
    //     .then(() => {
    //       toast.success("student added");
    //       navigate(-1);
    //     })
    //     .catch((err) => toast.error(err));
    // }
  };

  return (
    <div className={style.container}>
      <Card className={style.form}>
        <h1>Register Account</h1>
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

        <input type="file" onChange={handleChangeFile} />
        {loading && <CircularProgress></CircularProgress>}
        {form.image && <img src={form.image} width={100} />}
        <Button onClick={handleSubmit} type="submit" variant="contained">
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default Register;

import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { TeachersApi } from "../../../api/teachersApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    TeachersApi.addTeacher({
      email,
      password,
      fullName,
    })
      .then(() => {
        toast.success("teacher added");
        navigate(-1);
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div>
      <header>
        <h1>Add Teacher</h1>
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
          placeholder="password"
        ></TextField>
        <Button onClick={handleSubmit} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddTeacher;

import React, { useEffect, useState } from "react";
import { TeachersApi } from "../../../api/teachersApi";
import { toast } from "react-toastify";
import { SpaRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import style from "./teachers.module.scss";
import { Link } from "react-router-dom";



const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    TeachersApi.getTeachers()
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => toast.error(err));
  }, []);

  return (
    <div className={style.page}>
      <header className={style.header}>
        <h1>Teachers</h1>
        <Link to="/manager/teachers/add">
          <Button variant="contained">Add</Button>
        </Link>
      </header>
      {teachers.map((item) => (
        <div>{item.fullName}</div>
      ))}
    </div>
  );
};

export default Teachers;

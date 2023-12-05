import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TeachersApi } from "../../../api/teachersApi";
import DataTable from "../../../components/datatable/datatable";
import style from "./teachers.module.scss";
import { AccountCircle, Delete, Edit } from "@mui/icons-material";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    TeachersApi.getTeachers()
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function handleRemoveItem(teacherId) {
    TeachersApi.deleteTeacher(teacherId)
      .then((res) => {
        // approach 1
        // setTeachers(teachers.filter(item=>item._id!==teacherId))
        // approach 2
        getAllData();
        toast.success("teacher deleted");
      })
      .catch((err) => toast.error(err));
  }

  const columns = [
    {
      header: "Name",
      accessorFn: (row) => {
        return (
          <div className={style.nameContainer}>
           {row.profile.image ?  <img src={row.profile.image} className={style.avatar} alt="" />:<AccountCircle className={style.avatar}></AccountCircle>}
            {row.fullName}
          </div>
        );
      },
    },
    { header: "Email", accessorKey: "email" },
    {
      header: "Actions",
      enableSorting: false,
      accessorFn: (row) => (
        <>
          <IconButton onClick={() => handleRemoveItem(row._id)}>
            <Delete />
          </IconButton>
          <Link to={`/manager/teachers/edit/${row._id}`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
        </>
      ),
      size: 150,
    },
  ];

  return (
    <div className={style.page}>
      <header className={style.header}>
        <h1>Teachers</h1>
        <Link to="/manager/teachers/add">
          <Button variant="contained">Add</Button>
        </Link>
      </header>

      <DataTable data={teachers} columns={columns} />
    </div>
  );
};

export default Teachers;

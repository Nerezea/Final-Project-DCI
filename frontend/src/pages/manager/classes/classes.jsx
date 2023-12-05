import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClassesApi } from "../../../api/classesApi";
import DataTable from "../../../components/datatable/datatable";
import style from "./classes.module.scss";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    ClassesApi.getClasses()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function handleRemoveItem(classId) {
    ClassesApi.deleteClass(classId)
      .then((res) => {
        getAllData();
        toast.success("class deleted");
      })
      .catch((err) => toast.error(err));
  }

  const columns = [
    {
      header: "Name",
      accessorKey : "name"
    },
    { header: "Teacher", accessorKey: "teacher.fullName" },
    {
      header: "Actions",
      enableSorting: false,
      accessorFn: (row) => (
        <>
          <IconButton onClick={() => handleRemoveItem(row._id)}>
            <Delete />
          </IconButton>
          <Link to={`/manager/classes/edit/${row._id}`}>
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
        <h1>Classes</h1>
        <Link to="/manager/classes/add">
          <Button variant="contained">Add</Button>
        </Link>
      </header>

      <DataTable data={classes} columns={columns} />
    </div>
  );
};

export default Classes;

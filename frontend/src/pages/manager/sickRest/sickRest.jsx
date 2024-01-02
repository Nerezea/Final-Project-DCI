import {
  Delete,
  Edit,
  ChildFriendly,
  People,
  Visibility,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClassesApi } from "../../../api/classesApi";
import DataTable from "../../../components/datatable/datatable";
import style from "./sickRest.module.scss";
import { SickRestApi } from "../../../api/sickApi";
import dayjs from "dayjs";
import ModalSickRest from "./components/modalSickRest";

const SickRest = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [sickRest, setSickRest] = useState();

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    SickRestApi.getSickRests()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function handleViewItem(sickRest) {
    setSickRest(sickRest);
    setOpen(true);
  }
  const columns = [
    {
      header: "Name",
      accessorFn: (row) => {
        return (
          <div className={style.nameContainer}>
            {row.image ? (
              <img src={row.user.image} className={style.avatar} alt="" />
            ) : (
              <AccountCircle className={style.avatar}></AccountCircle>
            )}
            {row.user.fullName}
          </div>
        );
      },
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    { header: "Class", accessorKey: "class.name" },
    {
      header: "Date",
      accessorFn: (row) =>
        dayjs(row.from).format("D MMMM") +
        " - " +
        dayjs(row.to).format("D MMMM"),
    },
    {
      header: "Actions",
      enableSorting: false,
      accessorFn: (row) => (
        <>
          <IconButton onClick={() => handleViewItem(row)}>
            <Visibility />
          </IconButton>
        </>
      ),
      size: 150,
    },
  ];

  return (
    <div className={style.page}>
      <header className={style.header}>
        <h1>Sick Rest</h1>
      </header>

      <DataTable data={data} columns={columns} />
     {sickRest &&  <ModalSickRest
        open={open}
        onClose={() => setOpen(false)}
        sickRest={sickRest}
      ></ModalSickRest>}
    </div>
  );
};

export default SickRest;

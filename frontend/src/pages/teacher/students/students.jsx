import { AccountCircle, Chat } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { StudentsApi } from "../../../api/studentApi";
import DataTable from "../../../components/datatable/datatable";
import style from "./students.module.scss";
import dayjs from 'dayjs'

const Students = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    StudentsApi.getStudents()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => toast.error(err));
  }




  const columns = [
    {
      header: "Name",
      accessorFn: (row) => {
        return (
          <div className={style.nameContainer}>
            {row.image ? (
              <img src={row.image} className={style.avatar} alt="" />
            ) : (
              <AccountCircle className={style.avatar}></AccountCircle>
            )}
            {row.fullName}
          </div>
        );
      },
    },
    { header: "Email", accessorKey: "email" },
    // { header: "BirthDay", accessorKey: "birthDay" },
    { header: "Phone", accessorKey: "phone" },
    { header: "BirthDay", accessorFn: (row)=>{
        return row.birthDay + (dayjs().isSame(dayjs(row.birthDay),"date") ? "🎂" : "")
    } 
  },
    {
      header: "Actions",
      enableSorting: false,
      accessorFn: (row) => (
        <>
          <Link to={`/pv/${row._id}`}>
            <IconButton >
              <Chat />
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
        <h1>Students</h1>
      </header>

      <DataTable
        data={data}
        columns={columns}
      />
    </div>
  );
};

export default Students;

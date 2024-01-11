import {
  AccountCircle,
  Add,
  AddLink,
  Delete,
  Edit,
  LinkRounded,
} from "@mui/icons-material";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TeachersApi } from "../../../api/teachersApi";
import DataTable from "../../../components/datatable/datatable";
import style from "./students.module.scss";
import { StudentsApi } from "../../../api/studentApi";
import ModalRegisterLink from "./components/modalRegisterLink";
import ResponsiveButton from "../../../components/responsiveButton/responsiveButton";

const Students = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const mobileSize = useMediaQuery("(max-width:600px)");

  const classId = searchParams.get("classId");
  const className = searchParams.get("className");

  useEffect(() => {
    getAllData();
  }, [classId]);

  function getAllData() {
    StudentsApi.getStudents(classId)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function handleRemoveItem(id) {
    StudentsApi.deleteStudent(id)
      .then((res) => {
        // approach 1
        // setTeachers(teachers.filter(item=>item._id!==teacherId))
        // approach 2
        getAllData();
        toast.success("student deleted");
      })
      .catch((err) => toast.error(err));
  }

  function handleActivateUser(id) {
    StudentsApi.activate(id)
      .then((res) => {
        getAllData();
        toast.success("student activated");
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
    { header: "Class", accessorKey: "class.name" },
    // { header: "BirthDay", accessorKey: "birthDay" },
    { header: "Phone", accessorKey: "phone" },
    {
      header: "Actions",
      enableSorting: false,
      accessorFn: (row) => (
        <>
          <IconButton onClick={() => handleRemoveItem(row._id)}>
            <Delete />
          </IconButton>
          <Link to={`/manager/students/edit/${row._id}`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
        </>
      ),
      size: 150,
    },
  ];

  if (data.find((item) => item.active === false))
    columns.splice(3, 0, {
      header: "Status",
      accessorFn: (row) =>
        row.active === false && (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleActivateUser(row._id)}
          >
            Activate
          </Button>
        ),
    });

  return (
    <div className={style.page}>
      <header className={style.header}>
        <h1>Students {className && `- ${className}`}</h1>

        {classId && (
          <ResponsiveButton
            variant="outlined"
            color="info"
            icon={<AddLink />}
            onClick={() => setOpenModal(true)}
          >
            Generate Register Link
          </ResponsiveButton>
        )}
        <Link to="/manager/students/add">
          <ResponsiveButton
            variant="outlined"
            color="info"
            icon={<Add />}
            onClick={() => setOpenModal(true)}
          >
            Add
          </ResponsiveButton>
        </Link>
      </header>

      <DataTable
        data={data}
        columns={columns}
        muiTableBodyRowProps={({ row }) => {
          return {
            sx: {
              bgcolor: row.original.active === false && "#ff000022",
            },
          };
        }}
      />
      <ModalRegisterLink
        open={openModal}
        onClose={() => setOpenModal(false)}
        classId={classId}
        className={className}
      />
    </div>
  );
};

export default Students;

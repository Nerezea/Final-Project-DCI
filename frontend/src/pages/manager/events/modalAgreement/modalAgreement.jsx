import { Avatar, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./modalAgreement.module.scss";
import { EventAgreementApi } from "../../../../api/eventAgreementApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import DataTable from "../../../../components/datatable/datatable";
import { AccountCircle } from "@mui/icons-material";

const ModalAgreement = ({ open, onClose, eventId }) => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    if (eventId) {
      EventAgreementApi.getUserAgreements(eventId)
        .then((res) => {
          setAgreements(res.data);
        })
        .catch((err) => toast.error(err));
    }
  }, [eventId]);

  const columns = [
    {
      header: "User Image",
      accessorFn: (row) => {
        return row.image ? (
          <img src={row.user.image} className={style.avatar} alt="" />
        ) : (
          <AccountCircle className={style.avatar}></AccountCircle>
        );
      },
    },
    {
      header: "User",
      accessorKey: "user.fullName",
    },
    {
      header: "Class",
      accessorKey: "user.class.name",
    },
    {
      header: "Agreement Date",
      accessorFn: (row) => dayjs(row.createdAt).format("D MMM"),
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <div className={style.modal}>
        <h3>Agreement List</h3>
        <div>
          <DataTable data={agreements} columns={columns}></DataTable>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAgreement;

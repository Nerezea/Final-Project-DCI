import React, { useState } from "react";
import { UploadApi } from "../../api/uploadApi";
import { CircularProgress } from "@mui/material";

const InputImage = ({ value, setValue }) => {
  const [loading, setLoading] = useState(false);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    UploadApi.upload(formData)
      .then((res) => {
        setValue(res.data.link);
      })
      .catch((err) => toast.error(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <input type="file" accept="image/* , .pdf" onChange={handleChangeFile} />
      {loading && <CircularProgress></CircularProgress>}
      {value && <img src={value} width={100} />}
    </div>
  );
};

export default InputImage;

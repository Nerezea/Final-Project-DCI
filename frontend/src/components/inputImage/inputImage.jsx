import React, { useRef, useState } from "react";
import { UploadApi } from "../../api/uploadApi";
import { CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import style from './inputImage.module.scss'

const InputImage = ({ value, setValue }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [fileName,setFileName]=useState("")

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    UploadApi.upload(formData)
      .then((res) => {
        setValue(res.data.link);
        setFileName(file.name);
      })
      .catch((err) => toast.error(err))
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <div className={style.input}>
      <input type="file" ref={inputRef} style={{display : "none"}} accept="image/* , .pdf" onChange={handleChangeFile} />
      <TextField  label="Image" onClick={()=>inputRef.current.click()} value={fileName}></TextField>
      {loading && <CircularProgress></CircularProgress>}
      {value && <img src={value} width={100} />}
    </div>
  );
};

export default InputImage;

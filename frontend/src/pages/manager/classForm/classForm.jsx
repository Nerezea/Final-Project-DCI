import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClassesApi } from "../../../api/classesApi";
import style from "./style.module.scss";
import { TeachersApi } from "../../../api/teachersApi";

const ClassForm = () => {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    TeachersApi.getTeachers()
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => toast.error(err));
  }, []);

  // read more : https://reactrouter.com/en/main/hooks/use-params
  const { classId } = useParams();

  useEffect(() => {
    if (classId)
      ClassesApi.getClassById(classId).then((res) => {
        setName(res.data.name);
        setTeacher(res.data.teacher);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classId) {
      const body = {
        name,
        teacher,
      };
      ClassesApi.updateClass(classId, body)
        .then(() => {
          toast.success("class updated");
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    } else {
      ClassesApi.addClass({
        name,
        teacher,
      })
        .then(() => {
          toast.success("class added");
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    }
  };

  return (
    <Card className={style.card}>
      <header>
        <h1>{classId ? "Edit Class" : "Add Class"}</h1>
      </header>
      <form>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          placeholder="name"
        ></TextField>
        <FormControl fullWidth>
          <InputLabel>Teacher</InputLabel>
          <Select
            value={teacher}
            label="Teacher"
            onChange={(e) => setTeacher(e.target.value)}
          >
            {teachers.map((item) => (
              <MenuItem value={item._id}>{item.fullName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default ClassForm;

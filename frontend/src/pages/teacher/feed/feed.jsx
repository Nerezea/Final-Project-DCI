import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
 

const Feed = () => {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    UploadApi.upload(formData)
      .then((res) => {
        setForm({ ...form, image: res.data.link }); // Aktualisieren Sie den State korrekt
      })
      .catch((err) => console.error(err)) // Verwenden Sie die Konsole für Fehlerausgaben
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    // Fügen Sie hier Logik für die Formulareinreichung hinzu, wenn erforderlich
  };

  return (
    <div>
      <input type="file" onChange={handleChangeFile} />
      {loading && <CircularProgress />}
      {form.image && <img src={form.image} alt="Uploaded" width={100} />}
      <Button onClick={handleSubmit} type="submit" variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default Feed;

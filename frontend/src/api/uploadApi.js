import myAxios from "./api";

export const UploadApi = {
  upload(formData) {
    return myAxios.post("/file/upload", formData);
  },
};

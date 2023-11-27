import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export async function login(req, res) {
  const { email, password } = req.body;
  
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user._id, email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.send({ token });
}

// export async function register(req, res) {
//   const { username, password, fullName, email } = req.body;
//   if (!username || !password || !fullName) {
//     return res
//       .status(400)
//       .send({ message: "Missing username and/or password" });
//   }
//   const user = await UserModel.findOne({ $or: [{ username }, { email }] });

//   if (user) {
//     return res.status(400).send({ message: "Username already exists" });
//   }
//   const hash = await bcrypt.hash(password, 10);

//   // oder : UserModel.create(body)
//   await UserModel.create({
//     username,
//     email,
//     fullName,
//     password: hash,
//   });
//   res.send({ message: "User created" });
// }

//test


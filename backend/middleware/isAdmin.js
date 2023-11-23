import Jwt from "jsonwebtoken";


export const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.token;
        const decode = Jwt.verify(token, process.env.JWT_SECRET);

        if (decode.role !== "admin")
          throw new Error()
        req.user = decode;
        next();
    } catch (error) {
        res.status(403).send({message: "access denied"});
    }
};

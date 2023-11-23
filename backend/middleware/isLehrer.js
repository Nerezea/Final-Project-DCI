import Jwt from "jsonwebtoken";


export const isLehrer = (req, res, next) => {
    try {
        const token = req.headers.token;
        const decode = Jwt.verify(token, process.env.JWT_SECRET);

        if (decode.role !== "lehrer")
          throw new Error()
        req.user = decode;
        next();
    } catch (error) {
        res.status(403).send({message: "access denied"});
    }
};

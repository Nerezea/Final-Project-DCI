export const hasRole =
  (...roles) =>
  (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) throw new Error();
      next();
    } catch (error) {
      res.status(403).send({ message: "access denied" });
    }
  };

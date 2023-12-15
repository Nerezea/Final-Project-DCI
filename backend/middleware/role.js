 
// Check if user has role

export const hasRole = (role) => (req, res, next) => {
  try {
    if (req.user.role !== role) throw new Error();
    next();
  } catch (error) {
    res.status(403).send({ message: "access dddddd" });
  }
};

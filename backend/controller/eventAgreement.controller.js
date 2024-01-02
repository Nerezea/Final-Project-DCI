import eventAgreement from "../models/eventAgreement.js";
import { Roles } from "../models/user.model.js";

export const getAgreements = async (req, res) => {
  const { id, role } = req.user;
  const { eventId } = req.params;
  if (role === Roles.MANAGER) {
    const data = await eventAgreement
      .find({
        event: eventId,
      })
      .populate({ path: "user", populate: { path: "class" } });
    res.send(data);
  } else if (role === Roles.TEACHER) {
    const data = await eventAgreement
      .find({
        event: eventId,
      })
      .populate("user");
    res.send(data);
  }
};

export const getAgreementStatus = async (req, res) => {
  const { eventId } = req.params;
  const { id } = req.user;

  const existAgreement = await eventAgreement.findOne({
    event: eventId,
    user: id,
  });
  if (existAgreement) res.send({ agree: true });
  else res.send({ agree: false });
};
export const ImAgree = async (req, res) => {
  const { eventId } = req.params;
  const { id } = req.user;

  const existAgreement = await eventAgreement.findOne({
    event: eventId,
    user: id,
  });
  if (existAgreement)
    return res.status(400).send({ message: "event already agreed" });

  const result = await eventAgreement.create({
    event: eventId,
    user: id,
  });

  res.send(result);
};

export const ImNotAgree = async (req, res) => {
  const { eventId } = req.params;
  const { id } = req.user;

  const existAgreement = await eventAgreement.findOneAndDelete({
    event: eventId,
    user: id,
  });
  if (!existAgreement)
    return res.status(400).send({ message: "event agreement not found" });

  res.sendStatus(200);
};

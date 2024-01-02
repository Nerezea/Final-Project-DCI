import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model("eventAgreement", schema);

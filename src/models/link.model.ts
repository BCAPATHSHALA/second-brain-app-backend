import { Schema, model } from "mongoose";

const LinkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    hash: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const LinkModel = model("Links", LinkSchema);

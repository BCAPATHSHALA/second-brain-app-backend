import { Schema, model } from "mongoose";
import { UserRoles } from "../utils/constant";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: UserRoles,
      default: "USER",
    },
  },
  { timestamps: true }
);

export const UserModel = model("Users", UserSchema);

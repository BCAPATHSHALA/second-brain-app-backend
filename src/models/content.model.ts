import { Schema, model } from "mongoose";
import { ContentTypes } from "../utils/constant";

const ContentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ContentTypes,
    },
    link: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ContentModel = model("Contents", ContentSchema);

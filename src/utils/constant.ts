import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI!;
const JWT_SECRET: string = process.env.JWT_SECRET!;
const UserRoles = ["ADMIN", "USER"];
const ContentTypes = ["TWEETER", "YOUTUBE", "DOCUMENT", "LINK", "TAG"];

const createHashRandom = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export { MONGODB_URI, UserRoles, ContentTypes, JWT_SECRET, createHashRandom };

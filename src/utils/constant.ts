import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI!;
const JWT_SECRET: string = process.env.JWT_SECRET!;
const UserRoles = ["ADMIN", "USER"];
const ContentTypes = ["TWEET", "VIDEO", "DOCUMENT", "LINK", "TAG"];

export { MONGODB_URI, UserRoles, ContentTypes, JWT_SECRET };

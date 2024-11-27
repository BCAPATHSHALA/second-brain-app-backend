import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/database";
import { userRoutes, contentRoutes, brainRoutes } from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Server is in running mode...</h1>");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/brain", brainRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongodb connection failed !!! ${err}`);
  });

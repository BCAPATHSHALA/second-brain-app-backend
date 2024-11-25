import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/database";
import { userRoutes } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Server is in running mode...</h1>");
});

app.use("/api/v1/user", userRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongodb connection failed !!! ${err}`);
  });

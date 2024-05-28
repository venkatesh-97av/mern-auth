import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
dotenv.config();
const app = express();

// routes
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => console.log(err));

app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("server listening on port: 3000");
});

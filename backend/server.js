import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import connectDB from "./config/db.js";


dotenv.config();

connectDB();


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

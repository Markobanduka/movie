import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import userRoutes from "./routes/UserRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

//  Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});

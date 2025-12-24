import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./utils/auth";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
] as string[];

const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/*any", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ success: true, message: "Hello world!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

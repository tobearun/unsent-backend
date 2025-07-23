// api/index.ts
import express from "express";
import { saveMessage, fetchUnlockedMessages } from "./firebase";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.post("/save", async (req, res) => {
  const { message, buryDurationMs } = req.body;
  await saveMessage(message, buryDurationMs);
  res.status(200).json({ status: "saved" });
});

app.get("/unlocked", async (req, res) => {
  const messages = await fetchUnlockedMessages();
  res.status(200).json(messages);
});

export default app;

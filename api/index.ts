// api/index.ts
import express, { Request, Response } from "express";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { saveMessage, fetchUnlockedMessages } from "./firebase";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/save", async (req: Request, res: Response) => {
  const { message, buryDurationMs } = req.body;
  await saveMessage(message, buryDurationMs);
  res.status(200).json({ status: "saved" });
});

app.get("/api/unlocked", async (_req: Request, res: Response) => {
  const messages = await fetchUnlockedMessages();
  res.status(200).json(messages);
});

// 👇 This is what Vercel expects: a function that handles (req, res)
export default function handler(req: IncomingMessage, res: ServerResponse) {
  const server = createServer(app);
  return server.emit("request", req, res);
}

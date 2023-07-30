import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { requireAuth } from "./middleware/auth";
import { trackRouter } from "./routes/track";

const app = express();
app.use(cors());
app.all("/api/*", requireAuth);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/track", trackRouter);

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

export default app;

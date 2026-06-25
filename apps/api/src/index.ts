import cors from "cors";
import express from "express";
import morgan from "morgan";
import { apiRouter } from "./routes/index.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ service: "Jibs Petcare Supplies & Delivery API", docs: "/api/health" });
});

app.use("/api", apiRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(400).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Jibs API running at http://localhost:${port}`);
});

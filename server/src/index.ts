import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3001;

const frontendUrl = process.env.FRONTEND_URL || "*";
app.use(cors({
  origin: frontendUrl
}));
app.use(express.json());

// Bind API routing
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("EcoSphere AI Platform Backend API Running successfully.");
});

app.listen(PORT, () => {
  console.log(`[ECOSPHERE AI BACKEND] Server listening on http://localhost:${PORT}`);
});

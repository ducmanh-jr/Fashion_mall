import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { Migrator } from "./database/migrator.js";
import { db } from "./database/connection.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Initialize Database if not already created
try {
  const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='Products'").get();
  if (!tableCheck) {
    console.log(">> CSDL chưa khởi tạo. Đang chạy Migration và nạp dữ liệu ban đầu...");
    Migrator.up();
    Migrator.seed();
  }
} catch (err: any) {
  console.error("Lỗi kiểm tra CSDL:", err.message);
}

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Public Static Frontend
const publicDir = path.resolve(__dirname, "../public");
app.use(express.static(publicDir));

// API Routes
app.use("/api", apiRoutes);

// Global Error Handler
app.use(errorHandler);

// Fallback to index.html for SPA-like navigation if file not found
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ success: false, error: "Endpoint API không tồn tại." });
    return;
  }
  res.sendFile(path.resolve(publicDir, "index.html"));
});

export const server = app.listen(PORT, () => {
  console.log("==========================================================");
  console.log(`🛍️  DM FASHION MALL (TypeScript) ĐANG CHẠY TẠI:`);
  console.log(`👉 Web Portal: http://localhost:${PORT}`);
  console.log(`👉 API Health: http://localhost:${PORT}/api/health`);
  console.log(`👉 Trang Auth: http://localhost:${PORT}/auth.html`);
  console.log("==========================================================");
});

export default app;

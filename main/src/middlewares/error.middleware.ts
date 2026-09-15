import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error("❌ [API Error]:", err.message);
  res.status(400).json({
    success: false,
    error: err.message || "Đã xảy ra lỗi trong quá trình xử lý."
  });
}

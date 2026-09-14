import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload, UserRole } from "../types/user.types.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_fashion_mall";

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, error: "Vui lòng đăng nhập để tiếp tục." });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ." });
  }
}

export function authorize(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Chưa xác thực người dùng." });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ success: false, error: "Bạn không có quyền thực hiện thao tác này." });
      return;
    }
    next();
  };
}

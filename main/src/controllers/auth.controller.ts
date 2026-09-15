import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.login(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  static getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa đăng nhập.");
      const profile = AuthService.getProfile(req.user.userId);
      res.json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  }

  static forgotPassword(req: Request, res: Response, next: NextFunction): void {
    try {
      const result = AuthService.forgotPassword(req.body);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  static verifyOtp(req: Request, res: Response, next: NextFunction): void {
    try {
      const result = AuthService.verifyOtp(req.body);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.resetPassword(req.body);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }
}

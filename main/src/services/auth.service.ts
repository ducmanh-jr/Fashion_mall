import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { queryOne, execute } from "../database/connection.js";
import { 
  IUser, 
  RegisterDTO, 
  LoginDTO, 
  AuthPayload, 
  ForgotPasswordDTO, 
  VerifyOtpDTO, 
  ResetPasswordDTO 
} from "../types/user.types.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_fashion_mall";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export class AuthService {
  static async register(dto: RegisterDTO): Promise<{ user: Partial<IUser>; token: string }> {
    const existing = queryOne<{ id: number }>("SELECT id FROM Users WHERE email = ?", dto.email);
    if (existing) {
      throw new Error("Email đã được sử dụng bởi một tài khoản khác.");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const sql = `
      INSERT INTO Users (full_name, email, password, phone, address, role)
      VALUES (?, ?, ?, ?, ?, 'CUSTOMER')
      RETURNING id, full_name, email, phone, address, role, created_at;
    `;

    const user = queryOne<IUser>(
      sql,
      dto.full_name.trim(),
      dto.email.toLowerCase().trim(),
      hashedPassword,
      dto.phone?.trim() || null,
      dto.address?.trim() || null
    )!;

    // Create an empty cart for the user
    execute("INSERT OR IGNORE INTO Carts (user_id, status) VALUES (?, 'ACTIVE')", user.id);

    const payload: AuthPayload = { userId: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });

    return { user, token };
  }

  static async login(dto: LoginDTO): Promise<{ user: Partial<IUser>; token: string }> {
    const user = queryOne<IUser>("SELECT * FROM Users WHERE email = ?", dto.email.toLowerCase().trim());
    if (!user) {
      throw new Error("Tài khoản hoặc mật khẩu không chính xác.");
    }

    const isMatch = await bcrypt.compare(dto.password, user.password || "");
    if (!isMatch) {
      throw new Error("Tài khoản hoặc mật khẩu không chính xác.");
    }

    // Ensure cart exists
    execute("INSERT OR IGNORE INTO Carts (user_id, status) VALUES (?, 'ACTIVE')", user.id);

    const payload: AuthPayload = { userId: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });

    const safeUser: Partial<IUser> = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role
    };

    return { user: safeUser, token };
  }

  static getProfile(userId: number): Partial<IUser> {
    const user = queryOne<IUser>(`
      SELECT id, full_name, email, phone, address, role, created_at 
      FROM Users WHERE id = ?
    `, userId);

    if (!user) {
      throw new Error("Không tìm thấy thông tin người dùng.");
    }

    return user;
  }

  static forgotPassword(dto: ForgotPasswordDTO): { message: string; otp_mock?: string } {
    const user = queryOne<{ id: number; email: string }>("SELECT id, email FROM Users WHERE email = ?", dto.email.toLowerCase().trim());
    if (!user) {
      return { message: "Nếu email tồn tại trên hệ thống, mã OTP đã được gửi đến hộp thư của bạn." };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    execute(`
      UPDATE Users 
      SET otp_code = ?, otp_expires_at = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, otp, expiresAt, user.id);

    console.log(`📧 [MOCK EMAIL SERVICE] OTP khôi phục mật khẩu cho ${user.email} là: [ ${otp} ] (Hết hạn sau 5 phút)`);

    return { 
      message: "Mã OTP đặt lại mật khẩu đã được gửi đến email của bạn.",
      otp_mock: process.env.NODE_ENV === "development" ? otp : undefined
    };
  }

  static verifyOtp(dto: VerifyOtpDTO): { valid: boolean; message: string } {
    const user = queryOne<{ id: number; otp_code: string; otp_expires_at: string }>(`
      SELECT id, otp_code, otp_expires_at 
      FROM Users WHERE email = ?
    `, dto.email.toLowerCase().trim());

    if (!user || !user.otp_code || user.otp_code !== dto.otp) {
      throw new Error("Mã OTP không chính xác.");
    }

    if (new Date(user.otp_expires_at) < new Date()) {
      throw new Error("Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.");
    }

    return { valid: true, message: "Mã OTP hợp lệ." };
  }

  static async resetPassword(dto: ResetPasswordDTO): Promise<{ message: string }> {
    this.verifyOtp({ email: dto.email, otp: dto.otp });

    const hashedPassword = await bcrypt.hash(dto.new_password, 10);
    execute(`
      UPDATE Users 
      SET password = ?, otp_code = NULL, otp_expires_at = NULL, updated_at = CURRENT_TIMESTAMP 
      WHERE email = ?
    `, hashedPassword, dto.email.toLowerCase().trim());

    return { message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới." };
  }
}

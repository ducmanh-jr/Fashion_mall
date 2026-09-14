export type UserRole = "CUSTOMER" | "ADMIN" | "MERCHANT";

export interface IUser {
  id: number;
  full_name: string;
  email: string;
  password?: string;
  phone?: string | null;
  address?: string | null;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface AuthPayload {
  userId: number;
  email: string;
  role: UserRole;
}

export interface RegisterDTO {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface VerifyOtpDTO {
  email: string;
  otp: string;
}

export interface ResetPasswordDTO {
  email: string;
  otp: string;
  new_password: string;
}

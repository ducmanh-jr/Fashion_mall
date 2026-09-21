/** Auth Type Definitions */

export interface AuthUser {
  userId: number;
  fullName: string;
  email: string;
  role: 'Admin' | 'Seller' | 'Customer';
  avatarUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: 'Admin' | 'Seller' | 'Customer';
  avatarUrl?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

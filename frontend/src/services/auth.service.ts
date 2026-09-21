import apiClient from './api-client';
import type { LoginRequest, RegisterRequest, LoginResponse, ForgotPasswordRequest, VerifyOtpRequest, ResetPasswordRequest } from '@/types';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ success: boolean; message: string }> {
    const res = await apiClient.post('/auth/forgot-password', data);
    return res.data;
  },

  async verifyOtp(data: VerifyOtpRequest): Promise<{ success: boolean; message: string }> {
    const res = await apiClient.post('/auth/verify-otp', data);
    return res.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<{ success: boolean; message: string }> {
    const res = await apiClient.post('/auth/reset-password', data);
    return res.data;
  },
};

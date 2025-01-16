// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v5.29.2
// source: auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface RefreshTokenRequest {
  tokenId: string;
}

export interface RefreshTokenResponse {
  authResponse?: AuthResponse | undefined;
  errorResponse?: ErrorResponse | undefined;
}

export interface SendVerificationEmailRequest {
  email: string;
}

export interface SendVerificationEmailResponse {
  errorResponse: ErrorResponse | undefined;
}

export interface VerifyEmailRequest {
  tokenId: string;
}

export interface VerifyEmailResponse {
  errorResponse: ErrorResponse | undefined;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  errorResponse: ErrorResponse | undefined;
}

export interface ResetPasswordRequest {
  tokenId: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  authResponse?: AuthResponse | undefined;
  errorResponse?: ErrorResponse | undefined;
}

export interface LoginRequest {
  email: string;
  password: string;
  googleId: string;
}

export interface LoginResponse {
  authResponse?: AuthResponse | undefined;
  errorResponse?: ErrorResponse | undefined;
}

export interface AuthResponse {
  accessToken: string;
  rpcToken: RpcToken | undefined;
}

export interface RpcToken {
  id: string;
  type: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  isRevoked: boolean;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
  googleId: string;
}

export interface RegisterResponse {
  authResponse?: AuthResponse | undefined;
  errorResponse?: ErrorResponse | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginRequest): Observable<LoginResponse>;

  register(request: RegisterRequest): Observable<RegisterResponse>;

  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse>;

  sendVerificationEmail(request: SendVerificationEmailRequest): Observable<SendVerificationEmailResponse>;

  verifyEmail(request: VerifyEmailRequest): Observable<VerifyEmailResponse>;

  forgotPassword(request: ForgotPasswordRequest): Observable<ForgotPasswordResponse>;

  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  refreshToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> | Observable<RefreshTokenResponse> | RefreshTokenResponse;

  sendVerificationEmail(
    request: SendVerificationEmailRequest,
  ): Promise<SendVerificationEmailResponse> | Observable<SendVerificationEmailResponse> | SendVerificationEmailResponse;

  verifyEmail(
    request: VerifyEmailRequest,
  ): Promise<VerifyEmailResponse> | Observable<VerifyEmailResponse> | VerifyEmailResponse;

  forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> | Observable<ForgotPasswordResponse> | ForgotPasswordResponse;

  resetPassword(
    request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> | Observable<ResetPasswordResponse> | ResetPasswordResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "login",
      "register",
      "refreshToken",
      "sendVerificationEmail",
      "verifyEmail",
      "forgotPassword",
      "resetPassword",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";

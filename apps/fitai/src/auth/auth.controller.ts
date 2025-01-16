import { Controller } from '@nestjs/common';
import {
    AuthServiceControllerMethods,
    AuthServiceController,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    SendVerificationEmailRequest,
    SendVerificationEmailResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    ForgotPasswordResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ResetPasswordResponse
}from '@app/common'
import { AuthService } from './auth.service';
@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {

    constructor(
        private readonly authService: AuthService,
    ){}


    async login(request: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(request);
    }

    async register(request: RegisterRequest): Promise<RegisterResponse> {
        return this.authService.register(request);
    }

    async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse>{
        return this.authService.refreshToken(request);
    }

    async sendVerificationEmail(request: SendVerificationEmailRequest): Promise<SendVerificationEmailResponse> {
        return this.authService.sendVerificationEmail(request);
    }

    async verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse>  { 
        return this.authService.verifyEmail(request);
    }

    async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> { 
        return this.authService.forgotPassword(request);
    }
    async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse>{ 
        return this.authService.resetPassword(request);
    }
}   

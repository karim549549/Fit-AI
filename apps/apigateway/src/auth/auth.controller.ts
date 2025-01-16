import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { 
    ForgotPasswordRequest,
    LoginRequest, 
    LoginResponse, 
    RegisterRequest, 
    RegisterResponse,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    SendVerificationEmailResponse,
    VerifyEmailResponse,
    VerifyEmailRequest,
    SendVerificationEmailRequest,
    
} from '@app/common';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    async login(@Body() request : LoginRequest):Promise<LoginResponse> 
    {
        return this.authService.login(request);
    }

    @Post('register')
    async register(@Body() request : RegisterRequest):Promise<RegisterResponse> 
    {
        return this.authService.register(request);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() request : ForgotPasswordRequest):Promise<ForgotPasswordResponse> 
    {
        return this.authService.forgetPassword(request);
    }

    @Post('reset-password')
    async resetPassword(@Body() request : ResetPasswordRequest):Promise<ResetPasswordResponse> 
    {
        return this.authService.resetPassword(request);
    }

    @Get('verify-email')
    async verifyEmail(@Query('token') token : VerifyEmailRequest):Promise<VerifyEmailResponse> 
    {
        return this.authService.verifyEmail(token);
    }

    @Post('send-verification-email')
    async sendEmailVerification(@Body() request : SendVerificationEmailRequest):Promise<SendVerificationEmailResponse> 
    {
        return this.authService.sendEmailVerification(request);
    }
}

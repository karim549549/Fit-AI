import { 
    AUTH_SERVICE_NAME,
    AuthServiceClient,
    ForgotPasswordRequest,
    LoginRequest ,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    SendVerificationEmailRequest,
    SendVerificationEmailResponse,
    ForgotPasswordResponse
} 
from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
    private authClient:AuthServiceClient;

    constructor(
        @Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc
    ){}

    onModuleInit() {
        this.authClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    async login(request :LoginRequest): Promise<LoginResponse> {
        console.log('Login request received:', request);
        try {
            console.log(this.authClient);
            const result = await this.authClient.login(request).toPromise(); // Convert Observable to Promise
            console.log('Login response:', result);
            return result;
        } catch (error) {
            console.error('Error during login:', error.message);
            throw new Error('Failed to login: ' + error.message);
        }
    }
    async register(request :RegisterRequest): Promise<RegisterResponse> {
        return this.authClient.register(request).toPromise();
    }
    async refreshToken(request :RefreshTokenRequest): Promise<RefreshTokenResponse> {
        return this.authClient.refreshToken(request).toPromise();
    }

    async sendEmailVerification(request: SendVerificationEmailRequest): Promise<SendVerificationEmailResponse> {
        return this.authClient.sendVerificationEmail(request).toPromise();
    }
    async verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse> {
        return this.authClient.verifyEmail(request).toPromise();
    }

    async forgetPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
        return this.authClient.forgotPassword(request).toPromise();
    }

    async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
        return this.authClient.resetPassword(request).toPromise();
    }
}

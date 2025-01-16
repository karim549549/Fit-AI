import { Injectable } from '@nestjs/common';
import {
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
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  Roles,
} from '@app/common'; 
import  * as bcrypt from 'bcrypt';
import { TokenManager } from './managers/token.manager';
import { Payload } from './dto/payload';
import { CreateTokenDto } from './dto/createToken.dto';
import { UserRepository } from './repositories/user.repository';
import { Tokens } from '@app/common';
import { EmailService } from '../email/email.service';
@Injectable()
export class AuthService {
  

  constructor(
    private readonly userRepository: UserRepository,
    private readonly  tokenManager: TokenManager,
    private readonly emailService : EmailService
  ) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findUserByEmail(request.email);

    if (!user || !await bcrypt.compare(request.password, user.hashedPassword)) {
      return {
        errorResponse: {
          code: 404,
          message: 'User not found',
        },
      };
    }

    const accessToken =  await this.tokenManager.createAccessToken(new Payload(
      user.id,
      user.email,
      user.role,
    ));

    const refreshToken = await this.tokenManager.createToken(new CreateTokenDto(
      user.id,
      Tokens.REFRESH_TOKEN ,
    ) , true);


    return { authResponse: { accessToken, rpcToken: refreshToken } };
    //create accessTOken   ,  createRefreshToken  
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    // validate user  


    const foundUser  = await  this.userRepository.findUserByEmail(request.email);

    if (foundUser) {
      return {
        errorResponse: {
          code: 400,
          message: 'User already exists',
        },
      };
    }

    const user  = await this.userRepository.createUser({
      email: request.email,
      hashedPassword: await bcrypt.hash(request.password , 10),
      role: Roles.USER,
    });
    const accessToken =  await this.tokenManager.createAccessToken(new Payload(
      user.id,
      user.email,
      user.role,
    ));

    const refreshToken = await this.tokenManager.createToken(new CreateTokenDto(
      user.id,
      Tokens.REFRESH_TOKEN ,
    ) , true);  

    console.log('User created:', user ,  { accessToken, rpcToken: refreshToken } );
    //send welcomeEmail 

    return { authResponse: { accessToken, rpcToken: refreshToken } };
  }

  async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    // Mock refresh token response
    console.log('RefreshToken request received:', request);
    return {
        authResponse: {
            accessToken: 'new_dummy_access_token',
            rpcToken: {
              id: 'new_dummy_id',
              type: 'bearer',
              userId: 'dummy_user_id',
              createdAt: '2025-01-01T00:00:00Z',
              expiresAt: '2025-01-02T00:00:00Z',
              isRevoked: false,
            },
        }, 
    };
  }

  async sendVerificationEmail(request: SendVerificationEmailRequest): Promise<SendVerificationEmailResponse> {
    const user = await this.userRepository.findUserByEmail(request.email);

    if (!user || user.isEmailConfirmed) {
      return {
        errorResponse: {
          code: 404,
          message: 'User not found',
        },
      };
    }

    const emailToken = await this.tokenManager.createToken(new CreateTokenDto(
      user.id,
      Tokens.EMAIL_VERIFICATION_TOKEN,
    ) , false);

    await this.emailService.sendVerifyEmail(
      "karim" ,
      user.email,
      emailToken,
    );

    return {
      errorResponse: {
        code: 0,
        message: 'Verification email sent successfully.',
      },
    };
  }

  async verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    
    const user = await this.tokenManager.ValidateToken(request.tokenId , Tokens.EMAIL_VERIFICATION_TOKEN);

    if (!user) {
      return {
        errorResponse: {
          code: 404,
          message: 'User not found',
        },
      };
    }

    await this.userRepository.updateUser(user.id , Roles.USER);

    return {
      errorResponse: {
        code: 0,
        message: 'Email verified successfully.',
      },
    };
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const user  = await this.userRepository.findUserByEmail(request.email);

    if (!user) {
      return {
        errorResponse: {
          code: 404,
          message: 'User not found',
        },
      };
    }

    await this.emailService.sendForgotPasswordEmail(
      "karim" ,
      user.email,
      'Please reset your password.');

    return {
      errorResponse: {
        code: 0,
        message: 'Password reset instructions sent to the email.',
      },
    };
  }

  async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const user =  await this.tokenManager.ValidateToken(request.tokenId , Tokens.RESET_PASSWORD_TOKEN);

    if (!user) {
      return {
        errorResponse: {
          code: 404,
          message: 'User not found',
        },
      };
    }
    const hashPassword= await bcrypt.hash(request.newPassword , 10);
    await this.userRepository.updateUser(user.id , hashPassword);
    
    const accessToken =  await this.tokenManager.createAccessToken(new Payload(
      user.id,
      user.email,
      user.role,
    ));

    const refreshToken = await this.tokenManager.createToken(new CreateTokenDto(
      user.id,
      Tokens.REFRESH_TOKEN ,
    ) , true);

    return { authResponse: { accessToken, rpcToken: refreshToken } };
  }
}

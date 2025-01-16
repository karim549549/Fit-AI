import { Injectable } from "@nestjs/common";
import { TokenFactory } from "../factories/token.factory";
import { Tokens } from "@app/common";
import  { HttpStatus } from "@nestjs/common";
import { Payload } from "../dto/payload";
import { LoginResponse } from "@app/common";
import { TokenRepository } from "../repositories/token.repository";
import { CreateTokenDto } from "../dto/createToken.dto";

@Injectable()
export class TokenManager {
    constructor(
        private readonly tokenRepository : TokenRepository,
        private readonly tokenFactory : TokenFactory
    ) {}
    async refreshTokenHandler(token_id : string) : Promise<LoginResponse> {

        const user =  await this.ValidateToken(token_id ,Tokens.REFRESH_TOKEN);

        if(!user)
            return { errorResponse: { code: HttpStatus.UNAUTHORIZED, message: "Unauthorized" } };


        const accessToken = await this.tokenFactory.createAccessToken(new Payload(
            user.id,
            user.email
        ));

        const refreshToken = await this.tokenFactory.createToken(new CreateTokenDto(
            user.id,
            Tokens.REFRESH_TOKEN,
        ), true);

        return { authResponse: { accessToken, rpcToken: refreshToken } };
    } 
    async  createToken (dto : CreateTokenDto,  revokeToken : boolean = false) : Promise<any> {
        return await this.tokenFactory.createToken(dto , revokeToken);
    }
    async createAccessToken (payload : Payload) : Promise<string> {
        return await this.tokenFactory.createAccessToken(payload);
    }
    async ValidateToken (token_id : string ,type : string) : Promise<any> {
        const foundToken =  await this.tokenRepository.getToken(token_id);

        if(!foundToken || foundToken.isRevoked || foundToken.expireAt < new Date() || foundToken.type !== type)
            return null;

        await this.tokenRepository.revokeUserTokens(foundToken.userId, foundToken.type);
        return foundToken.user;
    }
    async RevokeAllUserTokens (userId : string) : Promise<void> {
        await this.tokenRepository.revokeUserTokens(userId, Tokens.REFRESH_TOKEN);
    }
}
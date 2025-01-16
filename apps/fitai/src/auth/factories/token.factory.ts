import { Injectable } from "@nestjs/common";
import  { JwtService } from "@nestjs/jwt";
import { Payload } from "../dto/payload";
import { CreateTokenDto } from "../dto/createToken.dto";
import { TokenRepository } from "../repositories/token.repository";
import { RpcToken  } from "@app/common/types/auth";
import {Token as PrismaToken} from "@prisma/client";

@Injectable()
export  class TokenFactory {
    constructor(
        private readonly JwtService: JwtService,
        private readonly tokenRepository: TokenRepository
    ) {}
    async createAccessToken (payload: Payload ): Promise<string> {
        return await this.JwtService.signAsync({
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
        });
    }
    async createToken(dto : CreateTokenDto , revokeToken : boolean = false ): Promise<any> {
        await this.tokenRepository.revokeUserTokens(dto.userId, dto.type);
        if (revokeToken) {
            await this.tokenRepository.revokeUserTokens(dto.userId, dto.type);
        }
        const token = await this.tokenRepository.createToken(dto);
        return this.toRpcToken(token);
    }
    private toRpcToken(token: PrismaToken): RpcToken {
        const rpcToken: RpcToken = {
            ...token,
            createdAt: this.toISO8601(token.createdAt),
            expiresAt: this.toISO8601(token.expireAt),
        }
        return rpcToken;
    }
    private toISO8601(date: Date): string {
        return date.toISOString();
    }
}
import { Injectable } from "@nestjs/common";

import { PrismaService } from "apps/fitai/prisma/prisma.service";
import { CreateTokenDto } from "../dto/createToken.dto";

@Injectable()
export  class TokenRepository {
    constructor(
        private readonly  prisma : PrismaService
    ) {}

    async createToken(dto: CreateTokenDto): Promise<any> {
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + dto.expiredAt); 
        return await this.prisma.token.create({
            data: {
                userId: dto.userId,
                type: dto.type,
                expireAt: expirationTime,  // Pass Date object
            },
            include: {
                user: true,
            },
        });
    }
    async revokeUserTokens(userId : string, type : string) : Promise<void> {
        await this.prisma.token.updateMany({
            where : {
                userId : userId,
                type : type
            },
            data : {
                isRevoked : true
            }
        })
    } 
    async getToken(id : string) : Promise<any> {
        return await this.prisma.token.findUnique({
            where : {
                id : id
            },
            include : {
                user : true
            }
        })
    }
}
import { Tokens } from "@app/common";

export class CreateTokenDto {
    userId: string;
    type: string;
    expiredAt: number;  // Changed to a number, as expiration time in Prisma expects a number

    constructor(
        userId: string,
        type: string,
        expiredAt: number = parseInt(this.mapExpireData(type))  // Ensure expiredAt is a number
    ) {
        this.userId = userId;
        this.type = type;
        this.expiredAt = expiredAt;
    }

    private mapExpireData(type: string): string {
        if (type === Tokens.REFRESH_TOKEN) return process.env.REFRESH_TOKEN_EXPIRE_AT!;
        if (type === Tokens.EMAIL_VERIFICATION_TOKEN) return process.env.EMAIL_VERIFICATION_TOKEN_EXPIRY!;
        if (type === Tokens.RESET_PASSWORD_TOKEN) return process.env.FORGET_PASSWORD_TOKEN_EXPIRE_AT!;
        return process.env.ACCESS_TOKEN_EXPIRY!;
    }
}
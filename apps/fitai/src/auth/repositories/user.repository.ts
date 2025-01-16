
import { Injectable } from "@nestjs/common";
import { PrismaService } from "apps/fitai/prisma/prisma.service";


@Injectable()
export class UserRepository {
    constructor(
        private readonly prisma  :PrismaService
    ) {}


    async createUser(data: any) {
        return await this.prisma.user.create({
            data:{
                ...data
            }
        })
    }

    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where:{
                email
            }
        })
    }
    async updateUser(id: string, data: any) {
        return await this.prisma.user.update({
            where:{
                id
            },
            data:{
                ...data
            }
        })
    }
}
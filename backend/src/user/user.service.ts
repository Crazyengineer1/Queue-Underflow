import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/DTO/userRegister.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }

    async createUser(registerData: RegisterDto) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: registerData.email,
                    username: registerData.username,
                    password: registerData.password
                }
            });
            return {
                "MSG": "User created",
                "name": user.username
            };
        } catch (error) {
            return error;
        }
    }
}

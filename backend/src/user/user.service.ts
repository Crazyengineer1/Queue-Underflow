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
        const user = await this.prisma.user.create({
            data: {
                email: registerData.email,
                username: registerData.username,
                password: registerData.password
            }
        });

        return {
            "id": user.id,
            "username": user.username,
            "email": user.email
        };

    }
}

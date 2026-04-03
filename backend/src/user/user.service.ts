import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/DTO/userRegister.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }
    async register(registerData: RegisterDto) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: String(registerData.email),
                    username: String(registerData.username),
                    password: String(registerData.password)
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

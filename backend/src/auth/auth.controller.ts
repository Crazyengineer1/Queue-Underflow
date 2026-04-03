import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/userRegister.dto';
import bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerData: RegisterDto) {
        const salt = 11;
        const hashPass = await bcrypt.hash(registerData.password, salt);
        return this.authService.register({ ...registerData, "password": hashPass });
    }
}

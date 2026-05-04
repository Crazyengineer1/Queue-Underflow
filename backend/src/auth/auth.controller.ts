import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/userRegister.dto';
import { LoginDto } from './DTO/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerData: RegisterDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.register(registerData, res);
    }

    @Post('login')
    async login(@Body() loginData: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(loginData, res);
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }
}

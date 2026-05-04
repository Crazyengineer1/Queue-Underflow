import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './DTO/userRegister.dto';
import { LoginDto } from './DTO/login.dto';
import type { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

    async handleAuth(user: any, res: Response) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET not defined");
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            secret,
            { expiresIn: "20d" }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: 'lax',
            maxAge: 20 * 24 * 60 * 60 * 1000,
        });

        return {
            message: "Success",
            username: user.username,
        };
    }

    async register(registerData: RegisterDto, res: Response) {
        const emailCheck = await this.userService.findByEmail(registerData.email);
        if (emailCheck) {
            throw new ConflictException('Email already in use');
        }

        const usernameCheck = await this.userService.findByUsername(registerData.username);
        if (usernameCheck) {
            throw new ConflictException('Username already in use');
        }

        const saltRounds = 11;
        const hashPass = await bcrypt.hash(registerData.password, saltRounds);

        const user = await this.userService.createUser({ ...registerData, "password": hashPass });

        return this.handleAuth(user, res);
    }

    async login(loginData: LoginDto, res: Response) {
        const user = await this.userService.findByEmail(loginData.email);

        const isValid =
            user && (await bcrypt.compare(loginData.password, user.password));

        if (!isValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return this.handleAuth(user, res);
    }

    async logout(res: Response) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false, // true in production
            sameSite: 'lax',
            maxAge: 20 * 24 * 60 * 60 * 1000,
        });

        return {
            "message": "User logged out"
        }
    }
}

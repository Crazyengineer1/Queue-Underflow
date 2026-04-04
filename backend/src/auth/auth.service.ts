import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './DTO/userRegister.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

    async register(registerData: RegisterDto) {
        const emailCheck = await this.userService.findByEmail(registerData.email);

        if (emailCheck) {
            throw new ConflictException('Email already in use');
        }

        const usernameCheck = await this.userService.findByUsername(registerData.username);

        if (usernameCheck) {
            throw new ConflictException('Username already in use');
        }

        const salt = 11;
        const hashPass = await bcrypt.hash(registerData.password, salt);

        return this.userService.createUser({ ...registerData, "password": hashPass });
    }
}

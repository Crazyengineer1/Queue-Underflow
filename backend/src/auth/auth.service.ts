import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './DTO/userRegister.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

    register(registerData: RegisterDto) {
        return this.userService.register(registerData);
    }
}

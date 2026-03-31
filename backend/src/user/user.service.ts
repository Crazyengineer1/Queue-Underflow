import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/DTO/userRegister.dto';

@Injectable()
export class UserService {
    register(registerData: RegisterDto) {
        console.log(registerData);
        return registerData;

    }
}

import { IsEmail, IsString, Matches } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email!: string;

    @IsString()
    username!: string;

    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message:
            'Password must be at least 8 characters long and include a letter, number, and special character',
    })
    password!: string;

}
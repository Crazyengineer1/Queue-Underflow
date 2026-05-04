import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUser(@Req() req) {
        return this.userService.getUserInfo(req.user.id);
    }

}

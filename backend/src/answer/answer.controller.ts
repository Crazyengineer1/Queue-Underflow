import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AuthGuard } from '@nestjs/passport';
import { answerDto } from './DTO/answer.dto';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id')
    create(@Param('id') id: string, @Body() answerData: answerDto, @Req() req) {
        return this.answerService.createAnswer(answerData, req.user.id, id);
    }

    @Get(':id')
    getAnswers(@Param('id') id: string) {
        return this.answerService.getAnswer(id);
    }
}

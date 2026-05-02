import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
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
    getAnswers(@Query('page') page: number, @Query('limit') limit: string, @Param('id') id: string) {
        return this.answerService.getAnswer(id, Number(page), Number(limit));
    }
}

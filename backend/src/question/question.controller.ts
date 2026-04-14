import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { questionDto } from './DTO/question.dto';
import { AuthGuard } from '@nestjs/passport';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) { }

    @Get()
    getQuestions(@Query('page') page: string, @Query('limit') limit: string) {
        return this.questionService.getQuestions(
            Number(page) || 1,
            Number(limit) || 10
        );
    }

    @Get(':id')
    getQueston(@Param('id') id: string) {
        // return `ID is ${id}`;
        return this.questionService.findbyID(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Body() questionData: questionDto, @Req() req) {
        return this.questionService.createQuestion(questionData, req.user.id)
    }
}

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { questionDto } from './DTO/question.dto';
import { AuthGuard } from '@nestjs/passport';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Body() questionData: questionDto, @Req() req) {
        return this.questionService.createQuestion(questionData, req.user.id)
    }
}

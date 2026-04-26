import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { commentDto } from './DTO/comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('question/:id')
    questionCommet(@Param('id') id: string, @Body() commentData: commentDto, @Req() req) {
        return this.commentService.createQuestionComment(commentData, id, req.user.id);
    }

    @Get('question/:id')
    getQuestionComments(@Query('page') page: string, @Query('limit') limit: string, @Param('id') id: string) {
        return this.commentService.getQuestionComments(id, Number(page) || 1, Number(limit) || 10)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('answer/:id')
    answerCommet(@Param('id') id: string, @Body() commentData: commentDto, @Req() req) {
        return this.commentService.createAnswerComment(commentData, id, req.user.id);
    }
}

import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
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

    @UseGuards(AuthGuard('jwt'))
    @Post('answer/:id')
    answerCommet(@Param('id') id: string, @Body() commentData: commentDto, @Req() req) {
        return this.commentService.createAnswerComment(commentData, id, req.user.id);
    }
}

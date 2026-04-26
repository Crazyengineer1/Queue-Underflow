import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { commentDto } from './DTO/comment.dto';

@Injectable()
export class CommentService {
    constructor(private readonly prismaService: PrismaService) { }
    async createQuestionComment(commentData: commentDto, questionId: string, userId: string) {
        const comment = await this.prismaService.questionComment.create({
            data: {
                content: commentData.content,
                userId,
                questionId,
            }
        });
        return {
            "message": "Comment added"
        }
    }

    createAnswerComment(commentData: commentDto, answerId: string, userId: string) {
        const comment = this.prismaService.answerComment.create({
            data: {
                content: commentData.content,
                answerId,
                userId,
            }
        })
        return {
            "message": "Comment added"
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { commentDto } from './DTO/comment.dto';

@Injectable()
export class CommentService {
    constructor(private readonly prismaService: PrismaService) { }
    async createQuestionComment(commentData: commentDto, questionId: string, userId: string) {
        const data = await this.prismaService.question.findUnique({
            where: { id: questionId }
        });

        if (!data) {
            throw new NotFoundException("Question Not found");
        }
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
}

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

    async getQuestionComments(questionId: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [comments, total] = await Promise.all([
            this.prismaService.questionComment.findMany({
                skip,
                take: limit,
                where: { questionId },
            }),
            this.prismaService.questionComment.count({ where: { questionId } })
        ]);

        return {
            data: comments,
            page,
            limit,
            total,
        };
    }

    async createAnswerComment(commentData: commentDto, answerId: string, userId: string) {
        const data = await this.prismaService.answer.findUnique({
            where: { id: answerId }
        });

        if (!data) {
            throw new NotFoundException("Answer Not found");
        }
        const comment = await this.prismaService.answerComment.create({
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

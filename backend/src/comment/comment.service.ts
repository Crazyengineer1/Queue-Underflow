import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { commentDto } from './DTO/comment.dto';

@Injectable()
export class CommentService {
    constructor(private readonly prismaService: PrismaService) { }

    private async validateExistence(model: any, id: string, entityName: string) {
        const data = await model.findUnique({ where: { id } });

        if (!data) {
            throw new NotFoundException(`${entityName} not found`)
        }
    }

    private async createComment(model: any, data: any) {
        await model.create({ data });
        return { message: "Comment added" };
    }

    async createQuestionComment(commentData: commentDto, questionId: string, userId: string) {
        await this.validateExistence(this.prismaService.question, questionId, "Question");

        return await this.createComment(this.prismaService.questionComment, {
            content: commentData.content,
            userId,
            questionId,
        });
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
        await this.validateExistence(this.prismaService.answer, answerId, "Answer");

        return this.createComment(this.prismaService.answerComment, {
            content: commentData.content,
            answerId,
            userId,
        });
    }
}

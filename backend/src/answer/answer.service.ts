import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { answerDto } from './DTO/answer.dto';

@Injectable()
export class AnswerService {
    constructor(private readonly prismaService: PrismaService) { }
    async createAnswer(answerData: answerDto, userId: string, questionId: string) {
        const data = await this.prismaService.question.findUnique({
            where: { id: questionId }
        });

        if (!data) {
            throw new NotFoundException("Question Not found");
        }

        const answer = await this.prismaService.answer.create({
            data: {
                content: answerData.content,
                userId,
                questionId,
            }
        });

        return {
            "message": "Answer added"
        }
    }

    async getAnswer(questionId: string, page: number, limit: number) {

        const question = await this.prismaService.question.findUnique({
            where: { id: questionId }
        })

        if (!question) {
            throw new NotFoundException("Question not found");
        }

        const skip = (page - 1) * limit;
        const [answers, total] = await Promise.all([
            this.prismaService.answer.findMany({
                skip,
                take: limit,
                where: { questionId },
            }),
            this.prismaService.answer.count({ where: { questionId } })
        ])

        return {
            data: answers,
            page,
            limit,
            total,
        }
    }
}

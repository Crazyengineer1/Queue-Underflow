import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { answerDto } from './DTO/answer.dto';

@Injectable()
export class AnswerService {
    constructor(private readonly prismaService: PrismaService) { }
    async createAnswer(answerData: answerDto, userId: string, questionId: string) {
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

    async getAnswer(questionId: string) {
        const data = this.prismaService.answer.findMany({
            where: { questionId }
        })

        if (!data) {
            throw new NotFoundException("Answers not found");
        }
        return data;
    }
}

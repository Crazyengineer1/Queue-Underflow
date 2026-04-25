import { Injectable } from '@nestjs/common';
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
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { questionDto } from './DTO/question.dto';

@Injectable()
export class QuestionService {
    constructor(private readonly prisma: PrismaService) { }

    async getQuestions(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const [questions, total] = await Promise.all([
            this.prisma.question.findMany({
                skip,
                take: limit,
                select: {
                    id: true,
                    title: true,
                    created_at: true,
                },
                orderBy: {
                    created_at: 'desc',
                },
            }),
            this.prisma.question.count(),
        ]);

        return {
            data: questions,
            page,
            limit,
            total,
        };

    }

    async createQuestion(questionData: questionDto, userId: string) {
        const question = await this.prisma.question.create({
            data: {
                title: questionData.title,
                description: questionData.description,
                userId,
            }
        });

        return {
            "id": question.id,
            "message": "Question created"
        }
    }
}

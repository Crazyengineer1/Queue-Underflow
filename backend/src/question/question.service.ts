import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { questionDto } from './DTO/question.dto';

@Injectable()
export class QuestionService {
    constructor(private readonly prisma: PrismaService) { }
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

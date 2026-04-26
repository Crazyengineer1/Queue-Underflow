import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { commentDto } from './DTO/comment.dto';

@Injectable()
export class CommentService {
    constructor(private readonly prismaService: PrismaService) { }
    createQuestionComment(commentData: commentDto, questionId: string, userId: string) {
        const comment = this.prismaService.questionComment.create({
            data: {
                content: commentData.content,
                questionId,
                userId,
            }
        })
        return {
            "message": "Comment added"
        }
    }

}

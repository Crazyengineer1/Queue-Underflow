import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, PrismaModule, QuestionModule, AnswerModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

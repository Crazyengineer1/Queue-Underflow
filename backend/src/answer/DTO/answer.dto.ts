import { IsString } from "class-validator";

export class answerDto {
    @IsString()
    content!: string;
}
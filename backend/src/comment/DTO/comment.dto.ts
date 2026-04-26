import { IsString } from "class-validator";

export class commentDto {
    @IsString()
    content!: string;
}
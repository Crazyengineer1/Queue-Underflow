import { IsString } from "class-validator";

export class questionDto{
    @IsString()
    title!: string;

    @IsString()
    description!: string;
}
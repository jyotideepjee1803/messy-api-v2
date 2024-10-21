import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoticeDto {
    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    body: string;
}
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDayDto {
    @IsString()
    @IsNotEmpty()
    day : string;

    @IsString()
    @IsNotEmpty()
    breakfast : string;

    @IsString()
    @IsNotEmpty()
    lunch : string;

    @IsString()
    @IsNotEmpty()
    dinner : string;
}
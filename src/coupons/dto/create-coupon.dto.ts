import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsNotEmpty, ValidateNested } from "class-validator";

class BooleanArrayDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsBoolean({ each: true })
    items: boolean[];
}

export class CreateCouponDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsBoolean()
    taken: boolean;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => BooleanArrayDto)
    week: BooleanArrayDto[];
}
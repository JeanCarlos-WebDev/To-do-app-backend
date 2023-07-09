import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    user_id?: number

    @IsNotEmpty()
    @IsString()
    title: string;


}

import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    user_id?: number

    @IsNotEmpty()
    @IsString()
    title: string;


}

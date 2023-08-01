import {IsNotEmpty, IsNumber, IsString, MaxLength, } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    title: string;

    @IsString()
    @MaxLength(250)
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;


    @IsNotEmpty()
    @IsNumber()
    importance?: number

    @IsNumber()
    number_of_pomodoros?: number;

    expiration_date?: string;
    
    category_id?: number | null

}

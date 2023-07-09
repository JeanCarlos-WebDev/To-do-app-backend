import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";

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
    pomodoros: number;

    @IsNotEmpty()
    @IsNumber()
    importance?: number

    @IsNumber()
    number_of_pomodoros?: number;

    @IsNotEmpty()
    @IsDate()
    expiration_day?: Date;

    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @IsNotEmpty()
    category_id?: number | null

}

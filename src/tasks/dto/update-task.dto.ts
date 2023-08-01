import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsInt, IsNumber, ValidateIf } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ValidateIf(o => typeof o.pomodoros !== 'undefined')
    @IsInt()
    pomodoros?: number
}

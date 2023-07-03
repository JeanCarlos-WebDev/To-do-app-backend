import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsInt } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    @IsInt()
    id: number;

}

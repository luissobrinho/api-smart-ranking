import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Evento } from '../entities/categoria.entity';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @IsString()
  @IsOptional()
  readonly descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}

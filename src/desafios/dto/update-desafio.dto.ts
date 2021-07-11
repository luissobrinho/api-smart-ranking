import { DesafioStatusEnum } from '../enum/desafio-status.enum';
import { IsOptional } from 'class-validator';

export class UpdateDesafioDto {
  @IsOptional()
  dataHoraDesafio: Date;

  @IsOptional()
  status: DesafioStatusEnum;
}

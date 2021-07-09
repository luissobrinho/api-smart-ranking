import { IsNotEmpty } from 'class-validator';

export class AtualizarJogadorDto {
  @IsNotEmpty({ message: 'INPUT.TELEPHONE_NOT_EMPTY' })
  readonly telefoneCelular: string;

  @IsNotEmpty({ message: 'INPUT.NAME_NOT_EMPTY' })
  readonly nome: string;
}

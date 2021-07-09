import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty({ message: 'INPUT.TELEPHONE_NOT_EMPTY' })
  readonly telefoneCelular: string;

  @IsEmail()
  @IsNotEmpty({ message: 'INPUT.EMAIL_NOT_EMPTY' })
  readonly email: string;

  @IsNotEmpty({ message: 'INPUT.NAME_NOT_EMPTY' })
  readonly nome: string;
}

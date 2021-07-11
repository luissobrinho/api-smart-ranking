import { Jogador } from '../../jogadores/interfaces/jogador.interface';
import { Resultado } from '../entities/desafio.entity';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class CreatePartidaDto {
  @IsNotEmpty()
  def: Jogador;

  @IsArray()
  @ArrayMinSize(2)
  resultado: Array<Resultado>;
}

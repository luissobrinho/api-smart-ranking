import { Document } from 'mongoose';
import { Jogador } from '../../jogadores/interfaces/jogador.interface';
import { DesafioStatusEnum } from '../enum/desafio-status.enum';

export interface DesafioEntity extends Document {
  dataHoraDesafio: Date;
  status: DesafioStatusEnum;
  dataHoraSolicitacao: Date;
  dataHoraResponta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Array<Jogador>;
  partida: Partida;
}

export interface Partida extends Document {
  categoria: string;
  jogadores: Array<Jogador>;
  def: Jogador;
  resultado: Array<Resultado>;
}

export interface Resultado {
  set: string;
}

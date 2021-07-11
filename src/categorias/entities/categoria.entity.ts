import { Document } from 'mongoose';
import { Jogador } from '../../jogadores/interfaces/jogador.interface';

export interface CategoriaEntity extends Document {
  readonly categoria: string;
  descricao: string;
  eventos: Array<Evento>;
  jogadores: Array<Jogador>;
}

export interface Evento {
  nome: string;
  operacao: string;
  valor: number;
}

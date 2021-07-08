import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const jogador = await JogadoresService.criar(criarJogadorDto);
    this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
    return jogador;
  }

  private static async criar(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const { telefoneCelular, email, nome } = criarJogadorDto;
    return {
      telefoneCelular,
      email,
      nome,
      _id: uuid(),
      posicaoRankig: 0,
      ranking: 'A',
      urlFotoJogador: '',
    };
  }
}

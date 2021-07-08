import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const jogador: Jogador = this.jogadores.find(
      (j) => j.email === criarJogadorDto.email,
    );

    if (!jogador) {
      return await this.criar(criarJogadorDto);
    } else {
      return await this.atualizar(jogador, criarJogadorDto);
    }
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { telefoneCelular, email, nome } = criarJogadorDto;
    const jogador: Jogador = {
      telefoneCelular,
      email,
      nome,
      _id: uuid(),
      posicaoRankig: 0,
      ranking: 'A',
      urlFotoJogador: '',
    };
    this.logger.log(`criar: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
    return jogador;
  }

  private async atualizar(
    criarJogadorDtoEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const { nome } = criarJogadorDto;
    criarJogadorDtoEncontrado.nome = nome;
    this.logger.log(`atualizar: ${JSON.stringify(criarJogadorDtoEncontrado)}`);
    return criarJogadorDtoEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }
}

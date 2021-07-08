import {Injectable, Logger, NotFoundException} from '@nestjs/common';
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
    const jogador: Jogador = await this.filtro(criarJogadorDto.email);

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

  private async filtro(email: string): Promise<Jogador> {
    return this.jogadores.find((jogador) => jogador.email === email);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async filtarTodosJogadores(email: string): Promise<Jogador> {
    const jogador = await this.filtro(email);
    if (!jogador) {
      throw new NotFoundException({
        message: `Jogador com e-mail ${email} não econtrado`,
        status_code: 'JOGADOR.NOT_FOUND',
      });
    }
    return jogador;
  }

  async deletarJogador(email: string) {
    const jogador = await this.filtro(email);
    (this.jogadores).splice(this.jogadores.indexOf(jogador), 1);
    return jogador;
  }
}

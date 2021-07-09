import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

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
    const jogador = new this.jogadorModel({
      telefoneCelular,
      email,
      nome,
      posicaoRankig: 0,
      ranking: 'A',
      urlFotoJogador: '',
    });
    await jogador.save();
    this.logger.log(`criar: ${JSON.stringify(jogador)}`);
    return jogador;
  }

  private async atualizar(
    criarJogadorDtoEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const { email } = criarJogadorDtoEncontrado;
    const { telefoneCelular, nome } = criarJogadorDto;
    this.logger.log(`atualizar: ${JSON.stringify(criarJogadorDtoEncontrado)}`);
    return await this.jogadorModel
      .findOneAndUpdate({ email }, { $set: { telefoneCelular, nome } })
      .exec();
  }

  private async filtro(email: string): Promise<Jogador> {
    return this.jogadorModel.findOne({ email }).exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
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
    return await this.jogadorModel.remove({ email: email }).exec();
  }
}

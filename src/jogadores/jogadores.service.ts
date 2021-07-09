import {
  BadRequestException,
  Injectable, InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {AtualizarJogadorDto} from "./dtos/atualizar-jogador.dto";

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { telefoneCelular, email, nome } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException({
        message: `Jogador com e-mail ${email} já cadastro`,
        code: 'VALIDATION.EMAIL_EXISTS',
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    const jogador = new this.jogadorModel({
      telefoneCelular,
      email,
      nome,
      posicaoRankig: 0,
      ranking: 'A',
      urlFotoJogador: '',
    });
    try {
      await jogador.save();
    } catch (err: any) {
      if (err.code === 11000) {
        throw new BadRequestException({
          message: `Jogador com telefone ${telefoneCelular} já cadastro`,
          code: 'VALIDATION.TELEPHONE_EXISTS',
          error: 'Bad Request',
          statusCode: 400,
        });
      }
      this.logger.log(JSON.stringify(err));
    }
    this.logger.log(`criar: ${JSON.stringify(jogador)}`);
    return jogador;
  }

  async atualizarJogador(
    atualizarJogadorDto: AtualizarJogadorDto,
    id: string,
  ): Promise<Jogador> {
    const { telefoneCelular, nome } = atualizarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel
      .findOne({ _id: id })
      .exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException({
        message: `Jogador com ID ${id} não econtrado`,
        code: 'VALIDATION.NOT_FOUND',
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    this.logger.log(`atualizar: ${id}`);
    return await this.jogadorModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { telefoneCelular, nome } },
        {
          useFindAndModify: true,
          new: true,
        },
      )
      .exec();
  }

  async filtro(id: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ _id: id }).exec();
    if (!jogador) {
      throw new NotFoundException({
        message: `Jogador com ID ${id} não econtrado`,
        status_code: 'JOGADOR.NOT_FOUND',
      });
    }

    return jogador;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async deletarJogador(id: string): Promise<Jogador> {
    const jogador = await this.jogadorModel
      .findOneAndRemove({ _id: id }, { new: true })
      .exec();
    if (!jogador) {
      throw new NotFoundException({
        message: `Jogador com ID ${id} não econtrado`,
        status_code: 'JOGADOR.NOT_FOUND',
      });
    }

    return jogador;
  }
}

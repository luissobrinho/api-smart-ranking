import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partida } from './entities/desafio.entity';
import { Jogador } from '../jogadores/interfaces/jogador.interface';
import { CategoriaEntity } from '../categorias/entities/categoria.entity';
import { DesafioStatusEnum } from './enum/desafio-status.enum';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { DesafioRepository } from './repository/desafio.repository';

@Injectable()
export class DesafiosService {
  private readonly logger = new Logger(DesafiosService.name);

  constructor(
    private desafioRepository: DesafioRepository,
    @InjectModel('Partida') private readonly partdaModel: Model<Partida>,
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
    @InjectModel('Categoria')
    private readonly categoriaModel: Model<CategoriaEntity>,
  ) {}

  async create(createDesafioDto: CreateDesafioDto) {
    const jogadores = await this.jogadorModel
      .find({
        _id: { $in: createDesafioDto.jogadores },
      })
      .exec();

    if (jogadores.length !== 2) {
      throw new BadRequestException(`Alguem não é jogador`);
    }

    const solicitanteDaPartida = await this.jogadorModel
      .findOne({ _id: createDesafioDto.solicitante })
      .exec();

    const solicitanteNaPartida = createDesafioDto.jogadores.find(
      (j) => j._id === createDesafioDto.solicitante,
    );

    if (!solicitanteNaPartida || !solicitanteDaPartida) {
      throw new BadRequestException(
        `O solicitante deve ser um jogador da partida!`,
      );
    }

    this.logger.log(`solicitante: ${JSON.stringify(solicitanteDaPartida)}`);

    const categoria = await this.categoriaModel
      .findOne({ jogadores: { $all: [solicitanteDaPartida._id] } })
      .exec();

    if (!categoria) {
      throw new BadRequestException(
        `O solicitante deve participar de uma categoria!`,
      );
    }

    const desafioCriado = await this.desafioRepository.create(createDesafioDto);
    desafioCriado.categoria = categoria.categoria;
    desafioCriado.dataHoraSolicitacao = new Date();

    desafioCriado.status = DesafioStatusEnum.PENDENTE;

    return await desafioCriado.save();
  }

  async findAll() {
    return await this.desafioRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} desafio`;
  }

  async update(id: string, updateDesafioDto: UpdateDesafioDto) {
    const desafio = await this.desafioRepository.findById(id);

    if (!desafio) {
      throw new BadRequestException(`Desafio com ID ${id} não encontrado`);
    }

    this.logger.debug(desafio);

    if (updateDesafioDto.status) {
      desafio.dataHoraResponta = new Date();
    }

    desafio.status = updateDesafioDto.status;
    desafio.dataHoraDesafio = updateDesafioDto.dataHoraDesafio;

    return this.desafioRepository.update(desafio);
  }

  remove(id: number) {
    return `This action removes a #${id} desafio`;
  }

  async findByJogador(jogador_id: string) {
    const jogador = await this.jogadorModel.findOne({ _id: jogador_id }).exec();
    if (!jogador) {
      throw new BadRequestException(`Jogador não encontrado`);
    }

    return await this.desafioRepository.findByJogador(jogador_id);
  }

  async atribuirDesafioPartida(id: string, createPartidaDto: CreatePartidaDto) {
    const desafio = await this.desafioRepository.findById(id);
    const jogador = await this.jogadorModel
      .findById(createPartidaDto.def)
      .exec();

    if (!desafio) {
      throw new BadRequestException(`Desafio com ID ${id} não encontrado`);
    }

    if (!jogador) {
      throw new BadRequestException(
        `Jogador com ID ${createPartidaDto.def} não encontrado`,
      );
    }

    const jogadorDaPartida = desafio.jogadores.find(
      (j) => j == createPartidaDto.def,
    );

    if (!jogadorDaPartida) {
      throw new BadRequestException(
        `O jogador vencedor não faz parte do desafio!`,
      );
    }

    const partida = new this.partdaModel(createPartidaDto);
    partida.categoria = desafio.categoria;
    partida.jogadores = desafio.jogadores;

    await partida.save();

    desafio.status = DesafioStatusEnum.REALIZADO;
    desafio.partida = partida;

    try {
      return await this.desafioRepository.update(desafio);
    } catch (error) {
      await this.partdaModel.deleteOne({ _id: partida._id }).exec();
      throw new InternalServerErrorException(`Erro ao atualizar desafio`);
    }
  }
}

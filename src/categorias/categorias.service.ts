import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaEntity } from './entities/categoria.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria')
    private readonly categoriaModel: Model<CategoriaEntity>,
  ) {}

  async create(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoriaEntity> {
    const { categoria } = createCategoriaDto;
    const exists = await this.categoriaModel.exists({ categoria });

    if (exists) {
      throw new BadRequestException({
        message: `Categoria ${categoria} já cadastrada!`,
        code: 'VALIDATION.CATEGORIA_EXISTES',
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    const categoriaCreate = new this.categoriaModel(createCategoriaDto);
    await categoriaCreate.save();
    return categoriaCreate;
  }

  async findAll(): Promise<CategoriaEntity[]> {
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  async findOne(id: string): Promise<CategoriaEntity> {
    const categoria = await this.categoriaModel
      .findOne({ _id: id })
      .populate('jogadores')
      .exec();
    if (!categoria) {
      throw new NotFoundException({
        message: `Categoria com ID ${id} não econtrado`,
        status_code: 'CATEGORIA.NOT_FOUND',
      });
    }

    return categoria;
  }

  async update(
    id: string,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaEntity> {
    const exists = await this.categoriaModel.exists({ _id: id });

    if (!exists) {
      throw new NotFoundException({
        message: `Categoria com ID ${id} não econtrado`,
        status_code: 'CATEGORIA.NOT_FOUND',
      });
    }

    return this.categoriaModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateCategoriaDto },
        { new: true },
      )
      .exec();
  }

  async remove(id: string): Promise<CategoriaEntity> {
    const exists = await this.categoriaModel.exists({ _id: id });

    if (!exists) {
      throw new NotFoundException({
        message: `Categoria com ID ${id} não econtrado`,
        status_code: 'CATEGORIA.NOT_FOUND',
      });
    }

    return this.categoriaModel
      .findOneAndRemove({ _id: id }, { new: true })
      .exec();
  }

  async jogadorAttach(
    id: string,
    jogador_id: string,
  ): Promise<CategoriaEntity> {
    const exists = await this.categoriaModel.exists({ _id: id });

    if (!exists) {
      throw new NotFoundException({
        message: `Categoria com ID ${id} não econtrado`,
        status_code: 'CATEGORIA.NOT_FOUND',
      });
    }

    const JogadorExists = await this.categoriaModel.findOne({
      jogadores: { $all: [jogador_id] },
    });

    if (JogadorExists) {
      throw new NotFoundException({
        message: `Jogador ${jogador_id} já cadastrado ${
          JogadorExists._id == id
            ? 'na mesma categoria'
            : 'na categoria ' + JogadorExists.descricao
        }`,
        status_code: 'CATEGORIA.JOGADOR_CADASTRADO',
      });
    }

    return this.categoriaModel
      .findOneAndUpdate(
        { _id: id },
        { $addToSet: { jogadores: jogador_id } },
        { new: true },
      )
      .exec();
  }

  async findByJogadores(jogador_id: string): Promise<CategoriaEntity> {
    return await this.categoriaModel
      .findOne({ jogadores: { $all: [jogador_id] } })
      .exec();
  }
}

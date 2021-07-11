import { Model } from 'mongoose';
import { DesafioEntity } from '../entities/desafio.entity';
import * as Mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DesafioRepository {
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<DesafioEntity>,
  ) {}

  async create(parans: any): Promise<DesafioEntity> {
    return new this.desafioModel(parans);
  }

  async findAll(): Promise<DesafioEntity[]> {
    return await this.desafioModel
      .find()
      .populate('solicitante')
      .populate('jogadores')
      .populate('partida')
      .exec();
  }

  async findById(id: string): Promise<DesafioEntity> {
    return await this.desafioModel
      .findById(id)
      .populate('solicitante')
      .populate('jogadores')
      .populate('partida')
      .exec();
  }

  async update(desafio: DesafioEntity): Promise<DesafioEntity> {
    return await this.desafioModel
      .findOneAndUpdate({ _id: desafio._id }, { $set: desafio }, { new: true })
      .exec();
  }

  async findByJogador(jogador_id: string) {
    return await this.desafioModel
      .find()
      .where('jogadores')
      .in([jogador_id])
      .populate('solicitante')
      .populate('jogadores')
      .populate('partida')
      .exec();
  }
}

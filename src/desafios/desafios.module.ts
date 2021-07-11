import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema, PartidaSchema } from './entities/desafio.schema';
import { JogadorSchema } from '../jogadores/interfaces/jogodador.schema';
import { CategoriaSchema } from '../categorias/entities/categoria.schema';
import { DesafioRepository } from './repository/desafio.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Desafio', schema: DesafioSchema },
      { name: 'Partida', schema: PartidaSchema },
      { name: 'Jogador', schema: JogadorSchema },
      { name: 'Categoria', schema: CategoriaSchema },
    ]),
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService, DesafioRepository],
})
export class DesafiosModule {}

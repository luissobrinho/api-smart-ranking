import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { DesafioEntity } from './entities/desafio.entity';
import { DesafioStatusValidationPipe } from './pipes/desafio-status-validation.pipe';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { DesafioRepository } from './repository/desafio.repository';

@Controller('api/v1/desafios')
export class DesafiosController {
  private readonly logger = new Logger(DesafiosController.name);

  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createDesafioDto: CreateDesafioDto,
  ): Promise<DesafioEntity> {
    this.logger.log(`createDesafioDto: ${JSON.stringify(createDesafioDto)}`);
    return this.desafiosService.create(createDesafioDto);
  }

  @Get()
  async findAll() {
    return this.desafiosService.findAll();
  }

  @Get(':jogador_id/jogador')
  async findByJogador(@Param('jogador_id') jogador_id: string) {
    return this.desafiosService.findByJogador(jogador_id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.desafiosService.findOne(+id);
  }

  @Post(':id/partida')
  @UsePipes(ValidationPipe)
  async atribuirDesafioPartida(
    @Param('id') id: string,
    @Body() createPartidaDto: CreatePartidaDto,
  ) {
    return this.desafiosService.atribuirDesafioPartida(id, createPartidaDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: string,
    @Body(DesafioStatusValidationPipe) updateDesafioDto: UpdateDesafioDto,
  ) {
    return this.desafiosService.update(id, updateDesafioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.desafiosService.remove(+id);
  }
}

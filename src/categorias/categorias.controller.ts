import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaEntity } from './entities/categoria.entity';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoriaEntity> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get('/:id/jogadores/:jogador_id')
  async jogadorAttach(
    @Param('id') id: string,
    @Param('jogador_id') jogador_id: string,
  ): Promise<CategoriaEntity> {
    return this.categoriasService.jogadorAttach(id, jogador_id);
  }

  @Get()
  async findAll(): Promise<CategoriaEntity[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoriaEntity> {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaEntity> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CategoriaEntity> {
    return this.categoriasService.remove(id);
  }
}

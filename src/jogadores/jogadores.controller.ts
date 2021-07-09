import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParamaetrosPipe } from './pipes/jogadores-validacao-paramaetros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly service: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() jogador: CriarJogadorDto) {
    return this.service.criarJogador(jogador);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() jogador: AtualizarJogadorDto,
    @Param('id', JogadoresValidacaoParamaetrosPipe) id: string,
  ) {
    return this.service.atualizarJogador(jogador, id);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[] | Jogador> {
    return await this.service.consultarTodosJogadores();
  }

  @Get('/:id')
  async filtarJogadoresID(
    @Param('id', JogadoresValidacaoParamaetrosPipe) id: string,
  ): Promise<Jogador> {
    return await this.service.filtro(id);
  }

  @Delete(':id')
  async deletarJogador(
    @Param('id', JogadoresValidacaoParamaetrosPipe) email: string,
  ): Promise<Jogador> {
    return await this.service.deletarJogador(email);
  }
}

import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly service: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() jogador: CriarJogadorDto) {
    return this.service.criarAtualizarJogador(jogador);
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.service.filtarTodosJogadores(email);
    } else {
      return await this.service.consultarTodosJogadores();
    }
  }
}

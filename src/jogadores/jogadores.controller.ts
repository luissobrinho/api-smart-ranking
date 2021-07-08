import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly service: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() jogador: CriarJogadorDto) {
    return this.service.criarAtualizarJogador(jogador);
  }
}

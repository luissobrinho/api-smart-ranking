import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      'mongodb+srv://api_smart_ranking:159753@cluster0.7ngha.mongodb.net/smartranking',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

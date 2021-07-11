import * as Mongoose from 'mongoose';

export const DesafioSchema = new Mongoose.Schema(
  {
    dataHoraDesafio: Date,
    status: String,
    dataHoraSolicitacao: Date,
    dataHoraResponta: Date,
    solicitante: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Jogador',
    },
    categoria: String,
    jogadores: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
    partida: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Partida',
    },
  },
  { timestamps: true, collection: 'desafios' },
);

export const PartidaSchema = new Mongoose.Schema(
  {
    ref: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Jogador',
    },
    resultado: [
      {
        set: String,
      },
    ],
    jogadores: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
  },
  { timestamps: true, collection: 'partida' },
);

import * as Mongoose from 'mongoose';

export const CategoriaSchema = new Mongoose.Schema(
  {
    categoria: { type: String, unique: true },
    descricao: String,
    eventos: [
      {
        nome: String,
        operacao: String,
        valor: Number,
      },
    ],
    jogadores: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
  },
  { timestamps: true, collection: 'categorias' },
);

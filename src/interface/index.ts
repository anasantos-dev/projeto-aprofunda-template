import express, { Request, Response } from 'express';
import cors from 'cors';
import { configureDependencies } from '../infrastructure/utils/config';
import { connectDB } from '../infrastructure/database/connection';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

// Conexão com o banco de dados
connectDB();

// Configuração do middleware
app.use(express.json());
app.use(cors());

// Configuração das dependências
const { despesaController, chatController } = configureDependencies();

// Rotas com tipagem explícita
app.post('/despesas', async (req: Request, res: Response) => {
  try {
    await despesaController.create(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar despesa', error });
  }
});

app.get('/despesas/:userId', async (req: Request<{ userId: string }>, res: Response) => {
  try {
    await despesaController.getAll(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar despesas', error });
  }
});

app.post('/chat', async (req: Request, res: Response) => {
  try {
    await chatController.open(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao abrir o chat', error });
  }
});

app.get('/despesas/total/:userId', async (req: Request<{ userId: string }>, res: Response) => {
  try {
    await despesaController.getTotalByUser(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar total de despesas', error });
  }
});

// Inicialização do servidor
if (require.main === module) {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

}

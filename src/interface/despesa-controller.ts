import { Request, Response } from 'express';
import { CreateDespesaUseCase } from '../application/use-cases/create-despesa-use-case';
import { GetDespesasByUserUseCase } from '../application/use-cases/get-despesas-by-user-use-case';
import { Despesa } from '../domain/despesa';

export class DespesaController {
  constructor(
    private createDespesaUseCase: CreateDespesaUseCase,
    private getDespesasByUserUseCase: GetDespesasByUserUseCase,
  ) {}

  create(req: Request, res: Response) {
    try {
      const params: Despesa = req.body;
      const despesa = this.createDespesaUseCase.execute(params);
      res.status(201).json(despesa);
    } catch (error) {
      console.error("Erro ao criar despesa:", error);
      res.status(500).json({ message: "Erro ao criar despesa." });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
  
      // Validação para garantir que userId foi fornecido
      if (!userId) {
        return res.status(400).json({ message: "userId é obrigatório." });
      }
  
      const despesas = await this.getDespesasByUserUseCase.execute(userId);
      res.json(despesas);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
      res.status(500).json({ message: "Erro ao buscar despesas." });
    }
  }
  
  async getTotalByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
  
      // Validação para garantir que userId foi fornecido
      if (!userId) {
        return res.status(400).json({ message: "userId é obrigatório." });
      }
  
      const despesas = await this.getDespesasByUserUseCase.execute(userId);
  
      // Calcula o total das despesas somente se existirem despesas
      const total = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
  
      res.json({ total });
    } catch (error) {
      console.error("Erro ao calcular o total de despesas:", error);
      res.status(500).json({ message: "Erro interno ao calcular o total de despesas." });
    }
  }
    

}  
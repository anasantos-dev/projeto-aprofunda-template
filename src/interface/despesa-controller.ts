import { Request, Response } from 'express';
import { CreateDespesaUseCase } from '../application/use-cases/create-despesa-use-case';
import { GetDespesasByUserUseCase } from '../application/use-cases/get-despesas-by-user-use-case';
import { Despesa } from '../domain/despesa';

export class DespesaController {
  constructor(
    private createDespesaUseCase: CreateDespesaUseCase,
    private getDespesasByUserUseCase: GetDespesasByUserUseCase,
  ){}

  create(req: Request, res: Response) {
    const params: Despesa = req.body;
    const despesa = this.createDespesaUseCase.execute(params);
    res.status(201).json(despesa);
  }

  async getAll(req: Request, res: Response) {
    const userId = req.params.userId;
    const despesas = await this.getDespesasByUserUseCase.execute(userId);
    res.json(despesas);
  }
}
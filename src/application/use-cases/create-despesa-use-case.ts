import { Despesa } from '../../domain/despesa';
import { DespesaRepository } from '../repositores/depesa-repository';

export class CreateDespesaUseCase {
    constructor(
        private despesaRepository: DespesaRepository,
    ){}

    execute(despesaParams: Partial<Despesa>): Despesa {
        const despesa = {
            ...despesaParams
        } as Despesa;

        this.despesaRepository.save(despesa);
        return despesa;
    } 
}
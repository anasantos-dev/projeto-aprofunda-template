import { Despesa } from '../../domain/despesa';

export interface DespesaRepository {
    save(despesa: Despesa): Promise<void>;
    findAll(): Promise<Array<Despesa>>;
}
import { DespesaRepository } from '../../application/repositores/depesa-repository'
import { Despesa } from '../../domain/despesa';
import { DespesaModel } from './model';

export class RepositoryData implements DespesaRepository {
    async save (despesa: Despesa): Promise<void> {
        const newDespesa = new DespesaModel(despesa)
        await newDespesa.save();
    }

    async findAll (): Promise<Array<Despesa>> {
    const despesas = await DespesaModel.find();

    const translatedDespesas = despesas.map(item => {
        return {
            id: item._id.toString(),
            descricao: item.descricao,
            categoria: item.categoria,
            valor: item.valor,
            tipo: item.tipo,
            data: item.data,
            userId: item.userId
        }
    }) as Array<Despesa>

    return translatedDespesas;
    }
}
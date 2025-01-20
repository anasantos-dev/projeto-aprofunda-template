import { RepositoryData } from '../database/repository';
import { CreateDespesaUseCase } from '../../application/use-cases/create-despesa-use-case';
import { GetDespesasByUserUseCase } from '../../application/use-cases/get-despesas-by-user-use-case';
import { DespesaController } from '../../interface/despesa-controller';
import { RepositoryAI } from '../genai/repository';
import { ChatController } from '../../interface/chat-controller';
import { CreateChatUseCase } from '../../application/use-cases/create-chat-use-case';

export function configureDependencies() {
    const despesaRepository = new RepositoryData();
    const createDespesaUseCase = new CreateDespesaUseCase(despesaRepository);
    const listAllDespesasksUseCase = new GetDespesasByUserUseCase(despesaRepository);

    const chatRepository = new RepositoryAI();
    const createChatUseCase = new CreateChatUseCase(chatRepository, despesaRepository);

    const despesaController = new DespesaController(createDespesaUseCase, listAllDespesasksUseCase);
    const chatController = new ChatController(createChatUseCase);

    return {
        despesaController,
        chatController
    }

} 
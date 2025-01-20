import { ChatRepository } from "../repositores/chat-repository";
import { DespesaRepository } from "../repositores/depesa-repository";

export class CreateChatUseCase {
    constructor(
        private chatRepository: ChatRepository,
        private despesas: DespesaRepository
    ) {}

    async execute(uid: string, messageUser: string): Promise<any> {
        const transactions = await this.despesas.findAll();
        return await this.chatRepository.open(transactions, uid, messageUser);
    }
}
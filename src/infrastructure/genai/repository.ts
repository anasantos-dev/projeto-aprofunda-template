import { ChatRepository } from "../../application/repositores/chat-repository";
import { Despesa } from "../../domain/despesa";
import { ai } from '../genai/connection'
import { v4 as uuidv4 } from 'uuid';

interface MyState {
    transactions: Despesa[];
}

export class RepositoryAI implements ChatRepository {
    //seu codigo aqui
}

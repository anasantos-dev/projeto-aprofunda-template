import { ChatRepository } from "../../application/repositores/chat-repository";
import { Despesa } from "../../domain/despesa";
import { ai } from '../genai/connection'
import { v4 as uuidv4 } from 'uuid';

interface MyState {
    transactions: Despesa[];
}

export class RepositoryAI implements ChatRepository {
    async open(transactions: Despesa[], uid: string, messageUser: string): Promise<any> {
        const session = ai.createSession<MyState>({
            initialState: { transactions: transactions },
        });

        const sessionId = uuidv4();

        const prompt = `
            Você é um consultor financeiro virtual especializado em ajudar usuárias a gerenciar suas finanças pessoais. Com base nas transações fornecidas, responda de forma clara, objetiva e direta, focando nos pontos principais solicitados.

            Formato das transações:
            - id: Identificador único da transação.
            - descricao: Breve descrição do gasto ou receita.
            - categoria: Categoria associada à transação (exemplo: Alimentação, Moradia, Transporte).
            - valor: Valor da transação (em reais, sem vírgulas ou separadores).
            - tipo: "entrada" para receitas e "saída" para despesas.
            - data: Data da transação no formato AAAA-MM-DD.
            - userId: Identificador único da usuária.

            Aqui estão as transações da usuária:
            ${JSON.stringify(transactions, null, 2)}

            Instrução da Usuária: ${messageUser}

            Diretrizes para resposta:
            1. **Responda de forma concisa:** Evite introduções longas ou explicações desnecessárias. Priorize a informação essencial para responder diretamente à pergunta.
            2. **Foque no contexto:** Use os dados fornecidos para responder claramente e, se necessário, explique suposições brevemente.
            3. **Inclua cálculos claros:** Quando aplicável, apresente cálculos de forma simples e direta, apenas o necessário para justificar a resposta.
            4. **Adicione sugestões práticas:** Forneça orientações rápidas e acionáveis quando for relevante.
            5. **Evite redundâncias:** Não repita informações ou insira comentários fora do escopo da pergunta.
            6. **Aguarde a pergunta da usuária:** Não inicie a conversa solicitando informações adicionais ou fornecendo explicações introdutórias. Responda apenas ao que foi solicitado.
            7. Se a pergunta não for relacionada a finanças pessoais, responda apenas: "Não entendi a pergunta."
            8. Para perguntas ofensivas ou inapropriadas, responda: "Não posso responder a essa pergunta."
            9. Se a pergunta solicitar dicas financeiras gerais, baseie-se em princípios financeiros bem conhecidos ou tendências do mercado.

            Exemplos de resposta:
            - Pergunta: "Quanto gasto com transporte por mês?"
            Resposta: "Você gastou R$ 200,00 com transporte no mês de janeiro."
            - Pergunta: "Se eu reduzir meus gastos em 10%, quanto consigo poupar em um ano?"
            Resposta: "Reduzindo seus gastos em 10%, você economizaria R$ 155,08 por mês, ou aproximadamente R$ 1861,00 por ano."
        `;

        const chat = session.chat();

        const messages: Array<{ content: string, timestamp: string }> = [];

        const { text } = await chat.send(prompt);

        messages.push({
            content: text,
            timestamp: new Date().toISOString(),
        });
    

        return {
            sessionId,
            userId: uid,
            messages: messages,
        };
    }
}
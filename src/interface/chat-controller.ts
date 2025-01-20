import { Request, Response } from 'express';
import { CreateChatUseCase } from '../application/use-cases/create-chat-use-case';

export class ChatController {
    constructor(
        private createChatUseCase: CreateChatUseCase
    ) {}

    async open(req: Request, res: Response) {
        const { uid, message } = req.body;

        try {
            const chatSession = await this.createChatUseCase.execute(uid, message);

            res.status(201).json(chatSession);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface LlmProvider {
  id: string;
  name: string;
  generateResponse(messages: ChatMessage[], tools?: unknown[]): Promise<ChatMessage>;
}

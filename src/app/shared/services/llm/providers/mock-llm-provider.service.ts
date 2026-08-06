import { Injectable } from '@angular/core';
import type { ChatMessage, LlmProvider } from '../llm-provider.interface';

@Injectable({
  providedIn: 'root',
})
export class MockLlmProviderService implements LlmProvider {
  public readonly id = 'mock-provider';
  public readonly name = 'Mock Service (Character Count)';

  public async generateResponse(messages: ChatMessage[], _tools?: unknown[]): Promise<ChatMessage> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.role === 'user') {
      const charCount = lastMessage.content.length;
      return {
        role: 'assistant',
        content: `Your message has exactly ${charCount} characters.`,
      };
    }

    return {
      role: 'assistant',
      content: 'I did not understand that.',
    };
  }
}

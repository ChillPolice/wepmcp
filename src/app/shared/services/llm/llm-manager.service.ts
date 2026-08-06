import { Injectable, inject, signal } from '@angular/core';
import type { ChatMessage, LlmProvider } from './llm-provider.interface';
import { MockLlmProviderService } from './providers/mock-llm-provider.service';

@Injectable({
  providedIn: 'root',
})
export class LlmManagerService {
  private readonly mockProvider = inject(MockLlmProviderService);

  public readonly providers: LlmProvider[] = [this.mockProvider];

  public readonly activeProvider = signal<LlmProvider>(this.providers[0]);
  public readonly chatHistory = signal<ChatMessage[]>([]);
  public readonly isGenerating = signal<boolean>(false);

  public switchProvider(providerId: string): void {
    const selected = this.providers.find((p) => p.id === providerId);
    if (selected) {
      this.activeProvider.set(selected);
    } else {
      console.error(`Provider with ID ${providerId} not found.`);
    }
  }

  public async sendMessage(content: string): Promise<void> {
    if (!content.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content };
    this.chatHistory.update((history) => [...history, userMessage]);
    this.isGenerating.set(true);

    try {
      const response = await this.activeProvider().generateResponse(this.chatHistory());
      this.chatHistory.update((history) => [...history, response]);
    } catch (error) {
      console.error('Error generating LLM response:', error);
      this.chatHistory.update((history) => [
        ...history,
        { role: 'assistant', content: 'Sorry, an error occurred while generating the response.' },
      ]);
    } finally {
      this.isGenerating.set(false);
    }
  }

  public clearChat(): void {
    this.chatHistory.set([]);
  }
}

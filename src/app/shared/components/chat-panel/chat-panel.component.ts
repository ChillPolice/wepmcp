import { CommonModule } from '@angular/common';
import { Component, type ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LlmManagerService } from '../../services/llm/llm-manager.service';

@Component({
  selector: 'pls-chat-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent {
  private readonly llmManager = inject(LlmManagerService);

  public readonly chatHistory = this.llmManager.chatHistory;
  public readonly isGenerating = this.llmManager.isGenerating;
  public readonly activeProvider = this.llmManager.activeProvider;

  public userInput: string = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  public async sendMessage() {
    if (!this.userInput.trim() || this.isGenerating()) return;

    const messageToSend = this.userInput;
    this.userInput = '';

    setTimeout(() => this.scrollToBottom(), 50);

    await this.llmManager.sendMessage(messageToSend);

    setTimeout(() => this.scrollToBottom(), 50);
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (_err) {}
  }
}

import { Component } from '@angular/core';
import { ChatPanelComponent } from '../chat-panel/chat-panel.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeDropdownComponent } from '../theme-dropdown/theme-dropdown.component';

@Component({
  selector: 'pls-top-panel',
  imports: [SidebarComponent, ThemeDropdownComponent, ChatPanelComponent],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.scss',
})
export class TopPanelComponent {}

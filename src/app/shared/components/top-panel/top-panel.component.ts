import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeDropdownComponent } from '../theme-dropdown/theme-dropdown.component';

@Component({
  selector: 'app-top-panel',
  standalone: true,
  imports: [SidebarComponent, ThemeDropdownComponent],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.scss',
})
export class TopPanelComponent {}

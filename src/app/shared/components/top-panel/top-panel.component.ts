import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-top-panel',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.scss',
})
export class TopPanelComponent {}

import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-top-panel',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.scss',
})
export class TopPanelComponent {
  protected readonly themeService = inject(ThemeService);
}

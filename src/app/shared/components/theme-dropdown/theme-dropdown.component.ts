import { Component, inject } from '@angular/core';
import { THEMES, ThemeService, type UserTheme } from '../../services/theme.service';

const THEME_META: Record<UserTheme, { label: string; icon: string }> = {
  system: { label: 'System', icon: '💻' },
  light: { label: 'Light', icon: '☀️' },
  dark: { label: 'Dark', icon: '🌙' },
};

@Component({
  selector: 'app-theme-dropdown',
  standalone: true,
  templateUrl: './theme-dropdown.component.html',
  styleUrl: './theme-dropdown.component.scss',
})
export class ThemeDropdownComponent {
  protected readonly themeService = inject(ThemeService);

  protected readonly options: UserTheme[] = ['system', ...THEMES];

  protected meta(value: UserTheme) {
    return THEME_META[value];
  }

  protected select(value: UserTheme): void {
    this.themeService.userTheme.set(value);
  }
}

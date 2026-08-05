import { isPlatformBrowser } from '@angular/common';
import { computed, effect, Injectable, inject, PLATFORM_ID, signal } from '@angular/core';

export const THEMES = ['light', 'dark', 'pride'] as const;

export type Theme = (typeof THEMES)[number];
export type UserTheme = Theme | 'system';

const DEFAULT_THEME: Theme = 'light';

function isTheme(value: string | null): value is Theme {
  return THEMES.includes(value as Theme);
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly systemTheme = signal<Theme>(this.getSystemTheme());
  public readonly userTheme = signal<UserTheme>(this.resolveInitialUserTheme());

  public readonly theme = computed<Theme>(() => {
    const user = this.userTheme();
    return user === 'system' ? this.systemTheme() : user;
  });

  public constructor() {
    if (this.isBrowser) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.systemTheme.set(e.matches ? 'dark' : 'light');
      });

      effect(() => {
        const user = this.userTheme();
        if (user === 'system') {
          document.documentElement.removeAttribute('data-theme');
          localStorage.removeItem('theme');
        } else {
          document.documentElement.setAttribute('data-theme', user);
          localStorage.setItem('theme', user);
        }
      });
    }
  }

  public toggleTheme(): void {
    const current = this.theme();
    const idx = THEMES.indexOf(current);
    const next = THEMES[(idx + 1) % THEMES.length];
    this.userTheme.set(next);
  }

  private resolveInitialUserTheme(): UserTheme {
    if (!this.isBrowser) return 'system';
    const stored = localStorage.getItem('theme');
    return isTheme(stored) ? stored : 'system';
  }

  private getSystemTheme(): Theme {
    if (!this.isBrowser) return DEFAULT_THEME;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

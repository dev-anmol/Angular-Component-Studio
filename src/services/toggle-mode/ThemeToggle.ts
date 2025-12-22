import {
  Injectable,
  signal,
  effect,
  inject,
  runInInjectionContext,
  afterNextRender,
  Injector
} from '@angular/core';
import {Theme} from '../../types/theme';

@Injectable({providedIn: 'root'})
export class ThemeToggle {

  private injector = inject(Injector);

  mode = signal<Theme>(
    'dark'
  );

  constructor() {
    afterNextRender(() => {
      runInInjectionContext(this.injector, () => {

        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved) {
          this.mode.set(saved);
        }

        effect(() => {
          const isDark = this.mode() === 'dark';
          document.documentElement.classList.toggle('dark', isDark);
        });
      });
    });
  }

  toggle() {
    this.mode.update(t =>
      t === 'light' ? 'dark' : 'light'
    );
  }
}

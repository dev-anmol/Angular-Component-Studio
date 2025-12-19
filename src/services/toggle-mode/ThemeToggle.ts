import {Injectable, signal, WritableSignal} from '@angular/core';
import {Theme} from '../../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeToggle {

  currentMode = signal<Theme>('night');


  toggle() {
    this.currentMode.update(theme =>
      theme === 'day' ? 'night' : 'day'
    )
  }
}


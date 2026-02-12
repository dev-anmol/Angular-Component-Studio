import { Component, afterNextRender, inject, Injector } from '@angular/core';

@Component({
  selector: 'app-toc',
  imports: [],
  templateUrl: './toc.html',
})
export class Toc {
  private injector = inject(Injector);

  constructor() {
    // Ensure we're in browser environment for scroll functionality
    afterNextRender(() => {
      // Browser-only initialization if needed
    }, { injector: this.injector });
  }

  scrollToSection(sectionId: string): void {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

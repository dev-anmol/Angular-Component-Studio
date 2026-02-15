import { Component, effect, inject, signal, input, afterNextRender, Injector } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';
import { ThemeToggle } from '../../services/toggle-mode/ThemeToggle';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [],
  template: `
    <div class="relative group my-4">
      <!-- Language Badge -->
      @if (showLanguage()) {
        <div class="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-medium bg-neutral-200/90 dark:bg-neutral-700/90 text-neutral-700 dark:text-neutral-300 geist-desc z-10">
          {{ language() }}
        </div>
      }
      
      <!-- Copy Button -->
      <button
        (click)="copyCode()"
        class="absolute top-3 right-3 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-200/90 dark:bg-neutral-700/90 hover:bg-neutral-300 dark:hover:bg-neutral-600 z-10"
        [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
        type="button">
        @if (copied()) {
          <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        } @else {
          <svg class="w-4 h-4 text-neutral-600 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        }
      </button>

      <!-- Code Block -->
      <div 
        class="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d1117]"
        [innerHTML]="highlightedCode()">
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    /* Ensure code blocks don't break layout */
    ::ng-deep pre {
      margin: 0 !important;
      padding: 1rem !important;
      padding-top: 2.5rem !important;
      overflow-x: auto;
      font-size: 0.875rem;
      line-height: 1.5;
      tab-size: 2;
      background: transparent !important;
    }
    
    ::ng-deep code {
      font-family: 'Courier New', Courier, monospace;
    }
  `]
})
export class CodeBlock {
  // Inputs
  code = input.required<string>();
  language = input<string>('typescript');
  showLanguage = input<boolean>(true);
  
  // Services
  private themeToggle = inject(ThemeToggle);
  private sanitizer = inject(DomSanitizer);
  private injector = inject(Injector);
  
  // State
  copied = signal(false);
  highlightedCode = signal<SafeHtml>('');
  
  constructor() {
    // Highlight code when inputs change or theme changes (SSR-safe)
    afterNextRender(() => {
      // Initial highlight
      this.highlightCode();
      
      // Re-highlight when code, language, or theme changes
      effect(() => {
        // Track dependencies
        this.code();
        this.language();
        this.themeToggle.mode();
        
        // Re-highlight
        this.highlightCode();
      }, { injector: this.injector });
    }, { injector: this.injector });
  }
  
  private async highlightCode() {
    try {
      const currentTheme = this.themeToggle.mode() === 'dark' ? 'github-dark' : 'github-light';
      
      const highlighted = await codeToHtml(this.code(), {
        lang: this.language(),
        theme: currentTheme
      });
      
      // Sanitize the HTML to prevent XSS warnings
      // This is safe because Shiki generates trusted HTML
      const safeHtml = this.sanitizer.bypassSecurityTrustHtml(highlighted);
      this.highlightedCode.set(safeHtml);
    } catch (error) {
      console.error('Error highlighting code:', error);
      // Fallback to plain code with proper escaping
      const fallback = `<pre><code>${this.escapeHtml(this.code())}</code></pre>`;
      this.highlightedCode.set(this.sanitizer.bypassSecurityTrustHtml(fallback));
    }
  }
  
  async copyCode() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(this.code());
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      } catch (error) {
        console.error('Failed to copy code:', error);
      }
    }
  }
  
  private escapeHtml(text: string): string {
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
    return text;
  }
}

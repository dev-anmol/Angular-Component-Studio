import { Component, inject, signal, output } from '@angular/core';
import { ArrowRight, LucideAngularModule, LucideIconData, MenuIcon, X } from 'lucide-angular';
import { ThemeToggle } from '../../services/toggle-mode/ThemeToggle';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  readonly ArrowRight: LucideIconData = ArrowRight;
  readonly MenuIcon: LucideIconData = MenuIcon;
  readonly XIcon: LucideIconData = X;

  public toggleService = inject(ThemeToggle);
  private router = inject(Router);

  mode = this.toggleService.mode;

  // Mobile menu state
  mobileMenuOpen = signal(false);

  // Output event for mobile menu toggle
  mobileMenuToggle = output<boolean>();

  // Check if we're in the docs area (where sidebar exists)
  isInDocsArea = toSignal(
    this.router.events.pipe(
      map(() => this.router.url.startsWith('/docs'))
    ),
    { initialValue: this.router.url.startsWith('/docs') }
  );

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
    this.mobileMenuToggle.emit(this.mobileMenuOpen());
  }
}

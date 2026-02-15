import { Component, inject, signal, output } from '@angular/core';
import { ArrowRight, LucideAngularModule, LucideIconData, MenuIcon, X } from 'lucide-angular';
import { ThemeToggle } from '../../services/toggle-mode/ThemeToggle';
import { RouterLink } from '@angular/router';

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
  mode = this.toggleService.mode;

  // Mobile menu state
  mobileMenuOpen = signal(false);

  // Output event for mobile menu toggle
  mobileMenuToggle = output<boolean>();

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
    this.mobileMenuToggle.emit(this.mobileMenuOpen());
  }
}

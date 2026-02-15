import { Component, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Sidebar } from '../sidebar/sidebar';
import { Toc } from '../toc/toc';
import { MobileDrawer } from '../mobile-drawer/mobile-drawer';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, Header, Sidebar, Toc, MobileDrawer],
  templateUrl: './app-shell.html',
})
export class AppShell {
  mobileMenuOpen = signal(false);

  // Get reference to header to sync state
  header = viewChild(Header);

  onMobileMenuToggle(isOpen: boolean) {
    this.mobileMenuOpen.set(isOpen);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    // Also reset the header's state
    const headerComponent = this.header();
    if (headerComponent) {
      headerComponent.mobileMenuOpen.set(false);
    }
  }
}

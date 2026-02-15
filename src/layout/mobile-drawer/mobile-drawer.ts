import { Component, input, output, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Sidebar } from '../sidebar/sidebar';

@Component({
    selector: 'app-mobile-drawer',
    standalone: true,
    imports: [Sidebar],
    template: `
    @if (isOpen()) {
      <!-- Backdrop with CSS fade animation -->
      <div 
        (click)="close.emit()"
        class="mobile-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden cursor-pointer">
      </div>
      
      <!-- Drawer with CSS slide animation - Full height from top -->
      <aside 
        class="mobile-drawer fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-[#0A0A0A] z-50 overflow-y-auto lg:hidden border-r border-neutral-200 dark:border-neutral-800 shadow-2xl pt-14">
        
        <!-- Decorative gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        
        <!-- Content -->
        <div class="relative z-10">
          <app-sidebar />
        </div>
      </aside>
    }
  `,
    styles: [`
    :host {
      display: contents;
    }
    
    /* Backdrop fade-in animation */
    .mobile-backdrop {
      animation: backdropFadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes backdropFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    /* Drawer slide-in animation with bounce */
    .mobile-drawer {
      animation: drawerSlideIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    
    @keyframes drawerSlideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
    
    /* Smooth scrollbar for drawer */
    aside {
      scrollbar-width: thin;
      scrollbar-color: rgb(212 212 212) transparent;
    }
    
    aside::-webkit-scrollbar {
      width: 6px;
    }
    
    aside::-webkit-scrollbar-track {
      background: transparent;
    }
    
    aside::-webkit-scrollbar-thumb {
      background-color: rgb(212 212 212);
      border-radius: 9999px;
      transition: background-color 0.2s;
    }
    
    aside::-webkit-scrollbar-thumb:hover {
      background-color: rgb(163 163 163);
    }
    
    .dark aside::-webkit-scrollbar-thumb {
      background-color: rgb(64 64 64);
    }
    
    .dark aside::-webkit-scrollbar-thumb:hover {
      background-color: rgb(82 82 82);
    }
  `]
})
export class MobileDrawer {
    isOpen = input.required<boolean>();
    close = output<void>();

    private router = inject(Router);

    constructor() {
        // Close drawer on route change with slight delay for UX
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                setTimeout(() => this.close.emit(), 100);
            });
    }
}

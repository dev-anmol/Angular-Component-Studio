import { Component, afterNextRender, inject, Injector, signal, effect, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface TocHeading {
  id: string;
  text: string;
  level: number; // 2 for h2, 3 for h3
}

@Component({
  selector: 'app-toc',
  imports: [],
  templateUrl: './toc.html',
})
export class Toc {
  private injector = inject(Injector);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  // Signals for reactive state
  headings = signal<TocHeading[]>([]);
  activeId = signal<string>('');

  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      // Extract headings from the page
      this.extractHeadings();

      // Set up IntersectionObserver for scroll tracking
      this.setupIntersectionObserver();

      // Re-extract headings when route changes
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          // Small delay to let the new content render
          setTimeout(() => {
            this.extractHeadings();
            this.setupIntersectionObserver();
          }, 100);
        });
    }, { injector: this.injector });

    // Watch for activeId changes and scroll TOC
    effect(() => {
      const active = this.activeId();
      if (active) {
        this.scrollTocToActive(active);
      }
    }, { injector: this.injector });
  }

  ngOnDestroy() {
    // Clean up observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Clean up scroll listener (only in browser)
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  private extractHeadings(): void {
    if (typeof document === 'undefined') return;

    // Find the main content area (where component-detail or other pages render)
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    // Query all h2 and h3 elements
    const headingElements = mainContent.querySelectorAll('h2, h3');
    const extractedHeadings: TocHeading[] = [];

    headingElements.forEach((heading, index) => {
      // Generate ID if it doesn't exist
      let id = heading.id;
      if (!id) {
        // Create ID from text content
        id = heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || `heading-${index}`;
        heading.id = id;
      }

      extractedHeadings.push({
        id,
        text: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3
      });
    });

    this.headings.set(extractedHeadings);

    // Set first heading as active by default
    if (extractedHeadings.length > 0 && !this.activeId()) {
      this.activeId.set(extractedHeadings[0].id);
    }
  }

  private setupIntersectionObserver(): void {
    if (typeof window === 'undefined') return;

    // Disconnect existing observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Create new observer
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // Collect all currently intersecting headings
        const visibleHeadings: Array<{ id: string; top: number }> = [];

        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement && entry.target.id) {
            const rect = entry.target.getBoundingClientRect();
            visibleHeadings.push({
              id: entry.target.id,
              top: rect.top
            });
          }
        });

        // If we have visible headings, find the one closest to the top
        if (visibleHeadings.length > 0) {
          // Sort by distance from top (closest first)
          visibleHeadings.sort((a, b) => Math.abs(a.top) - Math.abs(b.top));
          this.activeId.set(visibleHeadings[0].id);
        } else {
          // Fallback: check if we're at the bottom of the page
          const scrollHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY || window.pageYOffset;
          const clientHeight = window.innerHeight;

          // If scrolled to bottom, activate the last heading
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            const lastHeading = this.headings()[this.headings().length - 1];
            if (lastHeading) {
              this.activeId.set(lastHeading.id);
            }
          }
        }
      },
      {
        rootMargin: '-100px 0px -66% 0px', // More lenient for bottom items
        threshold: [0, 0.1, 0.5, 1]
      }
    );

    // Observe all headings
    this.headings().forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        this.observer!.observe(element);
      }
    });

    // Also listen to scroll events for better bottom detection
    window.addEventListener('scroll', this.handleScroll);
  }

  private handleScroll = (): void => {
    if (typeof window === 'undefined') return;

    // Check if we're at the bottom of the page
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      const lastHeading = this.headings()[this.headings().length - 1];
      if (lastHeading) {
        this.activeId.set(lastHeading.id);
      }
    }
  };

  private scrollTocToActive(activeId: string): void {
    if (typeof document === 'undefined') return;

    // Find the TOC container
    const tocContainer = this.elementRef.nativeElement.querySelector('.toc-container');
    if (!tocContainer) return;

    // Find the active link in the TOC
    const activeLink = tocContainer.querySelector(`[data-heading-id="${activeId}"]`);
    if (!activeLink) return;

    // Get positions
    const containerRect = tocContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    // Calculate if the link is outside the visible area
    const isAboveView = linkRect.top < containerRect.top;
    const isBelowView = linkRect.bottom > containerRect.bottom;

    if (isAboveView || isBelowView) {
      // Scroll the TOC container to center the active link
      const containerScrollTop = tocContainer.scrollTop;
      const linkOffsetTop = (activeLink as HTMLElement).offsetTop;
      const containerHeight = tocContainer.clientHeight;
      const linkHeight = (activeLink as HTMLElement).clientHeight;

      // Center the active link in the container
      const scrollTo = linkOffsetTop - (containerHeight / 2) + (linkHeight / 2);

      tocContainer.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }
  }

  scrollToHeading(id: string): void {
    if (typeof document === 'undefined') return;

    const element = document.getElementById(id);
    if (element) {
      // Update active state immediately for better UX
      this.activeId.set(id);

      // Smooth scroll to element
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }
}
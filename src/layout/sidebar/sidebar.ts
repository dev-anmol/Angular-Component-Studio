import { Component, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { componentsByCategory } from '../../data/components.registry';

interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  // Navigation structure
  navItems = signal<NavItem[]>([
    {
      label: 'Getting Started',
      path: '/docs',
    },
    {
      label: 'Installation',
      path: '/docs/installation',
    },
    {
      label: 'Components',
      path: '/docs/components',
    }
  ]);

  // Get components grouped by category for navigation
  componentCategories = computed(() => {
    const grouped = componentsByCategory();
    return Object.entries(grouped).map(([category, components]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      components: components.map(c => ({
        label: c.title,
        path: `/docs/components/${c.slug}`
      }))
    }));
  });
}


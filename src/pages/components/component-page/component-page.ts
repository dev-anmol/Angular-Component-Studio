import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { componentsRegistry, componentsByCategory } from '../../../data/components.registry';

@Component({
  selector: 'app-component-page',
  imports: [RouterLink],
  templateUrl: './component-page.html',
})
export class ComponentPage {
  // All components from registry
  allComponents = componentsRegistry;
  
  // Grouped by category
  componentsByCategory = componentsByCategory;
  
  // Search/filter state
  searchQuery = signal('');
  
  // Filtered components based on search
  filteredComponents = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allComponents();
    
    return this.allComponents().filter(comp =>
      comp.title.toLowerCase().includes(query) ||
      comp.description.toLowerCase().includes(query) ||
      comp.category.toLowerCase().includes(query)
    );
  });
}


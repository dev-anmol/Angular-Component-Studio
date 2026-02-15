import { Component, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { getComponentBySlug, ComponentMeta } from '../../../data/components.registry';
import { CodeBlock } from '../../../shared/code-block/code-block';

@Component({
  selector: 'app-component-detail',
  imports: [RouterLink, CodeBlock],
  templateUrl: './component-detail.html',
})
export class ComponentDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Get slug from route params as signal
  slug = toSignal(
    this.route.params.pipe(map(params => params['slug'])),
    { initialValue: '' }
  );

  // Get component data based on slug
  component = computed(() => {
    const currentSlug = this.slug();
    if (!currentSlug) return null;
    return getComponentBySlug(currentSlug) || null;
  });

  // Check if component exists
  notFound = computed(() => {
    const currentSlug = this.slug();
    return currentSlug && !this.component();
  });
}


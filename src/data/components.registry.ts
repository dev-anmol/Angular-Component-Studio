import { signal, computed } from '@angular/core';

export interface ComponentMeta {
  slug: string;
  title: string;
  description: string;
  category: 'cards' | 'forms' | 'overlays' | 'data';
  installation: string;
  usage: string;
  props?: Array<{
    name: string;
    type: string;
    description: string;
    required: boolean;
  }>;
}

// Component registry data
const COMPONENT_DATA: ComponentMeta[] = [
  {
    slug: 'form',
    title: 'Form',
    description: 'A modern form component with validation and signal-based state management.',
    category: 'forms',
    installation: `import { Form } from '@angular-studio/ui';`,
    usage: `<app-form></app-form>`,
    props: [
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text for form inputs',
        required: false
      }
    ]
  },
  {
    slug: 'activity-feed',
    title: 'Activity Feed',
    description: 'Display a timeline of user activities and events.',
    category: 'data',
    installation: `import { ActivityFeed } from '@angular-studio/ui';`,
    usage: `<app-activity-feed></app-activity-feed>`
  },
  {
    slug: 'command-palette',
    title: 'Command Palette',
    description: 'Quick command search and navigation interface.',
    category: 'overlays',
    installation: `import { CommandPalette } from '@angular-studio/ui';`,
    usage: `<app-command-palette></app-command-palette>`
  },
  {
    slug: 'highlight-card',
    title: 'Highlight Card',
    description: 'Card component for highlighting important information.',
    category: 'cards',
    installation: `import { HighlightCard } from '@angular-studio/ui';`,
    usage: `<app-highlight-card></app-highlight-card>`
  },
  {
    slug: 'infobanner-card',
    title: 'Info Banner Card',
    description: 'Informational banner card for announcements.',
    category: 'cards',
    installation: `import { InfobannerCard } from '@angular-studio/ui';`,
    usage: `<app-infobanner-card></app-infobanner-card>`
  },
  {
    slug: 'metadata-card',
    title: 'Metadata Card',
    description: 'Display structured metadata in a card format.',
    category: 'cards',
    installation: `import { MetadataCard } from '@angular-studio/ui';`,
    usage: `<app-metadata-card></app-metadata-card>`
  },
  {
    slug: 'notification',
    title: 'Notification',
    description: 'Toast notification component for user feedback.',
    category: 'overlays',
    installation: `import { Notification } from '@angular-studio/ui';`,
    usage: `<app-notification></app-notification>`
  },
  {
    slug: 'notification-card',
    title: 'Notification Card',
    description: 'Card-based notification display.',
    category: 'cards',
    installation: `import { NotificationCard } from '@angular-studio/ui';`,
    usage: `<app-notification-card></app-notification-card>`
  },
  {
    slug: 'onboarding-card',
    title: 'Onboarding Card',
    description: 'Guide users through onboarding steps.',
    category: 'cards',
    installation: `import { OnboardingCard } from '@angular-studio/ui';`,
    usage: `<app-onboarding-card></app-onboarding-card>`
  },
  {
    slug: 'preferences',
    title: 'Preferences',
    description: 'User preferences and settings component.',
    category: 'forms',
    installation: `import { Preferences } from '@angular-studio/ui';`,
    usage: `<app-preferences></app-preferences>`
  },
  {
    slug: 'pricing-card',
    title: 'Pricing Card',
    description: 'Display pricing tiers and plans.',
    category: 'cards',
    installation: `import { PricingCard } from '@angular-studio/ui';`,
    usage: `<app-pricing-card></app-pricing-card>`
  },
  {
    slug: 'profile-card',
    title: 'Profile Card',
    description: 'User profile information card.',
    category: 'cards',
    installation: `import { ProfileCard } from '@angular-studio/ui';`,
    usage: `<app-profile-card></app-profile-card>`
  },
  {
    slug: 'role-card',
    title: 'Role Card',
    description: 'Display user roles and permissions.',
    category: 'cards',
    installation: `import { RoleCard } from '@angular-studio/ui';`,
    usage: `<app-role-card></app-role-card>`
  },
  {
    slug: 'row-card',
    title: 'Row Card',
    description: 'Horizontal card layout component.',
    category: 'cards',
    installation: `import { RowCard } from '@angular-studio/ui';`,
    usage: `<app-row-card></app-row-card>`
  },
  {
    slug: 'status-card',
    title: 'Status Card',
    description: 'Display status information and indicators.',
    category: 'cards',
    installation: `import { StatusCard } from '@angular-studio/ui';`,
    usage: `<app-status-card></app-status-card>`
  },
  {
    slug: 'summary-card',
    title: 'Summary Card',
    description: 'Summarize key metrics and data.',
    category: 'cards',
    installation: `import { SummaryCard } from '@angular-studio/ui';`,
    usage: `<app-summary-card></app-summary-card>`
  },
  {
    slug: 'toggle-card',
    title: 'Toggle Card',
    description: 'Card with toggle switch functionality.',
    category: 'cards',
    installation: `import { ToggleCard } from '@angular-studio/ui';`,
    usage: `<app-toggle-card></app-toggle-card>`
  },
  {
    slug: 'upload-card',
    title: 'Upload Card',
    description: 'File upload interface component.',
    category: 'cards',
    installation: `import { UploadCard } from '@angular-studio/ui';`,
    usage: `<app-upload-card></app-upload-card>`
  },
  {
    slug: 'validation-card',
    title: 'Validation Card',
    description: 'Display validation states and messages.',
    category: 'cards',
    installation: `import { ValidationCard } from '@angular-studio/ui';`,
    usage: `<app-validation-card></app-validation-card>`
  }
];

// Signal-based registry
export const componentsRegistry = signal<ComponentMeta[]>(COMPONENT_DATA);

// Computed helpers
export const componentsByCategory = computed(() => {
  const components = componentsRegistry();
  const grouped: Record<string, ComponentMeta[]> = {
    cards: [],
    forms: [],
    overlays: [],
    data: []
  };
  
  components.forEach(comp => {
    grouped[comp.category].push(comp);
  });
  
  return grouped;
});

export const getComponentBySlug = (slug: string): ComponentMeta | undefined => {
  return componentsRegistry().find(c => c.slug === slug);
};

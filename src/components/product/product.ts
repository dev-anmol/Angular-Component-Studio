import {Component, inject} from '@angular/core';
import {ThemeService} from '@primeuix/themes';
import {ThemeToggle} from '../../services/toggle-mode/ThemeToggle';
import {Form} from '../ui/form/form'
import {PricingCard} from '../ui/pricing-card/pricing-card';
import {Preferences} from '../ui/preferences/preferences';
import {Notification} from '../ui/notification/notification';
import {SummaryCard} from '../ui/summary-card/summary-card';
import {ProfileCard} from '../ui/profile-card/profile-card';
import {ActivityFeed} from '../ui/activity-feed/activity-feed';
import {CommandPalette} from '../ui/command-palette/command-palette';
import {RowCard} from '../ui/row-card/row-card';
import {StatusCard} from '../ui/status-card/status-card';
import {UploadCard} from '../ui/upload-card/upload-card';
import {HighlightCard} from '../ui/highlight-card/highlight-card';
import {ValidationCard} from '../ui/validation-card/validation-card';
import {ToggleCard} from '../ui/toggle-card/toggle-card';
import {OnboardingCard} from '../ui/onboarding-card/onboarding-card';
import {RoleCard} from '../ui/role-card/role-card';
import {NotificationCard} from '../ui/notification-card/notification-card';
import {MetadataCard} from '../ui/metadata-card/metadata-card';
import {InfobannerCard} from '../ui/infobanner-card/infobanner-card';

@Component({
  selector: 'app-product',
  imports: [Form, PricingCard, Preferences, Notification, SummaryCard, ProfileCard, ActivityFeed, CommandPalette, RowCard, StatusCard, UploadCard, HighlightCard, ValidationCard, ToggleCard, OnboardingCard, RoleCard, NotificationCard, MetadataCard, InfobannerCard],
  templateUrl: './product.html',
})
export class Product {

  public themeToggle = inject(ThemeToggle);
  public mode = this.themeToggle.mode
}

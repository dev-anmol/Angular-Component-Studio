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

@Component({
  selector: 'app-product',
  imports: [Form, PricingCard, Preferences, Notification, SummaryCard, ProfileCard, ActivityFeed],
  templateUrl: './product.html',
})
export class Product {

  public themeToggle = inject(ThemeToggle);
  public mode = this.themeToggle.mode
}

import {Component, inject} from '@angular/core';
import {ArrowRight, LucideAngularModule, LucideIconData, MenuIcon} from 'lucide-angular';
import {ThemeToggle} from '../../services/toggle-mode/ThemeToggle';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
})
export class Header {
  readonly ArrowRight: LucideIconData = ArrowRight;
  readonly MenuIcon: LucideIconData = MenuIcon;

  public toggleService = inject(ThemeToggle);
  mode = this.toggleService.mode;

}

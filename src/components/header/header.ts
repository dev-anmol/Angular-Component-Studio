import { Component } from '@angular/core';
import {LucideAngularModule, ArrowRight, LucideIconData, MenuIcon} from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
})
export class Header {
  readonly ArrowRight: LucideIconData = ArrowRight;
  readonly MenuIcon: LucideIconData = MenuIcon;
}

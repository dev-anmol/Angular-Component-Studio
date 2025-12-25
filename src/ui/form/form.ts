import {Component, signal} from '@angular/core';
import {form, Field} from '@angular/forms/signals';
import {ChevronDown, LucideAngularModule, LucideIconData, MenuIcon} from 'lucide-angular'

@Component({
  selector: 'app-form',
  imports: [LucideAngularModule],
  templateUrl: './form.html',
})
export class Form {
  readonly ChevronDown: LucideIconData = ChevronDown;


  protected readonly MenuIcon = MenuIcon;
}

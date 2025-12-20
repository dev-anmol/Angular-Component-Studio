import {Component, inject} from '@angular/core';
import {ThemeService} from '@primeuix/themes';
import {ThemeToggle} from '../../services/toggle-mode/ThemeToggle';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {

  public themeToggle = inject(ThemeToggle);
  public mode = this.themeToggle.mode
}

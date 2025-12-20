import {Component} from '@angular/core';
import {ArrowRight, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-hero',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly ArrowRight = ArrowRight;
}

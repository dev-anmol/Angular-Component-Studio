import {Component} from '@angular/core';
import {ArrowRight, LucideAngularModule} from 'lucide-angular';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [
    LucideAngularModule,
    RouterLink,
  ],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly ArrowRight = ArrowRight;
}

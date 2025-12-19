import {Component} from '@angular/core';
import {Header} from '../../components/header/header';
import {Hero} from '../../components/hero/hero'

@Component({
  selector: 'app-landing-page',
  imports: [
    Header, Hero
  ],
  templateUrl: './landing-page.html',
})
export class LandingPage {

}

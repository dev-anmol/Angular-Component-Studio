import {Component} from '@angular/core';
import {Header} from '../../layout/header/header';
import {Hero} from './hero/hero'
import {Product} from './product/product';
import {Footer} from '../../layout/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [
    Header, Hero, Product, Footer
  ],
  templateUrl: './landing-page.html',
})
export class LandingPage {

}

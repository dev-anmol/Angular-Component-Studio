import {Component} from '@angular/core';
import {Header} from '../../components/header/header';
import {Hero} from '../../components/hero/hero'
import {Product} from '../../components/product/product';
import {Footer} from '../../components/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [
    Header, Hero, Product, Footer
  ],
  templateUrl: './landing-page.html',
})
export class LandingPage {

}

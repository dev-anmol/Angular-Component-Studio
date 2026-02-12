import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {Sidebar} from '../sidebar/sidebar';
import {Toc} from '../toc/toc';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, Header, Sidebar, Toc],
  templateUrl: './app-shell.html',
})
export class AppShell {

}

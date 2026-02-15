import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'app-introduction',
  imports: [RouterLink, CodeBlock],
  templateUrl: './introduction.html',
})
export class Introduction {
  cliInstall = `npm install -g @angular/cli@21`;
  newProject = `ng new my-app --ssr`;
}

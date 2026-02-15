import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'app-installation',
  imports: [RouterLink, CodeBlock],
  templateUrl: './installation.html',
})
export class Installation {
  tailwindConfig = `export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

  usageExample = `import { Component } from '@angular/core';
import { Form } from '@angular-studio/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Form],
  template: \`<app-form></app-form>\`
})
export class AppComponent {}`;
}

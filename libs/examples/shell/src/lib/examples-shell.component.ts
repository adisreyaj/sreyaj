import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'sreyaj-exp-examples-shell',
  template: `
    <header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </header>
  `,
  standalone: true,
  imports: [RouterOutlet],
})
export class ExamplesShellComponent {}

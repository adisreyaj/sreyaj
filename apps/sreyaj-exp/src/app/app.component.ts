import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'sreyaj-root',
  template: ` <router-outlet></router-outlet>`,
  imports: [RouterOutlet],
  standalone: true,
})
export class AppComponent {}

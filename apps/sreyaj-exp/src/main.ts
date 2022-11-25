import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: 'examples',
        loadComponent: () =>
          import('@sreyaj/examples/shell').then(
            (m) => m.ExamplesShellComponent
          ),
        children: [
          {
            path: 'cdk-selection',
            loadComponent: () =>
              import('@sreyaj/examples/cdk-selection').then(
                (m) => m.CdkSelectionComponent
              ),
          },
        ] as Routes,
      },
    ]),
  ],
}).catch((err) => console.error(err));

import { Component } from '@angular/core';
import { CoreListColumnRendererType } from '../core-list-column-renderer.type';
import { ListColumnRendererBase } from '../list-column-renderer-base';
import { ListColumnRenderer } from '../renderer.decorator';

@Component({
  selector: 'sreyaj-exp-text-column-renderer',
  template: `
    <div>
      {{ data }}
    </div>
  `,
  standalone: true,
})
@ListColumnRenderer({
  type: CoreListColumnRendererType.Text,
})
export class TextColumnRendererComponent extends ListColumnRendererBase {
  constructor() {
    super();
  }
}

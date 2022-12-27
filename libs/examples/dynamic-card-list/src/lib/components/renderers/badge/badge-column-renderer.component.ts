import { Component } from '@angular/core';
import { CoreListColumnRendererType } from '../core-list-column-renderer.type';
import { ListColumnRendererBase } from '../list-column-renderer-base';
import { ListColumnRenderer } from '../renderer.decorator';
import { ChipColumnRendererData } from './badge.type';

@Component({
  selector: 'sreyaj-exp-text-column-renderer',
  template: `
    <div
      class="px-4 py-1 rounded-md bg-blue-100 text-center"
      [style.background-color]="data.bgColor"
    >
      {{ data.label }}
    </div>
  `,
  standalone: true,
})
@ListColumnRenderer({
  type: CoreListColumnRendererType.Badge,
})
export class BadgeColumnRendererComponent extends ListColumnRendererBase<ChipColumnRendererData> {
  constructor() {
    super();
  }
}

import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ListColumnRendererBase } from '../../renderers/list-column-renderer-base';
import { ListColumnRenderer } from '../../renderers/renderer.decorator';
import { CustomRenderers } from '../custom-renderers';
import { NameWithAvatarColumnRendererData } from './name-with-avatar.type';

@Component({
  selector: 'sreyaj-exp-name-with-avatar-column-renderer',
  template: `
    <div class="flex items-center gap-4">
      <img
        [ngSrc]="data.avatar"
        [alt]="data.name"
        width="50"
        height="50"
        class="rounded-full"
      />
      <p>{{ data.name }}</p>
    </div>
  `,
  standalone: true,
  imports: [NgOptimizedImage],
})
@ListColumnRenderer({
  type: CustomRenderers.NameWithAvatar,
})
export class NameWithAvatarColumnRendererComponent extends ListColumnRendererBase<NameWithAvatarColumnRendererData> {
  constructor() {
    super();
  }
}

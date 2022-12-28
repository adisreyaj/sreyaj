import { inject } from '@angular/core';
import {
  BadgeColumnRendererComponent,
  TextColumnRendererComponent,
} from '../components/renderers';
import { ListColumnRendererConstructor } from '../components/renderers/renderer.decorator';
import { ColumnRenderersRegistryService } from '../services/column-renderers-registry.service';

export const registerDefaultRenderers = (): void => {
  registerCustomRenderers([
    TextColumnRendererComponent,
    BadgeColumnRendererComponent,
  ]);
};

export const registerCustomRenderers = (
  renderers: ListColumnRendererConstructor[]
): void => {
  const rendererLookupService = inject(ColumnRenderersRegistryService);
  rendererLookupService.registerRenderers(renderers);
};

import { inject, StaticProvider } from '@angular/core';
import {
  BadgeColumnRendererComponent,
  TextColumnRendererComponent,
} from '../components/renderers';
import { ListColumnRendererConstructor } from '../components/renderers/renderer.decorator';
import { ColumnRenderersRegistryService } from '../services/column-renderers-registry.service';
import { COLUMN_RENDERERS } from '../tokens/column-renderer.token';

export const registerDefaultRenderers = (): StaticProvider => {
  return {
    provide: COLUMN_RENDERERS,
    useValue: [TextColumnRendererComponent, BadgeColumnRendererComponent],
    multi: true,
  };
};

export const registerCustomRenderers = (
  renderers: ListColumnRendererConstructor[]
): void => {
  const rendererLookupService = inject(ColumnRenderersRegistryService);
  rendererLookupService.registerRenderers(renderers);
};

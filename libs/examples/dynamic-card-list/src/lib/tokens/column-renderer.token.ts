import { InjectionToken } from '@angular/core';
import { ListColumnRendererConstructor } from '../components/renderers/renderer.decorator';

export const COLUMN_RENDERERS = new InjectionToken<
  ListColumnRendererConstructor[]
>('Collection of Column Renderers');

export const COLUMN_RENDERER_DATA = new InjectionToken<unknown>(
  'Column Renderer Data'
);

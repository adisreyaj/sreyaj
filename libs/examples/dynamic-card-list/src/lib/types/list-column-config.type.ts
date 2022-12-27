import { CoreListColumnRendererType } from '../components/renderers/core-list-column-renderer.type';

export interface ListColumnConfig {
  id: string;
  display: CoreListColumnRendererType | string;
  width?: number | `${number}px` | `${number}%`;
  maxWidth?: number | `${number}px` | `${number}%`;
}

export type ExtendedListColumnConfig = ListColumnConfig;

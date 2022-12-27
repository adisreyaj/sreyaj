export interface ListColumnConfig {
  id: string;
  display: string;
  width?: number | `${number}px` | `${number}%`;
  maxWidth?: number | `${number}px` | `${number}%`;
}

export type ExtendedListColumnConfig = ListColumnConfig;

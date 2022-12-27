import { inject } from '@angular/core';
import { COLUMN_RENDERER_DATA } from '../../tokens/column-renderer.token';
import { CoreListColumnRendererType } from './core-list-column-renderer.type';

export abstract class ListColumnRendererBase<ColumnDataType = unknown> {
  public static readonly type: CoreListColumnRendererType;
  public readonly data: ColumnDataType =
    inject<ColumnDataType>(COLUMN_RENDERER_DATA);
}

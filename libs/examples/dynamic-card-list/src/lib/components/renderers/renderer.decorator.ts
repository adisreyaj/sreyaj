import { Type } from '@angular/core';
import { CoreListColumnRendererType } from './core-list-column-renderer.type';

export interface ListColumnRendererConstructor
  extends Type<unknown>,
    ListColumnRendererMetadata {}

export function ListColumnRenderer(
  metadata: ListColumnRendererMetadata
): ListColumnRendererDecorator {
  return (constructor: ListColumnRendererConstructor): void => {
    constructor.type = metadata.type;
  };
}

type ListColumnRendererDecorator = (
  constructor: ListColumnRendererConstructor
) => void;

export interface ListColumnRendererMetadata {
  type: CoreListColumnRendererType | string;
}

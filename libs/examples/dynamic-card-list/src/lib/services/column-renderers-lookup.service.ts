import { Injectable } from '@angular/core';
import { ListColumnRendererConstructor } from '../components/renderers/renderer.decorator';

@Injectable({
  providedIn: 'root',
})
export class ColumnRenderersLookupService {
  private readonly rendererMap = new Map<
    string,
    ListColumnRendererConstructor
  >();

  registerRenderers(renderers: ListColumnRendererConstructor[]): void {
    renderers.forEach((renderer) => {
      this.rendererMap.set(renderer.type, renderer);
    });
  }

  public lookup(type: string | undefined): ListColumnRendererConstructor {
    if (type === undefined) {
      throw new Error('Type is undefined');
    }

    if (this.rendererMap.has(type)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.rendererMap.get(type)!;
    } else {
      throw new Error(`Column renderer by the name '${type}' not found.`);
    }
  }
}

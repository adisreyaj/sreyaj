import { Injectable } from '@angular/core';
import { ListColumnRendererConstructor } from '../components/renderers/renderer.decorator';

@Injectable({
  providedIn: 'root',
})
export class ColumnRenderersRegistryService {
  private readonly renderersRegistry = new Map<
    string,
    ListColumnRendererConstructor
  >();

  registerRenderers(renderers: ListColumnRendererConstructor[]): void {
    renderers.forEach((renderer) => {
      this.renderersRegistry.set(renderer.type, renderer);
    });
  }

  public lookup(type: string | undefined): ListColumnRendererConstructor {
    if (type === undefined) {
      throw new Error('Type is undefined');
    }

    if (this.renderersRegistry.has(type)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.renderersRegistry.get(type)!;
    } else {
      throw new Error(`Column renderer by the name '${type}' not found.`);
    }
  }
}

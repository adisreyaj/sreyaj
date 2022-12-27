import {
  Component,
  inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ColumnRenderersRegistryService } from '../../services/column-renderers-registry.service';
import { COLUMN_RENDERER_DATA } from '../../tokens/column-renderer.token';
import { ListColumnConfig } from '../../types/list-column-config.type';

@Component({
  selector: 'sreyaj-exp-card-list-column-renderer',
  template: `
    <div>
      <ng-container #vcr></ng-container>
    </div>
  `,
  standalone: true,
})
export class CardListColumnRendererComponent implements OnInit {
  @Input()
  columnConfig?: ListColumnConfig;

  @Input()
  data?: Record<string, unknown>;

  @ViewChild('vcr', { read: ViewContainerRef, static: true })
  private readonly vcr!: ViewContainerRef;

  private readonly rendererLookupService = inject(
    ColumnRenderersRegistryService
  );
  private readonly parentInjector = inject(Injector);

  ngOnInit() {
    if (!this.columnConfig || !this.data) {
      return;
    }
    const renderer = this.rendererLookupService.lookup(
      this.columnConfig?.display
    );
    if (renderer) {
      this.vcr.createComponent(renderer, {
        injector: Injector.create({
          providers: [
            {
              provide: COLUMN_RENDERER_DATA,
              useValue: this.data[this.columnConfig.id],
            },
          ],
          parent: this.parentInjector,
        }),
      });
    }
  }
}

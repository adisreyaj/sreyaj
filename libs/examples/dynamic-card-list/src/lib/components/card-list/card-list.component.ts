import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnRenderersLookupService } from '../../services/column-renderers-lookup.service';
import { COLUMN_RENDERERS } from '../../tokens/column-renderer.token';
import {
  ExtendedListColumnConfig,
  ListColumnConfig,
} from '../../types/list-column-config.type';
import { DynamicListDataSource } from '../../utils/list-data-source';
import { registerDefaultRenderers } from '../../utils/register-renderer.util';
import { ListColumnRendererConstructor } from '../renderers/renderer.decorator';
import { CardListColumnRendererComponent } from './card-list-column-renderer.component';

@Component({
  selector: 'sreyaj-exp-card-list',
  template: `
    <ul *ngIf="data$ | async as data" class="flex flex-col gap-4">
      <ng-container *ngIf="data">
        <li
          *ngFor="let item of data"
          class="grid gap-4 items-center p-4 rounded-md border border-gray-200 shadow-sm"
          [style.grid-template-columns]="this.gridTemplateColumns"
        >
          <div
            [style.max-width]="column.maxWidth"
            *ngFor="let column of columns"
          >
            <sreyaj-exp-card-list-column-renderer
              [columnConfig]="column"
              [data]="item"
            ></sreyaj-exp-card-list-column-renderer>
          </div>
        </li>
      </ng-container>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, CardListColumnRendererComponent, NgIf, AsyncPipe],
  providers: [registerDefaultRenderers()],
})
export class CardListComponent implements OnChanges {
  @Input()
  dataSource?: DynamicListDataSource<Record<string, unknown>>;
  public data$: Observable<readonly Record<string, unknown>[]> | undefined;
  public columns: ExtendedListColumnConfig[] = [];
  public gridTemplateColumns = '';
  @ViewChild('vcr', { read: ViewContainerRef })
  private readonly vcr?: ViewContainerRef;
  private readonly rendererLookupService = inject(ColumnRenderersLookupService);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    @Inject(COLUMN_RENDERERS)
    private readonly renderers: ListColumnRendererConstructor[]
  ) {
    this.rendererLookupService.registerRenderers(this.renderers.flat());
  }

  @Input()
  set columnConfig(columnConfig: ListColumnConfig[]) {
    this.columns = columnConfig;
    this.gridTemplateColumns = this.getGridColumnTemplate(columnConfig);
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      this.dataSource?.disconnect();
      this.data$ = this.dataSource?.connect();
    }
  }

  public getGridColumnTemplate(columns: ListColumnConfig[]): string {
    return columns.reduce((acc, column) => {
      const width = column.width ?? '1fr';
      if (typeof width === 'number') {
        return `${acc} ${width}fr`;
      }
      return `${acc} ${width}`;
    }, '');
  }
}

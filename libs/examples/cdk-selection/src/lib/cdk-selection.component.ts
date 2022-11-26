import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, DecimalPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MOCK_TABLE_DATA, MockData } from './mock-data';

@Component({
  selector: 'sreyaj-exp-cdk-selection',
  template: `
    <section class="p-8">
      <table class="table-auto border border-slate-200">
        <thead>
          <tr class="bg-slate-100 leading-[32px]">
            <th class="px-2">
              <input
                type="checkbox"
                name="all"
                id="all"
                class="cursor-pointer"
                [checked]="this.selectionModel.selected.length > 0"
                [indeterminate]="
                  this.selectionModel.selected.length > 0 &&
                  this.selectionModel.selected.length < this.tableData.length
                "
                (change)="this.onCheckAllChange($event)"
              />
            </th>
            <th class="text-left px-2">Name</th>
            <th class="text-left px-2">Year</th>
            <th class="text-left px-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let row of this.tableData"
            class="leading-[40px] border-b border-slate-100"
          >
            <td class="px-2">
              <input
                type="checkbox"
                [name]="row.name"
                [id]="row.name"
                class="cursor-pointer"
                [checked]="this.selectionModel.isSelected(row.id)"
                (change)="this.onCheckRowChange(row)"
              />
            </td>
            <td class="px-2">{{ row.name }}</td>
            <td class="px-2">{{ row.year | date : 'short' }}</td>
            <td class="px-2">{{ row.rating | number }}</td>
          </tr>
        </tbody>
      </table>
      <footer class="mt-8">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium
                rounded-lg text-sm px-5 py-2"
          (click)="this.toggleSelectAll()"
        >
          {{ this.isAllSelected ? 'Deselect All' : 'Select All' }}
        </button>
      </footer>
    </section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, DatePipe, DecimalPipe],
})
export class CdkSelectionComponent {
  readonly tableData: MockData[];
  readonly selectionModel: SelectionModel<number>;

  constructor() {
    this.tableData = MOCK_TABLE_DATA;
    this.selectionModel = new SelectionModel<number>(true, []);
  }

  get isAllSelected() {
    return this.selectionModel.selected.length === this.tableData.length;
  }

  public onCheckAllChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectAll();
    } else {
      this.deselectAll();
    }
  }

  public onCheckRowChange(row: MockData) {
    this.selectionModel.toggle(row.id);
  }

  public toggleSelectAll() {
    if (this.isAllSelected) {
      this.deselectAll();
    } else {
      this.selectAll();
    }
  }

  private selectAll() {
    this.selectionModel.select(...this.tableData.map((row) => row.id));
  }

  private deselectAll() {
    this.selectionModel.clear();
  }
}

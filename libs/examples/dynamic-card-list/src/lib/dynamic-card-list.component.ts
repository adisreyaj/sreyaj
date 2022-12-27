import { Component } from '@angular/core';
import { CardListComponent } from './components/card-list/card-list.component';
import {
  CustomRenderers,
  NameWithAvatarColumnRendererComponent,
} from './components/custom-renderers';
import { CoreListColumnRendererType } from './components/renderers/core-list-column-renderer.type';
import { ListColumnConfig } from './types/list-column-config.type';
import { DynamicListDataSource } from './utils/list-data-source';
import { registerCustomRenderers } from './utils/register-renderer.util';

@Component({
  selector: 'sreyaj-exp-dynamic-card-list',
  template: `
    <header></header>
    <main class="p-6">
      <sreyaj-exp-card-list
        [columnConfig]="columnConfig"
        [dataSource]="dataSource"
      ></sreyaj-exp-card-list>
    </main>
  `,
  standalone: true,
  imports: [CardListComponent],
})
export class DynamicCardListComponent {
  public columnConfig: ListColumnConfig[] = [
    {
      id: 'name',
      display: CustomRenderers.NameWithAvatar,
      width: 2,
    },
    {
      id: 'email',
      display: CoreListColumnRendererType.Text,
      width: 4,
    },
    {
      id: 'phone',
      display: CoreListColumnRendererType.Text,
      width: 3,
    },
    {
      id: 'status',
      display: CoreListColumnRendererType.Badge,
      width: '100px',
    },
  ];

  public dataSource = new DynamicListDataSource([
    {
      name: {
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      },
      email: 'john@adi.so',
      phone: '123-456-7890',
      status: {
        label: 'Active',
        bgColor: 'lightgreen',
      },
    },
    {
      name: {
        name: 'Maicy Williams',
        avatar: 'https://randomuser.me/api/portraits/women/60.jpg',
      },
      email: 'maicy@adi.so',
      phone: '123-456-7890',
      status: {
        label: 'Inactive',
        bgColor: 'lightgray',
      },
    },
  ]);

  constructor() {
    registerCustomRenderers([NameWithAvatarColumnRendererComponent]);
  }
}

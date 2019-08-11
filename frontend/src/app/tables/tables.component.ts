import { Component } from '@angular/core';

import { TablesService } from './tables.service';

@Component({
  selector: 'app-tables',
  styleUrls: ['./tables.component.css'],
  providers: [TablesService],
  template: `
<app-dynamic-search-page
  [p-service]="tablesService"
></app-dynamic-search-page>
  `,
})
export class TablesComponent {

  constructor(public tablesService: TablesService) {}

}

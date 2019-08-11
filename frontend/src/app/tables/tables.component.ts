import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';

import { TablesService } from './tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [TablesService]
})
export class TablesComponent {

  constructor(public tablesService: TablesService) {}

}

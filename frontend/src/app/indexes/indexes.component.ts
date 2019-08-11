import { Component } from '@angular/core';

import { IndexesService } from './indexes.service';

@Component({
  selector: 'app-indexes',
  styleUrls: ['./indexes.component.css'],
  providers: [IndexesService],
  template: `
<app-dynamic-search-page
  [p-service]="indexesService"
></app-dynamic-search-page>
  `,
})
export class IndexesComponent {

  constructor(public indexesService: IndexesService) {}

}

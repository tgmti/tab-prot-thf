import { Component } from '@angular/core';

import { FieldsService } from './fields.service';

@Component({
  selector: 'app-fields',
  styleUrls: ['./fields.component.css'],
  providers: [FieldsService],
  template: `
<app-dynamic-search-page
  [p-service]="fieldsService"
></app-dynamic-search-page>
  `,
})
export class FieldsComponent {

  constructor(public fieldsService: FieldsService) { }

}

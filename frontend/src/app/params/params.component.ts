import { Component } from '@angular/core';

import { ParamsService } from './params.service';

@Component({
  selector: 'app-params',
  styleUrls: ['./params.component.css'],
  providers: [ParamsService],
  template: `
<app-dynamic-search-page
  [p-service]="paramsService"
></app-dynamic-search-page>
  `,
})
export class ParamsComponent {

  constructor(public paramsService: ParamsService) {}

}

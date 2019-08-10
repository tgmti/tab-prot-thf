import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';

import { ParamsService } from './params.service';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css'],
  providers: [ParamsService]
})
export class ParamsComponent implements OnInit {

  public literals: object;

  readonly actions: Array<PoPageAction> = [
    // actions of table here
  ];

  columns: Array<PoTableColumn>;

  items: Array<any> = [];

  constructor(private paramsService: ParamsService) {
    this.literals = this.paramsService.literals;
    this.columns = this.paramsService.getColumns();
  }

  ngOnInit() {

    this.paramsService.get()
    .subscribe(response => {
      this.items = response.items;
     },
      error => console.error('Erro ao buscar parâmetros', error)
    );

   }

}

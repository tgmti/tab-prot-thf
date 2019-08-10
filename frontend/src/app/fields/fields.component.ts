import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';

import { FieldsService } from './fields.service';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  providers: [FieldsService]
})
export class FieldsComponent implements OnInit {

  public literals: object;

  readonly actions: Array<PoPageAction> = [
    // actions of table here
  ];

  columns: Array<PoTableColumn>;

  items: Array<any> = [];

  constructor(private fieldsService: FieldsService) {
    this.literals = this.fieldsService.literals;
    this.columns = this.fieldsService.getColumns();
  }

  ngOnInit() {

    this.fieldsService.get()
    .subscribe(response => {
      this.items = response.items;
     },
      error => console.error('Erro ao buscar Campos', error)
    );

   }

}

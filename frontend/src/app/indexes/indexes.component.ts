import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';

import { IndexesService } from './indexes.service';

@Component({
  selector: 'app-indexes',
  templateUrl: './indexes.component.html',
  styleUrls: ['./indexes.component.css'],
  providers: [IndexesService]
})
export class IndexesComponent implements OnInit {

  public literals: object;

  readonly actions: Array<PoPageAction> = [
    // actions of table here
  ];

  columns: Array<PoTableColumn>;

  items: Array<any> = [];

  constructor(private indexesService: IndexesService) {
    this.literals = this.indexesService.literals;
    this.columns = this.indexesService.getColumns();
  }

  ngOnInit() {

    this.indexesService.get()
    .subscribe(response => {
      this.items = response.items;
     },
      error => console.error('Erro ao buscar Índices', error)
    );

   }

}

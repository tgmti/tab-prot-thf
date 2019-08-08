import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';

import { LiteralService } from '../core/i18n/literal.service';
import { ParamsService } from '../params.service';
import { HttpService } from '../core/services/http.service';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent implements OnInit {

  public literals: object;

  readonly actions: Array<PoPageAction> = [
    // actions of table here
  ];

  columns: Array<PoTableColumn>;

  items: Array<any> = [];

  constructor(private literalService: LiteralService,
              private http: HttpService) {
    this.literals = this.literalService.literals;
  }

  ngOnInit() {
    
    this.columns = [
      { property: 'x6_fil', label: this.literals['branch'] },
      { property: 'x6_var', label: this.literals['param'] },
      { property: 'x6_tipo', label: this.literals['type'] },
      { property: 'x6_descric', label: this.literals['description'] },
      { property: 'x6_conteud', label: this.literals['content'] },
      { property: 'x6_propri', label: this.literals['property'] },
    ];

    this.http.get('/params')
    .subscribe(response => {
      console.log('getParams: ', response);
      this.items = response.items;
     },
      error => console.error('Erro ao buscar parâmetros', error)
    );

   }

}

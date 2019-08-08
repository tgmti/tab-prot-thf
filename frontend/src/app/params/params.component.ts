import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';

import { LiteralService } from '../core/i18n/literal.service';

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

  constructor(private literalService: LiteralService) {
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
  
    this.items = [
      { x6_fil: '01',
        x6_var: 'MV_PAR01',
        x6_tipo: 'L',
        x6_descric: 'Descricao do parametro',
        x6_conteud: '.T.',
        x6_propri: 'U',
      },
      { x6_fil: '01',
        x6_var: 'MV_PAR01',
        x6_tipo: 'L',
        x6_descric: 'Descricao do parametro',
        x6_conteud: '.T.',
        x6_propri: 'U',
      },
    ];
   }

}

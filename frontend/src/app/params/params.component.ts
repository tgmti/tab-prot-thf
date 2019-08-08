import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent implements OnInit {

  readonly actions: Array<PoPageAction> = [
    // actions of table here
  ];

  readonly columns: Array<PoTableColumn> = [
    { property: 'x6_fil', label: 'Filial'},
    { property: 'x6_var', label: 'Parâmetro'},
    { property: 'x6_tipo', label: 'Tipo' },
    { property: 'x6_descric', label: 'Descrição'},
    { property: 'x6_conteud', label: 'Conteúdo'},
    { property: 'x6_propri', label: 'Propriedade' },
  ];

  items: Array<any> = [];

  constructor() { }

  ngOnInit() {
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

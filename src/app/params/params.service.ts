import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

// import { GenericService } from '../generic/service/generic.service';
// import { Param } from '../model/param.interface';


@Injectable({
  providedIn: 'root'
})
export class ParamsService /* extends GenericService<Param> */ {

  // constructor(http: HttpClient) {
  //   super(http);
  // }


  filter(filters) {
    let filteredItems = [...this.getItems()];

    Object.keys(filters).forEach(filter => {
      filteredItems = filteredItems.filter(register => {
        return register[filter].toLocaleLowerCase().includes(filters[filter].toLocaleLowerCase());
      });
    });

    return filteredItems;
  }

  getColumns(): Array<ThfTableColumn> {
    return [
      
      { column: 'x6_propri', label: 'Propri', type: 'subtitle', subtitles: [
        { value: 'S', type: 'success', label: 'Sistema', content: 'S' },
        { value: 'U', type: 'warning', label: 'Usuário', content: 'U' }
      ]},
      { column: 'id', label: 'ID', type: 'string' },
      { column: 'x6_fil', label: 'Filial', type: 'string' },
      { column: 'x6_var', label: 'Parametro', type: 'string' },
      { column: 'x6_tipo', label: 'Tipo', type: 'string' }, 
      { column: 'x6_conteud', label: 'Conteúdo', type: 'string' }, 
      { column: 'x6_descric', label: 'Descrição', type: 'string' }, 
    ];
  }

  getParamPropri() {
    return [
      { value: 'S', label: 'Sistema' },
      { value: 'U', label: 'Usuário'}
    ];
  }

  getItems() {
    return [
      { "id": 1, "x6_fil": "  ", "x6_var": "MV_LOGICO", "x6_conteud": true, "x6_tipo": "boolean", "x6_descric": "parametro logico", "x6_propri": "S"},
      { "id": 2, "x6_fil": "01", "x6_var": "MV_NUMERO", "x6_conteud": 123, "x6_tipo": "numeric", "x6_descric": "parametro numerico", "x6_propri": "S"},
      { "id": 3, "x6_fil": "01", "x6_var": "MV_TEXTO", "x6_conteud": "Teste", "x6_tipo": "text", "x6_descric": "parametro texto", "x6_propri": "U"},
      { "id": 4, "x6_fil": "01", "x6_var": "MV_DATA", "x6_conteud": "20190115", "x6_tipo": "date", "x6_descric": "parametro data", "x6_propri": "S"}
    ];
  }

  resetFilterParams() {
    return [...this.getItems()];
  }

}

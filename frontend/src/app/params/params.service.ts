import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class ParamsService extends HttpService {

  constructor(http: HttpClient, literalService: LiteralService) {
    super(http, literalService);

    this.endpoint = '/params';

    this.literals = {...this.literals, ...literalService.params};

    this.columns = [
      { property: 'x6_fil', label: this.literals['x6_fil'], width: '60px' },
      { property: 'x6_var', label: this.literals['x6_var'], width: '100px' },
      { property: 'x6_tipo', label: this.literals['x6_tipo'], width: '100px',
        type: 'label', labels: [
          { value: 'C', color: 'color-11', label: 'Caractere' },
          { value: 'N', color: 'color-09', label: 'Numérico' },
          { value: 'D', color: 'color-08', label: 'Data' },
          { value: 'M', color: 'color-07', label: 'Memo' },
          { value: 'L', color: 'color-04', label: 'Lógico' },
        ]
      },
      { property: 'x6_descric', label: this.literals['x6_descric'], width: '200px' },
      { property: 'x6_conteud', label: this.literals['x6_conteud'], width: '100px' },
      { property: 'x6_propri', label: this.literals['x6_propri'],
        type: 'subtitle', subtitles: [
          { value: 'S', color: 'color-08', label: 'Sistema', content: 'S' },
          { value: 'U', color: 'color-11', label: 'Usuário', content: 'U' },
        ]
      },
    ];
  }

}

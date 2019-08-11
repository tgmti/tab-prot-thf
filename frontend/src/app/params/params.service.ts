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
      { property: 'x6_fil', label: this.literals['x6_fil'] },
      { property: 'x6_var', label: this.literals['x6_var'] },
      { property: 'x6_tipo', label: this.literals['x6_tipo'] },
      { property: 'x6_descric', label: this.literals['x6_descric'] },
      { property: 'x6_conteud', label: this.literals['x6_conteud'] },
      { property: 'x6_propri', label: this.literals['x6_propri'] },
    ];
  }

}

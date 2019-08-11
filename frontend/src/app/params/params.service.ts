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

    this.columns = [
      { property: 'x6_fil', label: this.literals['branch'] },
      { property: 'x6_var', label: this.literals['param'] },
      { property: 'x6_tipo', label: this.literals['type'] },
      { property: 'x6_descric', label: this.literals['description'] },
      { property: 'x6_conteud', label: this.literals['content'] },
      { property: 'x6_propri', label: this.literals['property'] },
    ];
  }

}

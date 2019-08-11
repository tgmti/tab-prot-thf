import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class TablesService extends HttpService {

  constructor(http: HttpClient, literalService: LiteralService) {
    super(http, literalService);

    this.endpoint = '/tables';
    this.literalContext = 'tables';

    this.literals = {...this.literals, ...literalService.tables};

    this.columns = [
      { property: 'x2_chave', label: this.literals['x2_chave'] },
      { property: 'x2_nome', label: this.literals['x2_nome'] },
      { property: 'x2_modo', label: this.literals['x2_modo'] },
      { property: 'x2_modoun', label: this.literals['x2_modoun'] },
      { property: 'x2_modoemp', label: this.literals['x2_modoemp'] },
      { property: 'x2_unico', label: this.literals['x2_unico'] },
    ];

  }

}

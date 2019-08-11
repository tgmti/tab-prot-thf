import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class TablesService extends HttpService {

  constructor(http: HttpClient, literalService: LiteralService) {
    super(http, literalService);

    this.endpoint = '/tables';

    this.columns = [
      { property: 'x2_chave', label: this.literals['description'] },
      { property: 'x2_nome', label: this.literals['description'] },
      { property: 'x2_modo', label: this.literals['description'] },
      { property: 'x2_modoun', label: this.literals['description'] },
      { property: 'x2_modoemp', label: this.literals['description'] },
      { property: 'x2_unico', label: this.literals['description'] },
    ];
  }

}


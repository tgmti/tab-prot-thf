import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class IndexesService extends HttpService {

  constructor(http: HttpClient, literalService: LiteralService) {
    super(http, literalService);

    this.endpoint = '/indexes';

    this.columns = [
      { property: 'indice', label: this.literals['description']},
      { property: 'ordem', label: this.literals['description']},
      { property: 'chave', label: this.literals['description']},
      { property: 'descricao', label: this.literals['description']},
      { property: 'propri', label: this.literals['description']},
      { property: 'f3', label: this.literals['description']},
      { property: 'nickname', label: this.literals['description']},
      { property: 'showpesq', label: this.literals['description']},
      { property: 'ix_virtual', label: this.literals['description']},
      { property: 'ix_vircust', label: this.literals['description']},
    ];
  }

}


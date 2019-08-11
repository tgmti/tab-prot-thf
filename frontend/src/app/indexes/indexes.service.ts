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

    this.literals = {...this.literals, ...literalService.indexes};

    this.columns = [
      { property: 'indice', label: this.literals['indice']},
      { property: 'ordem', label: this.literals['ordem']},
      { property: 'chave', label: this.literals['chave']},
      { property: 'descricao', label: this.literals['descricao']},
      { property: 'propri', label: this.literals['propri']},
      { property: 'f3', label: this.literals['f3']},
      { property: 'nickname', label: this.literals['nickname']},
      { property: 'showpesq', label: this.literals['showpesq']},
      { property: 'ix_virtual', label: this.literals['ix_virtual']},
      { property: 'ix_vircust', label: this.literals['ix_vircust']},
    ];
  }

}


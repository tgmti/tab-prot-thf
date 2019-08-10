import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoTableColumn } from '@portinari/portinari-ui';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class IndexesService {

  public literals: object;

  constructor(private http: HttpService,private literalService: LiteralService) {
    this.literals = this.literalService.literals;
  }

  get(): Observable<any> {
    return this.http.get('/indexes');
  }

  getColumns(): Array<PoTableColumn> {
    return [
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


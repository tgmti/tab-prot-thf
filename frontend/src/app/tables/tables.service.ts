import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoTableColumn } from '@portinari/portinari-ui';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  public literals: object;

  constructor(private http: HttpService,private literalService: LiteralService) {
    this.literals = this.literalService.literals;
  }

  get(): Observable<any> {
    return this.http.get('/tables');
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'x2_chave', label: this.literals['description'] },
      { property: 'x2_nome', label: this.literals['description'] },
      { property: 'x2_modo', label: this.literals['description'] },
      { property: 'x2_modoun', label: this.literals['description'] },
      { property: 'x2_modoemp', label: this.literals['description'] },
      { property: 'x2_unico', label: this.literals['description'] },
    ];
  }

}


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoTableColumn } from '@portinari/portinari-ui';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  public literals: object;

  constructor(private http: HttpService,private literalService: LiteralService) {
    this.literals = this.literalService.literals;
  }

  get(): Observable<any> {
    return this.http.get('/params');
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'x6_fil', label: this.literals['branch'] },
      { property: 'x6_var', label: this.literals['param'] },
      { property: 'x6_tipo', label: this.literals['type'] },
      { property: 'x6_descric', label: this.literals['description'] },
      { property: 'x6_conteud', label: this.literals['content'] },
      { property: 'x6_propri', label: this.literals['property'] },
    ];
  }

}

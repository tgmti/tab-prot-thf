import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoTableColumn } from '@portinari/portinari-ui';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  public literals: object;

  constructor(private http: HttpService,private literalService: LiteralService) {
    this.literals = this.literalService.literals;
  }

  get(): Observable<any> {
    return this.http.get('/fields');
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'x3_arquivo', label: this.literals['field'] },
      { property: 'x3_ordem', label: this.literals['field'] },
      { property: 'x3_campo', label: this.literals['field'], width: '10%' },
      { property: 'x3_tipo', label: this.literals['field'] },
      { property: 'x3_titulo', label: this.literals['field'] },
      { property: 'x3_descric', label: this.literals['field'] },
      { property: 'x3_picture', label: this.literals['field'] },
      { property: 'x3_valid', label: this.literals['field'] },
      { property: 'x3_relacao', label: this.literals['field'] },
      { property: 'x3_f3', label: this.literals['field'] },
      { property: 'x3_reserv', label: this.literals['field'] },
      { property: 'x3_trigger', label: this.literals['field'] },
      { property: 'x3_propri', label: this.literals['field'] },
      { property: 'x3_browse', label: this.literals['field'] },
      { property: 'x3_visual', label: this.literals['field'] },
      { property: 'x3_context', label: this.literals['field'] },
      { property: 'x3_obrigat', label: this.literals['field'] },
      { property: 'x3_vlduser', label: this.literals['field'] },
      { property: 'x3_cbox', label: this.literals['field'] },
      { property: 'x3_pictvar', label: this.literals['field'] },
      { property: 'x3_when', label: this.literals['field'] },
      { property: 'x3_inibrw', label: this.literals['field'] },
      { property: 'x3_grpsxg', label: this.literals['field'] },
      { property: 'x3_folder', label: this.literals['field'] },
      { property: 'x3_tamanho', label: this.literals['field'] },
      { property: 'x3_decimal', label: this.literals['field'] },

    ];
  }

}


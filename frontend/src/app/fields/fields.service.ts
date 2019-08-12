import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../core/services/http.service';
import { LiteralService } from '../core/i18n/literal.service';

@Injectable({
  providedIn: 'root'
})
export class FieldsService extends HttpService {

  constructor(http: HttpClient, literalService: LiteralService) {
    super(http, literalService);

    this.endpoint = '/fields';

    this.literals = {...this.literals, ...literalService.fields};

    this.columns = [
      { property: 'x3_arquivo', label: this.literals['x3_arquivo'], width: '80px' },
      { property: 'x3_ordem', label: this.literals['x3_ordem'], width: '80px' },
      { property: 'x3_campo', label: this.literals['x3_campo'], width: '100px' },
      { property: 'x3_tipo', label: this.literals['x3_tipo'], width: '100px',
        type: 'label', labels: [
          { value: 'C', color: 'color-11', label: 'Caractere' },
          { value: 'N', color: 'color-09', label: 'Numérico' },
          { value: 'D', color: 'color-08', label: 'Data' },
          { value: 'M', color: 'color-07', label: 'Memo' },
          { value: 'L', color: 'color-04', label: 'Lógico' },
        ]
      },
      { property: 'x3_titulo', label: this.literals['x3_titulo'], width: '100px' },
      { property: 'x3_descric', label: this.literals['x3_descric'], width: '150px' },
      { property: 'x3_propri', label: this.literals['x3_propri'],
        type: 'subtitle', subtitles: [
          { value: '', color: 'color-08', label: 'Sistema', content: 'S' },
          { value: 'S', color: 'color-08', label: 'Sistema', content: 'S' },
          { value: 'U', color: 'color-11', label: 'Usuário', content: 'U' },
        ]
      },
      { property: 'x3_tamanho', label: this.literals['x3_tamanho'], width: '80px' },
      { property: 'x3_decimal', label: this.literals['x3_decimal'], width: '80px' },
    ];
  }
}

/* 
{ property: 'x3_picture', label: this.literals['x3_picture'] },
{ property: 'x3_valid', label: this.literals['x3_valid'] },
{ property: 'x3_relacao', label: this.literals['x3_relacao'] },
{ property: 'x3_f3', label: this.literals['x3_f3'] },
{ property: 'x3_reserv', label: this.literals['x3_reserv'] },
{ property: 'x3_trigger', label: this.literals['x3_trigger'] },
{ property: 'x3_browse', label: this.literals['x3_browse'] },
{ property: 'x3_visual', label: this.literals['x3_visual'] },
{ property: 'x3_context', label: this.literals['x3_context'] },
{ property: 'x3_obrigat', label: this.literals['x3_obrigat'] },
{ property: 'x3_vlduser', label: this.literals['x3_vlduser'] },
{ property: 'x3_cbox', label: this.literals['x3_cbox'] },
{ property: 'x3_pictvar', label: this.literals['x3_pictvar'] },
{ property: 'x3_when', label: this.literals['x3_when'] },
{ property: 'x3_inibrw', label: this.literals['x3_inibrw'] },
{ property: 'x3_grpsxg', label: this.literals['x3_grpsxg'] },
{ property: 'x3_folder', label: this.literals['x3_folder'] },
 */

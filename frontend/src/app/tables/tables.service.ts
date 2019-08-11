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

    const shareTypeColumnTemplate = {
      width: '80px',
      type: 'subtitle', subtitles: [
        { value: 'E', color: 'color-08', label: 'Exclusivo', content: 'E' },
        { value: 'C', color: 'color-11', label: 'Compartilhado', content: 'C' },
      ]
    };

    this.columns = [
      { property: 'x2_chave', label: this.literals['x2_chave'], width: '80px' },
      { property: 'x2_nome', label: this.literals['x2_nome'], width: '200px' },
      { property: 'x2_modo', label: this.literals['x2_modo'] , ...shareTypeColumnTemplate },
      { property: 'x2_modoun', label: this.literals['x2_modoun'] , ...shareTypeColumnTemplate },
      { property: 'x2_modoemp', label: this.literals['x2_modoemp'] , ...shareTypeColumnTemplate },
      { property: 'x2_unico', label: this.literals['x2_unico'], width: '200px' },
    ];

  }

}

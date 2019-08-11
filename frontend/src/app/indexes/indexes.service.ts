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
      { property: 'indice', label: this.literals['indice'], width: '80px' },
      { property: 'ordem', label: this.literals['ordem'], width: '20px'},
      { property: 'chave', label: this.literals['chave'], width: '100px'},
      { property: 'descricao', label: this.literals['descricao'], width: '150px'},
      { property: 'propri', label: this.literals['propri'], width: '60px',
        type: 'subtitle', subtitles: [
          { value: 'S', color: 'color-08', label: 'Sistema', content: 'S' },
          { value: 'U', color: 'color-11', label: 'Usuário', content: 'U' },
        ]
      },
      { property: 'nickname', label: this.literals['nickname'], width: '60px' },
    ];
  }

}


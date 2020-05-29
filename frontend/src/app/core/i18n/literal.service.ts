import { Injectable } from '@angular/core';

import { PoI18nService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class LiteralService {

  public literals = {};
  public tables = {};
  public fields = {};
  public indexes = {};
  public params = {};

  constructor(private poI18nService: PoI18nService) {
    this.poI18nService.getLiterals({ language: navigator.language })
      .subscribe(response => this.literals = response);

    this.poI18nService.getLiterals({ context: 'tables', language: navigator.language })
      .subscribe(response => this.tables = response);

    this.poI18nService.getLiterals({ context: 'fields', language: navigator.language })
      .subscribe(response => this.fields = response);

    this.poI18nService.getLiterals({ context: 'indexes', language: navigator.language })
      .subscribe(response => this.indexes = response);

    this.poI18nService.getLiterals({ context: 'params', language: navigator.language })
      .subscribe(response => this.params = response);
  }
}
